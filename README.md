# Atlas Academy

Atlas Academy is a web-based geography learning game built with plain HTML, CSS, and vanilla JavaScript.

It includes:

- Study mode for browsing country facts
- Adaptive quiz mode with multiple fact types
- Local progress tracking with `localStorage`
- Statistics and mastery dashboards
- Offline-ready PWA support
- A sovereign-states-only dataset ranked by population

## Features

- Country facts:
  - name
  - flag
  - capital
  - largest city
  - population in millions
  - silhouette shape
- Quiz modes:
  - Country → Capital
  - Country → Flag
  - Flag → Country
  - Country → Most Populous City
  - Country → Population
  - Shape → Country
  - Mixed mode
- Adaptive scheduling:
  - tracks correctness, streaks, ease, due time, and mastery
  - surfaces weak facts more often
  - spaces out mastered facts
- PWA behavior:
  - installable when served over `http://localhost` or `https://`
  - checks for updates on every load
  - shows an update banner when a newer version is available

## Project Files

- [`index.html`](/Users/kyleglashower/Documents/Geography%20Quiz/index.html)
- [`styles.css`](/Users/kyleglashower/Documents/Geography%20Quiz/styles.css)
- [`app.js`](/Users/kyleglashower/Documents/Geography%20Quiz/app.js)
- [`countries.json`](/Users/kyleglashower/Documents/Geography%20Quiz/countries.json)
- [`manifest.webmanifest`](/Users/kyleglashower/Documents/Geography%20Quiz/manifest.webmanifest)
- [`sw.js`](/Users/kyleglashower/Documents/Geography%20Quiz/sw.js)
- [`assets/shapes`](/Users/kyleglashower/Documents/Geography%20Quiz/assets/shapes)
- [`icons/icon.svg`](/Users/kyleglashower/Documents/Geography%20Quiz/icons/icon.svg)

## Run Locally

### Quick start

You can still open [`index.html`](/Users/kyleglashower/Documents/Geography%20Quiz/index.html) directly in a browser.

That works for the core app, but `file://` has limits:

- no real PWA install flow
- no service worker
- no automatic update checks

### Recommended local server

To use the full PWA behavior:

```bash
cd "/Users/kyleglashower/Documents/Geography Quiz"
python3 -m http.server 8000
```

Then open:

[http://localhost:8000](http://localhost:8000)

## How Updates Work

When the app is served from `http://localhost` or `https://`:

- the service worker registers on load
- the browser checks for a new service worker every time the app starts
- if a newer version is available, the app shows an update banner
- clicking `Reload` activates the new version immediately

## Data Model

Each country entry in [`countries.json`](/Users/kyleglashower/Documents/Geography%20Quiz/countries.json) follows this shape:

```json
{
  "id": "japan",
  "iso2": "JP",
  "iso3": "JPN",
  "name": "Japan",
  "flag": "🇯🇵",
  "capital": "Tokyo",
  "largest_city": "Tokyo",
  "population_millions": 126.5,
  "shape_data": {
    "type": "image",
    "src": "assets/shapes/japan.svg"
  },
  "region": "Asia",
  "aliases": ["JP", "Nippon", "Nihon"]
}
```

## Current Dataset

The app currently uses:

- `195` sovereign-state entries
- ranked by population
- with local SVG silhouette files

## Architecture

The app is intentionally kept simple and split into clear sections inside [`app.js`](/Users/kyleglashower/Documents/Geography%20Quiz/app.js):

- data loading
- state management
- persistence
- adaptive scheduling
- question generation
- scoring and feedback
- study rendering
- quiz rendering
- analytics and statistics
- PWA registration and update handling

## Expanding or Rebuilding the Dataset

The current expanded dataset was assembled from public sources including:

- GeoNames `countryInfo.txt`
- GeoNames `cities5000`
- `mledoze/countries`
- `datasets/geo-countries`

If you want to rebuild or improve the dataset later, the main areas to refine are:

- largest-city accuracy for edge cases
- silhouette filtering for island-heavy countries
- population freshness
- alias normalization

## Notes

- Progress is stored locally in the browser using `localStorage`.
- Import/export is supported from the Settings screen.
- The app is framework-free and requires no build step.

## TODO Ideas

- Add a dedicated dataset build script instead of embedding the expanded fallback directly in [`app.js`](/Users/kyleglashower/Documents/Geography%20Quiz/app.js)
- Add achievement badges to the UI
- Add fuzzy matching for typed answers
- Add recent-mistakes review sessions
- Add difficulty presets
- Add more polished install prompts for the PWA
