import csv
import json
import argparse
from pathlib import Path

def convert(input_file: Path):
    features = []

    with open(input_file, "r", encoding="utf-8", newline="") as csv_file:
        reader = csv.DictReader(csv_file)

        for row in reader:
            properties = {}
            geometry_type = None
            coordinates = None

            for key, value in row.items():
                if key not in ["geometry", "coordinates"]:
                    properties[key] = value

                if key == "geometry":
                    if value == "POINT":
                        geometry_type = "Point"

                    elif value == "LINE":
                        geometry_type = "LineString"

                    elif value == "POLYGON":
                        geometry_type = "Polygon"

                if key == "coordinates":
                    coordinates = json.loads(value)

            feature = {
                "type": "Feature",
                "geometry": {
                    "type": geometry_type,
                    "coordinates": coordinates
                },
                "properties": properties
            }

            features.append(feature)

        return features


def main():
    parser = argparse.ArgumentParser(description="Convert validated CSVs to GeoJSON.")
    parser.add_argument("csv_folder", type=str, help="Path to the folder containing validated CSV files.")
    parser.add_argument("geojson_file", type=str, help="Path to output GeoJSON file.")
    args = parser.parse_args()

    feature_collection = []

    for csv_file in Path(args.csv_folder).glob("*.export.csv"):
        feature_collection.extend(convert(csv_file))

    geojson = {
        "type": "FeatureCollection",
        "features": feature_collection
    }

    with open(args.geojson_file, "w", encoding="utf-8") as geojson_file:
        json.dump(geojson, geojson_file, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()
