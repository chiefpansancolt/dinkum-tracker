# Changelog

All notable changes to Dinkum Tracker will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

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
