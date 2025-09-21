import re, csv, argparse
from pathlib import Path
from normalize_data import Field

# Required fields schema
REQUIRED_FIELDS = [
    ("id", "int"),
    ("historical_name", "text"),
    ("modern_name", "text"),
    ("geometry", "geometry"),
    ("coordinates", "coordinates"),
    ("present_day_location", "text"),
    ("primary_description", "text"),
    ("supporting_notes", "text"),
]

def validate(input_file: Path, output_file: Path, log_file: Path):
    with open(input_file, "r", encoding="utf-8", newline="") as csv_file:
        reader = csv.DictReader(csv_file)

        normalized_headers = [to_snake_case(h) for h in reader.fieldnames] # type: ignore

        # Check required headers
        missing_headers = [field for field, _ in REQUIRED_FIELDS if field not in normalized_headers]

        if missing_headers:
            raise Exception(f"[ERROR] Missing required headers in {input_file}: {missing_headers}")

        with open(output_file, "w", encoding="utf-8", newline="") as out_csv:
            writer = csv.DictWriter(out_csv, fieldnames=normalized_headers)
            writer.writeheader()

            row_num = 1
            for row in reader:
                row_normalized = {to_snake_case(k): v for k, v in row.items()}

                clean_row = {}
                skip_row = False

                # Required fields
                for field, ftype in REQUIRED_FIELDS:
                    f = Field(field, row_normalized.get(field, ""), required=True, ftype=ftype)
                    value, status, message = f.validate()

                    if status == "error":
                        raise ValueError(f"[ERROR] ({row_num}) : ({field}) : {message}")
                        skip_row = True
                        break

                    elif status == "warning":
                        raise ValueError( f"[WARNING] ({row_num}) : ({field}) : {message}")

                    clean_row[field] = value

                # Additional fields
                for field in row_normalized.keys():
                    if field not in clean_row:
                        f = Field(field, row_normalized[field], required=False, ftype="text")
                        value, status, message = f.validate()

                        if status == "warning":
                            raise ValueError( f"[WARNING] ({row_num}) : ({field}) : {message}")

                        clean_row[field] = value

                if not skip_row:
                    writer.writerow(clean_row)

                row_num += 1

def to_snake_case(name: str) -> str:
    name = name.replace("-", "_").replace(" ", "_")
    name = re.sub(r'([a-z0-9])([A-Z])', r'\1_\2', name)

    return name.lower().strip()

def log(log_file: Path, message: str):
    with open(log_file, "a", encoding="utf-8") as report:
        report.write(message + "\n")

def main():
    parser = argparse.ArgumentParser(description="Validate raw CSV files.")
    parser.add_argument("raw_folder", type=str, help="Path to the folder containing CSV files to validate.")
    parser.add_argument("export_folder", type=str, help="Path to the folder to store validated CSV files.")
    parser.add_argument("log_file", type=str, help="Path to the file to store validation report.")
    args = parser.parse_args()

    raw_dir = Path(args.raw_folder)
    export_dir = Path(args.export_folder)
    log_file = Path(args.log_file)
    export_dir.mkdir(parents=True, exist_ok=True)

    log(Path(args.log_file), f"INFO\t[{args.raw_folder}] : Starting validation process.")

    for raw_file in raw_dir.glob("*.raw.csv"):
        export_filename = raw_file.name.replace("raw", "export")
        export_file = export_dir / export_filename

        log(log_file, f"INFO\t[{raw_file}] : Starting validation and export to {export_file}")
        try:
            validate(raw_file, export_file, log_file)
            log(log_file, f"PASS\t[{raw_file}] : Validated and exported to {export_file}")
        except Exception as e:
            log(log_file, f"SKIP\t[{raw_file}] : {e}")

    log(log_file, f"INFO\t[{args.raw_folder}] : Validation process completed.")

if __name__ == "__main__":
    main()
