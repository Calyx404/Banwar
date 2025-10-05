import re

class Fields:

    @staticmethod
    def to_snake_case(name: str) -> str:
        name = name.replace("-", "_").replace(" ", "_")
        name = re.sub(r'([a-z0-9])([A-Z])', r'\1_\2', name)
        return name.lower().strip()

    def __init__(self, fieldnames, required_fields):
        """
        @param fieldnames: headers from the CSV file
        @param required_fields: list of (field_name, field_type)
        """
        # Convert to snake_case
        self.fieldnames = [self.to_snake_case(field) for field in fieldnames]
        self.required_fields = required_fields

        # Check if required fields exist
        missing = [field for field, _ in required_fields if field not in self.fieldnames]
        if missing:
            raise ValueError(f"Missing required fields: {missing}")

    def validate_row(self, row, row_num=0):
        clean_row = {}
        errors, warnings = [], []

        normalized_row = {self.to_snake_case(k): v for k, v in row.items()}
        geometry_type = None
        coords_value = None

        # Validate required fields
        for field, ftype in self.required_fields:
            f = Field(field, normalized_row.get(field, ""), required=True, ftype=ftype)

            if ftype == "geometry_type":
                val, status, msg = f.validate()
                if status == "error":
                    errors.append(f"({field}) : {msg}")
                else:
                    geometry_type = val
                    clean_row[field] = val
                    if status == "warning":
                        warnings.append(f"({field}) : {msg}")

            elif ftype == "coordinates":
                val, status, msg = f.validate(geometry=geometry_type)
                coords_value = val

                if status == "error":
                    errors.append(f"({field}) : {msg}")
                else:
                    clean_row[field] = val
                    if status == "warning":
                        warnings.append(f"({field}) : {msg}")

            else:
                val, status, msg = f.validate()
                if status == "error":
                    errors.append(f"({field}) : {msg}")
                else:
                    clean_row[field] = val
                    if status == "warning":
                        warnings.append(f"({field}) : {msg}")

        if coords_value is None:
            clean_row["geometry_type"] = None
            clean_row["coordinates"] = None

        # Validate extra fields
        for field, value in normalized_row.items():
            if field not in clean_row:
                f = Field(field, value, required=False, ftype="text")
                val, status, msg = f.validate()
                if status == "error":
                    errors.append(f"({field}) : {msg}")
                else:
                    clean_row[field] = val
                    if status == "warning":
                        warnings.append(f"({field}) : {msg}")

        return clean_row, errors, warnings

class Field:
    def __init__(self, name, value, required=True, ftype="text"):
        self.name = name
        self.value = value
        self.required = required
        self.ftype = ftype

    def validate(self, geometry=None):
        """Validate and normalize this field value."""
        if self.required and (not self.value or self.value is None or str(self.value).strip() == ""):
            return None, "error", f"Missing required value in '{self.name}'"

        if self.ftype == "int":
            return self._validate_int()
        elif self.ftype == "float":
            return self._validate_float()
        elif self.ftype == "category":
            return self._validate_category()
        elif self.ftype == "geometry_type":
            return self._validate_geometry()
        elif self.ftype == "coordinates":
            return self._validate_coordinates(geometry)
        else:
            return self._standardize_text()

    def _standardize_text(self):
        val = str(self.value).strip()
        if val == "":
            return val, "warning", f"Empty text in '{self.name}'"

        return val, "ok", "Valid text"

    def _validate_int(self):
        try:
            val = int(str(self.value).strip())
        except ValueError:
            return None, "error", f"Value in '{self.name}' must be an integer"
        if val <= 0:
            return None, "error", f"Value in '{self.name}' must be positive"
        return val, "ok", "Valid integer"

    def _validate_float(self):
        try:
            return float(str(self.value).strip()), "ok", "Valid float"
        except ValueError:
            return None, "error", f"Value in '{self.name}' must be a float"

    def _validate_category(self):
        val = str(self.value).strip()
        allowed = [
            "Mountains and Sacred Sites",
            "Igorot Settlements and Territories",
            "Mines and Natural Resources",
            "Rivers and Trade Corridors",
            "Spanish Missions and Outposts",
            "Trade Routes",
            "Provinces and Territories",
        ]
        if val not in allowed:
            return None, "error", f"Invalid category '{val}'"
        if val != self.value:
            return val, "warning", f"Normalized category to uppercase '{val}'"
        return val, "ok", "Valid category"

    def _validate_geometry(self):
        val = str(self.value).strip().upper()
        allowed = ["POINT", "LINE", "POLYGON"]
        if val not in allowed:
            return None, "error", f"Invalid geometry type '{val}'"
        if val != self.value:
            return val, "warning", f"Normalized geometry type to uppercase '{val}'"
        return val, "ok", "Valid geometry type"

    def _validate_coordinates(self, geometry=None):
        """
        Parse CSV-style coordinates: "[lon lat],[lon lat]..."
        """
        if str(self.value).strip().lower() in ["null", "n/a", "none", "no present data can be found", "no present data can be found."]:
            return None, "ok", f"No coordinates provided for '{self.name}', coordinates will be set to null"

        raw = str(self.value).replace("[", "").replace("]", "").strip()

        # Split into coordinate pairs
        parts = [p.strip() for p in raw.split(",") if p.strip()]
        coords = []
        for part in parts:
            nums = part.split()
            if len(nums) != 2:
                return None, "error", f"Invalid coordinate pair '{part}' in '{self.name}'"
            try:
                lat, lon = float(nums[0]), float(nums[1])
            except ValueError:
                return None, "error", f"Coordinates must be numeric in '{self.name}'"
            if not (-90 <= lat <= 90):
                return None, "error", f"Latitude {lat} out of range"
            if not (-180 <= lon <= 180):
                return None, "error", f"Longitude {lon} out of range"
            coords.append([lon, lat])

        # Geometry-specific validation
        if geometry == "POINT":
            if len(coords) != 1:
                return None, "error", "POINT must have exactly 1 coordinate pair"
            return coords[0], "ok", "Valid POINT coordinates"
        elif geometry == "LINE":
            if len(coords) < 2:
                return None, "error", "LINE must have at least 2 coordinate pairs"
            return coords, "ok", "Valid LINE coordinates"
        elif geometry == "POLYGON":
            if len(coords) < 3:
                return None, "error", "POLYGON must have at least 3 coordinate pairs"
            if coords[0] != coords[-1]:
                coords.append(coords[0])
            return [coords], "ok", "Valid POLYGON coordinates"
        else:
            return coords, "warning", "Geometry type not provided, raw coordinates returned"
