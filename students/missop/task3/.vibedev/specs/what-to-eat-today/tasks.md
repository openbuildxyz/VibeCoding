# what-to-eat-today · Implementation Tasks (Draft)

Convert the feature design into a series of prompts for a code-generation LLM that will implement each step in a test-driven manner. Build incrementally, validate early, and ensure no orphaned code.

## Task List

- [x] 1. Initialize project scaffold (Next.js + TailwindCSS)
  - Create a new Next.js app with TypeScript and TailwindCSS.
  - Add base `README` with run/build scripts.
  - Reference: Non-functional (Req 10.1, 10.4); Design §2, §13.

- [x] 2. Set up i18n infrastructure (ZH/EN)
  - Create `src/i18n/index.ts` with key-based dictionary (`t`, `setLang`, `getLang`).
  - Persist selected language in `localStorage: lang` and add SSR-safe guard.
  - Add language toggle UI placeholder in Home.
  - Tests: unit test translation fallback and persistence.
  - Reference: Req 6.2, 10.3; Design §7.

- [x] 3. Define TypeScript data models
  - Create `src/types/index.ts` with `Item`, `FilterState`, `Coordinates`, `PriceTier`, `MealTime`, etc.
  - Ensure fields match requirements (bilingual labels, cuisine code, optional geo, meals, price).
  - Tests: compile-time type tests (tsd) or basic runtime validators for dataset shape.
  - Reference: Req 3.2; Design §4.

- [x] 4. Implement StorageService with graceful fallback
  - File: `src/services/storage.ts` with `get`, `set`, in-memory fallback when `localStorage` unavailable.
  - Keys: `favorites`, `blacklist`, `lang`, `filters`.
  - Tests: simulate storage disabled; verify fallback and warnings.
  - Reference: Req 4.1–4.5, 6.2, 10.1; Design §3.2, §6.

- [x] 5. Add built-in dataset
  - Create `public/data/items.json` with 20–30 entries covering cuisines/prices/meals; some with `geo`.
  - Implement `src/services/data.ts` with `loadItems()` and caching.
  - Tests: ensure schema conformity and load behavior.
  - Reference: Req 3.1–3.4, 7.1; Design §2, §4.

- [x] 6. Implement GeoService and distance math
  - File: `src/services/geo.ts` with `requestPermission()` and `distance()` (Haversine; meters).
  - Non-persistent coordinates; provide typed `Coordinates`.
  - Tests: known coordinate pairs for correctness; permission-denied flow.
  - Reference: Req 5.1–5.4, 2.3, 8.2–8.3; Design §3.2, §5.

- [x] 7. Implement FilterService (pure)
  - File: `src/services/filter.ts` with `filter(items, filters, geo, blacklist)` applying rules:
    - Cuisine (Req 2.1), Price (Req 2.2), Meal-time (Req 2.4), Distance (Req 2.3/5.4), Exclude blacklist (Req 4.4).
  - Tests: each branch and combinations; zero-results case.
  - Reference: Req 2.1–2.5, 4.4, 9.1; Design §5.

- [x] 8. Implement RandomService (uniform)
  - File: `src/services/random.ts` with `pickOne(list)` uniform random; deterministic seed for tests.
  - Tests: distribution sanity and empty-list returns null.
  - Reference: Req 1.4, 1.5 (weighting optional, default off), 1.1; Design §5.

- [x] 9. Create core UI components
  - `src/components/FilterBar.tsx`: cuisine multi-select, price tier, distance select (disabled when no geo), meal-time, language toggle.
  - `src/components/RandomButton.tsx`
  - `src/components/ResultCard.tsx`: show name, cuisine, price, distance (if available), actions: favorite/blacklist/open link.
  - Tests: component render logic and disabled states.
  - Reference: Req 6.1–6.5, 2.3, 2.5; Design §3.1.

- [x] 10. Wire Home page and state management
  - Page: `app/page.tsx` (or `pages/index.tsx`), load dataset, init filters from storage, render FilterBar/RandomButton/ResultCard.
  - Maintain app state (filters, items, geo, favorites, blacklist) with React state or lightweight store.
  - Tests: integration test to apply filters then click Random -> result matches filters.
  - Reference: Req 1.1–1.3, 2.5, 3.1–3.4, 4.1–4.4, 5.1–5.4, 9.1; Design §3.3.

- [x] 11. Implement favorites/blacklist interactions
  - Toggle favorite/blacklist on ResultCard; persist via StorageService and update UI.
  - Provide a minimal Favorites view (optional): route or section listing favorites with un-favorite.
  - Tests: persistence across reload (same device) and pool exclusion for blacklist.
  - Reference: Req 4.1–4.4, 6.3; Design §3.3.

- [x] 12. Handle empty states and errors
  - Implement empty-state component with actions to relax filters.
  - Toasts for geolocation denial and storage fallback; copy sourced from i18n.
  - Tests: simulate zero results, denied geolocation, storage failures.
  - Reference: Req 1.2, 5.3, 9.1–9.3; Design §6.

- [x] 13. Accessibility and mobile-first styling
  - Ensure semantic buttons, ARIA labels, focus states, color contrast; Tailwind responsive layout.
  - Tests: basic axe checks where feasible.
  - Reference: Req 6.1, 6.4; Design §8.

- [x] 14. Performance guardrails
  - Keep dataset <50KB, lazy-load if needed; tree-shake imports.
  - Tests: bundle size budget check (lint / CI-friendly script) and filter latency micro-benchmark.
  - Reference: Req 7.1–7.3, 10.1; Design §9.

- [x] 15. Final wiring and smoke tests
  - Verify end-to-end flow in automated tests: select filters -> random -> favorite/blacklist -> persistence -> geolocation toggle.
  - Ensure external links open with `rel="noopener"`.
  - Reference: Req 1–10 overall; Design §10–§11.
