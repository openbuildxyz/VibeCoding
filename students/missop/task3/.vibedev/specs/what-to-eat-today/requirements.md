# what-to-eat-today · Requirements (Initial)

## 0. Introduction
A mobile-first bilingual (ZH/EN) web app that helps users decide “what to eat today.” MVP provides one-click random recommendations with basic filters (cuisine/budget/distance/meal-time), a small built-in dataset, local favorites/blacklist without login, and optional geolocation to prioritize nearby options.

Conventions:
- User story: "As a [role], I want [feature], so that [benefit]".
- Acceptance criteria use EARS syntax: When/While/If/Where/Provided that/Then/shall.

## 1. One-click Random Recommendation
- User story: As a hungry user, I want a one-tap button to get a food suggestion, so that I can decide quickly.
- Acceptance criteria:
  1. When the user taps "Random", the system shall return one item (restaurant or dish) that matches current active filters.
  2. If no item matches, the system shall display a friendly empty-state with guidance to relax filters.
  3. Provided that the user has a blacklist, the system shall exclude blacklisted items from the random pool.
  4. When multiple items match, the system shall select uniformly at random by default.
  5. Where a favorite list exists, the system may optionally increase selection weight for favorites (configurable for later, default off in MVP).

## 2. Filters (Cuisine/Budget/Distance/Meal Time)
- User story: As a user with preferences, I want to filter options, so that recommendations fit my constraints.
- Acceptance criteria:
  1. The system shall allow selecting one or more cuisines (e.g., 川/湘/粤/日/泰, and EN equivalents).
  2. The system shall allow choosing a budget tier (e.g., low/medium/high) and shall filter items priced accordingly.
  3. If geolocation is available, the system shall allow distance thresholds (e.g., 500m, 1km, 3km). If geolocation is unavailable/denied, the distance filter shall be disabled with clear messaging.
  4. The system shall support meal-time context (breakfast/lunch/dinner/late-night) and only return items tagged for that time when active.
  5. When filters change, the system shall update the eligible pool immediately without page reload.

## 3. Built-in Dataset
- User story: As a first-time user, I want useful default options, so that I can get value without setup.
- Acceptance criteria:
  1. The product shall ship with a small JSON dataset of items (10–50 entries) covering mixed cuisines and prices.
  2. Each item shall include: id, name, type (restaurant|dish), cuisine, price tier, optional geo (lat/lng), meal-time tags, optional link, and i18n labels.
  3. The dataset shall be easily extensible (a single JSON file or folder of JSONs) without code changes.
  4. If distance filter is active, the system shall only consider items that have geo coordinates.

## 4. Favorites and Blacklist (Local, No Login)
- User story: As a recurring user, I want to favorite or blacklist items, so that the app aligns with my tastes.
- Acceptance criteria:
  1. When the user taps Favorite on an item, the system shall persist the item id into localStorage favorites list.
  2. When the user taps Blacklist on an item, the system shall persist the item id into localStorage blacklist list.
  3. The system shall reflect favorite/blacklist states in UI consistently across sessions on the same device.
  4. The system shall exclude blacklisted items from recommendation and may surface favorites in a dedicated view.
  5. If localStorage is unavailable, the system shall degrade gracefully in-memory with a user notice.

## 5. Optional Geolocation
- User story: As a user on the go, I want nearby suggestions, so that I can choose conveniently.
- Acceptance criteria:
  1. When the user opts in, the system shall request HTML5 geolocation permission.
  2. If permission is granted, the system shall store current coordinates in memory (not persisted) and use them for distance computation.
  3. If permission is denied or errors occur, the system shall display a non-blocking message and disable distance-based filtering gracefully.
  4. The system shall compute distances using Haversine or similar and show approximate distance on items when available.

## 6. UI/UX and i18n (ZH/EN)
- User story: As a mobile-first user, I want a simple, fast interface in my language, so that I can decide quickly.
- Acceptance criteria:
  1. The UI shall be mobile-first and responsive, rendering properly on 360–1440px widths.
  2. The app shall support Chinese and English with a language toggle; the chosen language shall be remembered locally.
  3. The primary actions (Random, Filters, Favorite/Blacklist) shall be reachable within one tap from the main view.
  4. The app shall have accessible color contrast and semantic controls for buttons and toggles.
  5. Empty states and errors shall provide clear, concise copy in the selected language.

## 7. Performance and Offline
- User story: As a user on mobile data, I want snappy interactions, so that I don’t wait.
- Acceptance criteria:
  1. The initial bundle shall target a fast TTI on mid-range devices; dataset loading shall be lazy or bundled small (<50KB recommended in MVP).
  2. The system shall cache static assets via standard browser caching; PWA is optional (nice-to-have, not required in MVP).
  3. The random selection and filtering shall run client-side with sub-100ms latency on the built-in dataset.

## 8. Privacy and Consent
- User story: As a privacy-conscious user, I want control, so that my data isn’t misused.
- Acceptance criteria:
  1. The app shall not require login; preferences are stored only on the device via localStorage.
  2. The app shall only request geolocation when explicitly triggered by the user.
  3. When geolocation is requested, the app shall clearly state its purpose and non-persistent usage.
  4. The app shall not transmit personal data or precise location to a backend in MVP.

## 9. Error Handling and Empty States
- User story: As a user, I want clear guidance when something goes wrong, so that I can recover.
- Acceptance criteria:
  1. If filters produce zero results, the system shall display suggestions to relax filters.
  2. If localStorage read/write fails, the system shall notify the user and continue in volatile mode.
  3. If geolocation fails, the system shall show a brief non-blocking error and disable distance features.

## 10. Non-functional Constraints
- Acceptance criteria:
  1. The MVP shall function without any server-side component (static hosting acceptable).
  2. The codebase shall be structured to later swap built-in dataset for external APIs.
  3. The UI text shall be centralized for i18n.
  4. The project shall include a README with run/build/deploy instructions.
