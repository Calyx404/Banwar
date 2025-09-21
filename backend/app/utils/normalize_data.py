class Field:
    def __init__(self, name, value, required=True, ftype="text"):
        """
        @param name: field/column name
        @param value: raw value from CSV
        @param required: True if field must have a value
        @param ftype: 'text', 'int', 'float', 'geometry', 'coordinates'
        """
        self.name = name
        self.value = value
        self.required = required
        self.ftype = ftype

    def validate(self):
        """
        Validates and normalizes the value.
        Returns (value, status, message)
        - status: "ok", "warning", "error"
        - message: description of what was done or what went wrong
        """
        if self.required and (self.value is None or str(self.value).strip() == ""):
            return None, "error", f"Missing required value in '{self.name}'"

        if self.ftype == "int":
            return self._validate_int()
        elif self.ftype == "float":
            return self._validate_float()
        elif self.ftype == "geometry":
            return self._validate_geometry()
        elif self.ftype == "coordinates":
            return self._validate_coordinates()
        else:
            return self._standardize_text()

    # ----------------- Helpers -----------------
    def _standardize_text(self):
        """Trim, normalize whitespace, capitalize first letter."""
        val = str(self.value).strip()
        if val == "":
            return val, "warning", f"Empty text in '{self.name}'"
        normalized = val[0].upper() + val[1:]
        if normalized != val:
            return normalized, "warning", f"Normalized text in '{self.name}'"
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

    def _validate_geometry(self):
        val = str(self.value).strip().upper()
        if val not in ["POINT", "LINE", "POLYGON"]:
            return None, "error", f"Invalid geometry type '{val}'"
        if val != self.value:
            return val, "warning", f"Normalized geometry to uppercase '{val}'"
        return val, "ok", "Valid geometry"

    def _validate_coordinates(self, geometry=None):
        """
        Validate coordinates based on geometry type:
        - POINT: exactly 1 pair (lon, lat)
        - LINE: 2 or more pairs
        - POLYGON: 3 or more pairs
        """
        raw = str(self.value).replace("[", "").replace("]", "").strip()

        if not raw:
            return None, "error", f"Empty coordinates in '{self.name}'"

        # Split into coordinate pairs
        parts = [p.strip() for p in raw.split(",") if p.strip()]
        coords = []

        for part in parts:
            nums = part.split()

            if len(nums) != 2:
                return None, "error", f"Invalid coordinate pair '{part}' in '{self.name}'"

            try:
                lon, lat = float(nums[0]), float(nums[1])
            except ValueError:
                return None, "error", f"Coordinates must be numeric in '{self.name}'"

            if not (-180 <= lon <= 180):
                return None, "error", f"Longitude {lon} out of range in '{self.name}'"

            if not (-90 <= lat <= 90):
                return None, "error", f"Latitude {lat} out of range in '{self.name}'"

            coords.append([lon, lat])

        # Geometry-specific validation
        if geometry == "POINT":
            if len(coords) != 1:
                return None, "error", f"POINT must have exactly 1 coordinate pair in '{self.name}'"

        elif geometry == "LINE":
            if len(coords) < 2:
                return None, "error", f"LINE must have at least 2 coordinate pairs in '{self.name}'"

        elif geometry == "POLYGON":
            if len(coords) < 3:
                return None, "error", f"POLYGON must have at least 3 coordinate pairs in '{self.name}'"

        return coords, "ok", "Valid coordinates"
