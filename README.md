# Cordillera Atlas: Digital Mapping Project

## 🌄 Description

The Cordillera region has long carried its stories in mountains, rivers, and trade routes, but much of that knowledge remains scattered across old manuscripts. This project takes inspiration from Francisco Anatolin’s 18th-century account, translated by William Henry Scott, and brings those places into the digital age.

Think of this website as a **digital atlas** — where researchers, educators, and students can see historical sites mapped on an interactive 2D map of the Cordillera Administrative Region (CAR).

---

## 🎯 Background & Purpose

Historical documents describe the lives, commerce, and expeditions of the Cordilleran people, but these places often exist only as names in a book. Our goal is to transform that information into a visual, spatial form.

The project serves:

- **Primary users:** researchers and educators, who need a reliable and accurate representation of historical locations.
- **Secondary users:** students, who can explore geography with context and interactivity.

---

## ✨ Features

- **Interactive Map (Google Maps API)** – Pan, zoom, and explore CAR in 2D.
- **Markers & Popups** – Each site shows details like name, old references, and description.
- **Quick Search** – Jump to specific places quickly.
- **Downloadable Data** – GeoJSON and CSV available for researchers; packaged ZIP for convenience.
- **Simple & Accessible** – Works directly in a browser, no installation needed.

---

## 🛠 Tech Stack

- **Frontend:** HTML, CSS, JavaScript, Google Maps JS API
- **Backend (Data Prep):** Python or Node.js scripts for CSV → GeoJSON conversion and validation
- **Data Format:** GeoJSON, CSV (optional KML)

---

## 📂 Project Structure

```
cordi-atlas/
├── public/        # Static site files (deployed)
│   ├── index.html
│   ├── styles/
│   ├── scripts/
│   └── data/      # Final datasets (GeoJSON, CSV)
├── backend/       # Backend Committee workspace
│   ├── raw/
│   ├── processed/
│   ├── scripts/
│   └── exports/
├── docs/          # Documentation
├── tests/         # Validation scripts tests
└── README.md
```

---

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Calyx404/CORDI_Digital_Mapping.git
   ```

2. Open the site:

   - Navigate to `public/`
   - Open `index.html` in your browser

3. Add your Google Maps API key:
   - In `public/scripts/main.js`, replace `YOUR_API_KEY` with your key.

---

## 📊 Data

- Final datasets are in `public/data/`.
- Sources: Francisco Anatolin’s _Notices of the Pagan Igorots…_ (trans. Scott).
- Processed datasets:
  - `sites.geojson` – map-ready format
  - `sites.csv` – table format for researchers
  - `atlas.zip` – bundled package with docs and data

---

## 🤝 Contributing

We welcome contributions!
Check out [CONTRIBUTING.md](CONTRIBUTING.md) for commit conventions, branching rules, and review guidelines.

---

## 📜 License

- **Code**: MIT License (see [LICENSE-MIT](LICENSE-MIT))
- **Data**: Creative Commons Attribution 4.0 (see [LICENSE-CC-BY](LICENSE-CC-BY))

You are free to use, adapt, and share — but please give credit where it’s due.
