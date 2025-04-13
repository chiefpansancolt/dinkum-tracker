# Dinkum Tracker

A Next.js application to track your progress in the Dinkum game. This tracker allows you to create and manage multiple playthroughs, track collections, and monitor milestones all saved locally in your browser using localStorage.

## Features

- Create and manage multiple playthroughs
- Track collections (animals, fish, bugs, minerals)
- Monitor milestones and licenses
- All data saved locally using localStorage
- Responsive design with Tailwind CSS 4.1

## Technology Stack

- **Next.js 15.3.0** - Latest version with React 19 support
- **Tailwind CSS 4.1.0** - Utility-first CSS framework
- **TypeScript** - Type safety and better developer experience
- **pnpm** - Fast, disk space efficient package manager
- **localStorage** - Client-side storage

## Project Structure

```text
dinkum-tracker/
├── app/                  # Next.js pages using App Router
│   ├── layout.tsx        # Main layout with header and footer
│   ├── page.tsx          # Home page
│   ├── playthroughs/     # Page to list all playthroughs 
│   ├── new-playthrough/  # Page to create a new playthrough
│   └── globals.css       # Global styles and Tailwind imports
├── components/           # React components
│   ├── ui/               # UI components (Button, Card, etc.)
│   ├── PlaythroughCard   # Card to display playthrough information
│   ├── NewPlaythroughForm # Form to create a new playthrough
│   └── Header            # Navigation header
├── lib/                  # Utility functions and data
│   ├── localStorage.ts   # Functions to interact with localStorage
│   └── gameData.ts       # Game data from the Dinkum wiki
├── public/               # Static assets
│   └── images/           # Image assets
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.mjs    # PostCSS configuration
└── package.json          # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- pnpm 8.0.0 or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dinkum-tracker.git
   cd dinkum-tracker
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

For detailed installation instructions, see [INSTALLATION.md](./INSTALLATION.md).

## Data Storage

This application uses the browser's localStorage to save your playthroughs. This means:

- All data is stored on your device
- Data will persist between sessions
- Clearing browser data will remove your saved playthroughs
- Data is not synced between devices

## License

This project is not affiliated with the Dinkum game. All game data is sourced from the [Dinkum Wiki](https://dinkum.fandom.com/wiki/Dinkum_Wiki).

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue.
