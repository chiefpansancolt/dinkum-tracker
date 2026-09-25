# Changelog

All notable changes to Dinkum Tracker will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [1.5.0] - 2026-09-25

### Added

- Decorations collection page (`/playthrough/[id]/decorations`), replacing the "Coming Soon"
  placeholder. Filters by category, source, and collection status, following the same pattern as
  the Furniture page.
- Food Modeller reference page (`/dinkum/food-modeller`) — every Food Modeller conversion from food
  and crops into display furniture. Reference only, not trackable for collection.
- Daily Milestones reference page (`/dinkum/daily-milestones`) — the full 120-task daily milestone
  pool grouped by category, with search and a category filter. Reference only, not trackable for
  collection.
- Both new reference pages are linked from the sidebar's "Resource References" section and the
  `/dinkum` hub page.

### Changed

- Bump `dinkum-data` to `1.0.2`, pulling in the new `decorations()` and `foodModellerRecipes()`
  modules, the full 1st Anniversary Update ("The Great Bite") content, and a complete wiki
  reconciliation pass across every existing module.

### Fixed

- `WeaponCard` and `EquipmentCard` always rendered buy price with the Dinks icon regardless of the
  item's `buyUnits` field, unlike `ToolCard` which already branched correctly; this mis-displayed
  Boom Box (priced in Permit Points).
- Permit point values on the Daily Milestones page rendered with default black text regardless of
  theme, since the shared `PermitValue` component relies on its parent for text color and this page
  didn't use the usual `ItemCard` wrapper.
- Several images (including "Sparkin' Soup Plate") were broken due to an upstream `dinkum-data` bug
  where asset filenames were literally named with `%27` instead of a real apostrophe; resolved by
  the `dinkum-data` version bump.

## [1.4.0] - 2026-09-24

### Changed

- Replace the local hardcoded game-data layer (`src/data/dinkum/`, `src/types/dinkum/`) with the
  [dinkum-data](https://www.npmjs.com/package/dinkum-data) npm package as the single source of
  truth for all Dinkum game data. Every page and component now queries the package's chainable
  query builder API directly instead of local helper functions.
- Add a `postinstall` script (`scripts/copy-game-assets.sh`) that syncs `public/images/` from the
  installed `dinkum-data` package on every install, replacing the previous locally committed
  image set.
- Use the `dinkum-data` package's `clothingSlots()`, `buffIcons()`, `milestoneCategories()`, and
  `relics().uniqueLocations()` in place of the equivalent hardcoded local constants.
- Merge the stateful playthrough calendar (`GameCalendar`) directly into
  `src/lib/services/calendar.ts`, now seeded from the package's static calendar data instead of
  regenerating birthdays and events locally.
- Consolidate three separate hardcoded copies of the season-cycle order into a single
  `SEASON_ORDER` export, derived from the package's calendar data instead of hand-typed.

### Fixed

- Fix `CollectionCardProps.record`'s union type, which was missing `Cassette` and `Furniture`
  even though both were consumed; previously masked by `skipLibCheck`.

## [1.3.0] - 2026-04-10

### Features

- Add active playthrough switcher to the sidebar — switch between playthroughs from any page without navigating to the list
- Persist active playthrough selection in localStorage so it is remembered across page navigations
- Always show current playthrough nav items in the sidebar whenever an active playthrough is set, not only when on a playthrough route
- Add global search bar to the top navigation — search across all 18 tracked categories (fish, bugs, critters, NPCs, milestones, licenses, buildings, skills, recipes, gear, clothing, furniture, and more) when a playthrough is active; clicking a result navigates to that item's page with the search pre-filled
- Add NPCs to global search results; navigates to the NPC relationships page on click
- Update Playthroughs list — replace "Manage Playthrough" button with "Set as Active Playthrough"; the currently active playthrough shows a muted indicator instead of the button

### Changed

- Migrate all game images from remote Dinkum Wiki URLs to locally hosted files under `public/images/` for faster load times and offline availability
- Update footer copyright to display the current year dynamically
- Update footer copyright symbol to use a React icon (`FaRegCopyright`)

## [1.2.0] - 2026-03-11

### Features

- Add GitHub Actions CI workflow with separate lint and build jobs
- Add GitHub Actions Deploy workflow with manual trigger and preview/production environment selection

### Fixed

- Replace all `<img>` elements with Next.js `<Image />` across the entire codebase for optimized image loading
- Fix synchronous setState calls inside useEffect hooks (use lazy initializers and useMemo instead)
- Fix derived state computed inside useMemo callbacks
- Remove unused eslint-disable directives

### Chore

- Bump Dependencies

## [1.1.0] - 2025-11-03

### Features

- Add Animal Tracks update items
- Add Weight Calculator tool

### Bugs

- Add missing items to track and view
- Add missing clothing
- Add prices to the rest of clothing
- Fix other various UI issues

## [1.0.0] - 2025-05-04

### Features

#### Playthrough Management

- Create and manage multiple playthroughs
- View playthrough list with sorting options (name, created date, last updated)
- Dashboard for each playthrough with a full progress overview
- Export all playthroughs to a JSON backup file
- Import playthroughs from backup files
- Reset / clear all data with confirmation
- Configurable default sort preference in settings
- All data persists locally in browser localStorage — no backend required

#### Collection Tracking (Pedia)

- **Fish** — track collected and donated status for 45 species; filter by season, biome, time of day, and rarity
- **Bugs** — track collected and donated status for 50 species; filter by season, biome, time of day, and rarity
- **Critters** — track collected and donated status for 25 species; filter by season, biome, time of day, and rarity
- Museum donation tracking across all three collections

#### Progress Tracking

- **Milestones** — track completion of 98+ in-game achievements
- **Licenses** — track acquisition and upgrade levels for 25 licenses
- **Buildings** — track construction completion for 31 buildings
- **Skills** — track numeric skill level progression across 6 skills
- **NPC Relationships** — track friendship/heart levels for 23 town NPCs
- **Calendar** — track current in-game day and season; view upcoming events and birthdays

#### Equipment & Gear Tracking

- **Tools** — catalog and track ownership of 63 tools
- **Weapons** — catalog and track ownership of 30 weapons
- **Equipment** — catalog and track acquisition of 58 equipment pieces
- **Vehicles** — catalog and track ownership of 21 vehicles
- **Books** — track collection of 6 books
- **Cassettes** — track collection of 15 music cassettes

#### Recipe Tracking

- **Cooking Recipes** — track 206 unlocked cooking recipes with ingredients and requirements
- **Crafting Recipes** — track 480 unlocked crafting recipes with resource requirements
- **Sign Writing Recipes** — track 30 sign writing recipes

#### Apparel & Furniture Tracking

- **Clothing** — catalog and track ownership of 515+ clothing items with search and filter
- **Furniture** — catalog and track acquisition of 421+ furniture items with search and filter

#### Resources & Items Breakdown

- Analyze which items require specific resources across recipes, buildings, and crafting
- Filter by resource type, category, or craftable item
- Resource categories: Animal Products, Crops, Foragables, Minerals, Other Craftables, Paint Colors, Relics, Seeds, and Trophies

#### Game Reference Pages (Dinkum Database)

- **Animals** — browse and reference 45 farm and wild animals
- **Resources** — comprehensive resource catalog with sourcing information
- **Seeds** — 36+ plantable seeds with seasonal and harvest details
- **Crops** — 16+ harvestable crops with seasonal information
- **Flowers** — all flowers with growing locations and seasonal availability
- **Trees** — 17+ trees with harvestable resource information

#### User Interface & Experience

- Responsive sidebar navigation with breadcrumb trail
- Mobile-friendly responsive design with dark mode support
- Dashboard stat cards: skills, licenses, milestones, collections, gear, buildings, recipes, NPCs, and game info
- Advanced multi-dimension filtering (search, biome, season, time of day, rarity, category)
- Save floating action button (FAB) that appears only when there are unsaved changes
- Toast notifications for user feedback
- Settings page with data export/import, reset, dark mode, and sort preference options
