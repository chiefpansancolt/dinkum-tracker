# Dinkum Tracker

A free progress tracker for the game Dinkum. Keep several playthroughs, record what each one has found, built and unlocked, and see what is left. Everything is saved in your browser. There is no account. Cloud sync is optional and keeps your data in your own storage.

This is an unofficial fan tool. It is not affiliated with, endorsed by, or connected to Dinkum or its creators. Game names and images belong to their owners.

## What it does

Each playthrough has one page per game area. Every change saves at once, and a toast offers Undo.

- **Overview**: progress across every area, with a fixed total of 2,103 items.
- **Pedia**: fish, bugs and critters, with filters for season, biome, time of day and rarity, and a Missing, Caught or Donated control.
- **NPCs and Calendar**: relationship hearts for every NPC, plus events and birthdays by season and day.
- **Buildings, Licenses, Milestones and Skills**: levels that follow the game's rules, with Complete All and Clear All.
- **Recipes**: cooking (with a Buffs filter), crafting and sign writing.
- **Gear**: books, cassettes, tools, weapons, equipment and vehicles.
- **Wardrobe and home**: clothing, furniture and decorations, with slot, set and category tiles that filter the list.
- **Items breakdown and Weight calculator**: what a list of items costs in raw resources, and the price of weighted items.
- **Reference**: read only pages for animals, resources, plants, the Food Modeller and the daily milestones.
- **Settings**: language and region, number and date formats, theme (light, dark or system), backup export and import, optional cloud sync, and reset.

Prices can be shown at any commerce level (Base, +5%, +10% or +15%). Long lists load as you scroll. Pedia and most Collect pages offer a grid and a list view.

## Run it

Node 24 and pnpm are required.

```
pnpm install
pnpm dev
```

Then open http://localhost:3000. Other commands:

```
pnpm build
pnpm lint
pnpm test
pnpm format:check
```

`pnpm install` also copies the game images into `public/images` (see Game data).

Two scripts keep the text catalogs honest:

```
node scripts/check-catalogs.mjs     # every language against English
node scripts/check-i18n.mjs         # text in code that is not in a catalog
```

### Environment variables

All are optional and public (`NEXT_PUBLIC_`). Next.js reads them at build time, so redeploy after a change.

- `NEXT_PUBLIC_GAMERDEX_AUTH_URL`: the address of the sign-in service. The package `@gamerdexapp/gamerdex-sync` has a default. An empty value turns sync off.
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`, `NEXT_PUBLIC_DROPBOX_CLIENT_ID`, `NEXT_PUBLIC_MICROSOFT_CLIENT_ID`: override the client ID of a sync provider. An empty value leaves that provider out.

## Project structure

- `src/app`: routes. Old `/playthrough/{id}/...` addresses redirect to the matching page.
- `src/components`: the app shell, the shared UI kit in `ui/`, and one folder per game area.
- `src/lib`: contexts, hooks and services (storage, completion, levels, sync, calculators).
- `src/i18n`: the language setup and the text catalogs.
- `tests`: unit tests, run by Vitest.
- `scripts`: the asset copy and the catalog checks.

## Game data

The game data comes from the `dinkum-data` package, pinned to one exact version. Names, prices, sources, descriptions and images are read from it and never copied by hand. The script `scripts/copy-game-assets.sh` copies the image folders from the package into `public/images`. That folder is not committed.

## Data and privacy

Your playthroughs and choices are stored in your browser, in four `localStorage` keys: `dinkum-tracker-playthroughs`, `dinkum-tracker-active-playthrough`, `dinkum-tracker-default-sort` and `dinkum-tracker-prefs`. The theme is kept in `flowbite-theme-mode`, and the cloud sync sign-in in `dinkum-tracker-sync`. The tracker has no analytics code and no account. Clearing site data removes it, so use Settings, Backup and data to export a JSON file. You can import it again later, on this device or another.

Language, number format, date format, theme and view choices belong to the device. They are not part of the export file or the synced file.

Cloud sync is off until you turn it on in Settings, Cloud sync. You choose GitHub, Google Drive, Dropbox or OneDrive, and the app keeps one file in your own storage. The file has the same format as the export file. A small sign-in service, [gamerdex-auth](https://github.com/gamerdexapp/gamerdex-auth), only exchanges the login token and does not see or keep your data.

## Language support

The app ships in 19 languages: English, Arabic, German, Spanish (Spain and Latin America), French, Indonesian, Italian, Japanese, Korean, Malay, Portuguese (Brazil and Portugal), Russian, Thai, Turkish, Vietnamese and Chinese (Simplified and Traditional). Arabic reads right to left. The text lives in catalogs under `src/i18n/messages/<code>/`, so a new language is a new catalog folder and one entry in `src/i18n/locales.ts`. Game data such as item, NPC and fish names stays in English. Number and date formats are separate choices in Settings.

## Contributing

Issues and pull requests are welcome. Read [CONTRIBUTING.md](.github/CONTRIBUTING.md) first.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## License

MIT. See [LICENSE](LICENSE). The game, its name and its content belong to their owners. Game data comes from the [Dinkum Wiki](https://dinkum.fandom.com/wiki/Dinkum_Wiki).
