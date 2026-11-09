# TripMate — Travel Budget Planner (PWA)

A responsive, installable travel budget planner built with HTML5, CSS3 and Vanilla JavaScript. All trip, expense, profile and preference data is stored locally in the browser using `localStorage`.

## Features

- Dashboard totals, recent trips, budget progress and category breakdown
- Create, edit, search, filter and delete trips
- Add, edit, search, filter and delete expenses
- Automatic budget and remaining-balance calculations
- Category donut charts, monthly spending bars and per-trip budget comparison (drawn with Canvas/CSS; no chart library required)
- USD, KHR, THB and EUR display formats (formatting only; no currency conversion)
- Light and dark themes
- CSV expense export and JSON backup/restore
- PWA manifest, install prompt, service worker caching, offline shell and update notification
- Online/offline status and responsive mobile navigation

## Run locally

1. Extract the project folder.
2. Open it in Visual Studio Code.
3. Start a local web server, for example with the **Live Server** extension.
4. Open the `http://localhost:...` address shown by Live Server.

Do **not** open `index.html` using `file://`; service workers and PWA installation require HTTPS or localhost.

## Install

- **Android / desktop Chromium browsers:** open the site over HTTPS or localhost and use the **Install App** button when it appears, or the browser's install option.
- **iPhone / iPad:** open the deployed site in Safari, tap **Share**, then **Add to Home Screen**.
- **Other browsers:** use the browser menu's install or create-shortcut option if available.

For installation on another device, deploy the folder to an HTTPS host such as Vercel, Netlify or GitHub Pages. Keep the directory structure intact.

## Offline and updates

The service worker caches the app shell on the first successful visit. After that, the app interface can load offline. The app's data is in that browser's LocalStorage and remains on the device; it is not synchronized to other devices and may be cleared by browser storage cleanup. Use **Settings → Download JSON backup** to move data manually. After publishing a new version, increment `CACHE_NAME` in `service-worker.js` (for example, `tripmate-shell-v2`) so clients download the updated shell.

## Project structure

```text
TripMate/
├── index.html
├── manifest.json
├── service-worker.js
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── storage.js
│   ├── trips.js
│   ├── expenses.js
│   ├── reports.js
│   ├── settings.js
│   └── pwa.js
├── assets/
│   ├── images/
│   └── icons/
│       ├── icon-192.png
│       ├── icon-512.png
│       └── icon-maskable-512.png
└── README.md
```

## Data and privacy notes

- Data is stored in the current browser profile on the current device.
- Currency selection changes the display format only. It does not convert values using exchange rates.
- The profile is a local demo profile; there is no login, backend or cloud sync.
- Cover image URLs require an internet connection to load; the core app and locally stored records work offline after caching.
- Clearing browser site data can remove LocalStorage. Export a JSON backup regularly.

## Quick test checklist

- [ ] Create, edit, filter and delete a trip.
- [ ] Add, edit, filter and delete an expense.
- [ ] Verify deleting a trip also deletes its related expenses.
- [ ] Refresh the page and confirm data persists.
- [ ] Export CSV and JSON, then restore the JSON backup.
- [ ] Change currency and theme.
- [ ] Visit once online, then switch to offline and reload.
- [ ] Test install on a supported Android/desktop browser and Add to Home Screen on iOS Safari.
