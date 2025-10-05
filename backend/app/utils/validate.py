import csv
import argparse
from pathlib import Path
from validator import Fields

# Required fields schema
REQUIRED_FIELDS = [
    ("category", "category"),
    ("icon", "text"),
    ("geometry_type", "geometry_type"),
    ("coordinates", "coordinates"),
    ("historical_name", "text"),
    ("modern_name", "text"),
    ("present_day_location", "text"),
    ("primary_description", "text"),
    ("supporting_notes", "text"),
    ("introduction", "text"),
    ("literature_review", "text"),
    ("analysis", "text"),
    ("discussion", "text"),
    ("conclusion", "text"),
    ("references", "text"),
]

def validate(input_file: Path, output_file: Path, log_file: Path):
    with open(input_file, "r", encoding="utf-8-sig", newline="") as in_csv:
        reader = csv.DictReader(in_csv)

        # Initialize Fields validator
        fields_validator = Fields(reader.fieldnames, REQUIRED_FIELDS)

        with open(output_file, "w", encoding="utf-8", newline="") as out_csv:
            writer = csv.DictWriter(out_csv, fieldnames=fields_validator.fieldnames)
            writer.writeheader()

            row_num = 1
            for row in reader:
                clean_row, errors, warnings = fields_validator.validate_row(row, row_num)

                if errors:
                    for e in errors:
                        raise ValueError(f"[ERROR] ({row_num}) : {e}")

                    row_num += 1
                    continue

                if warnings:
                    for w in warnings:
                        raise ValueError(f"[WARNING] ({row_num}) : {w}")

                writer.writerow(clean_row)
                row_num += 1


def log(log_file: Path, message: str):
    """Append validation logs to file"""
    with open(log_file, "a", encoding="utf-8") as report:
        report.write(message + "\n")


def main():
    parser = argparse.ArgumentParser(description="Validate raw CSV files.")
    parser.add_argument("raw_folder", type=str, help="Path to the folder containing CSV files to validate.")
    parser.add_argument("export_folder", type=str, help="Path to the folder to store validated CSV files.")
    parser.add_argument("log_file", type=str, help="Path to the file to store validation report.")
    args = parser.parse_args()

    raw_folder = Path(args.raw_folder)
    export_folder = Path(args.export_folder)
    log_file = Path(args.log_file)

    log(log_file, f"INFO\t[{raw_folder}] : Starting validation process.")

    for raw_file in raw_folder.glob("*.raw.csv"):
        export_file = export_folder / raw_file.name.replace("raw", "export")

        log(log_file, f"INFO\t[{raw_file}] : Starting validation and export to {export_file}")

        try:
            validate(raw_file, export_file, log_file)
            log(log_file, f"PASS\t[{raw_file}] : Validated and exported to {export_file}")

        except Exception as e:
            log(log_file, f"SKIP\t[{raw_file}] : {e}")

    log(log_file, f"INFO\t[{raw_folder}] : Validation process completed.")


if __name__ == "__main__":
    main()
