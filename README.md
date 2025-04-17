# Dinkum Tracker

A comprehensive tracking application for your Dinkum adventures. Manage multiple playthroughs, track collections, and monitor progress all in one place - all saved locally in your browser.

![Dinkum Tracker](https://raw.githubusercontent.com/chiefpansancolt/dinkum-tracker/main/public/dinkum_d_logo.png)

## 🌟 Features

- **Multiple Playthrough Support**: Create and manage separate playthroughs for different Dinkum game saves
- **Comprehensive Collection Tracking**:
  - 🐟 Fish (45+ species)
  - 🦋 Bugs (50+ species)
  - 🦀 Critters (25+ species)
- **Progress Monitoring**:
  - 📅 Calendar with events and birthdays
  - 🏆 Milestones (65+ in-game achievements)
  - 🎓 Skills tracking
  - 📜 License progression
- **Game Information**:
  - Detailed item data (rarity, location, sale prices)
  - Seasonal item availability
  - Museum donation tracking
- **Local Storage**: All data saved in your browser - no account needed
- **Responsive Design**: Works on desktop and mobile devices

## 🔧 Technology Stack

- **Next.js 15.3.0**: Modern React framework with App Router
- **React 19**: Latest React features
- **TypeScript**: Type-safe code
- **Tailwind CSS 4.1.0**: Utility-first styling
- **Flowbite-React**: UI component library built on Tailwind
- **LocalStorage API**: Client-side data persistence

## 📋 Project Structure

```
dinkum-tracker/
├── app/                   # Next.js pages
│   ├── (home)/           # Home page components
│   ├── playthrough/      # Playthrough management
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── playthrough/      # Playthrough-specific components
│   │   ├── dashboard/    # Dashboard components
│   │   └── pedia/        # Collection tracking components
│   └── ui/               # Reusable UI components
├── data/                 # Game data
│   ├── constants/        # App constants
│   └── dinkum/           # Game-specific data
│       └── pedia/        # Collectible item data
├── lib/                  # Utility functions
│   ├── localStorage.ts   # Storage operations
│   └── services/         # Application services
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- pnpm 8.0.0 or later (recommended) or npm/yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/chiefpansancolt/dinkum-tracker.git
   cd dinkum-tracker
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## 💾 Data Storage

This application stores all data in your browser's localStorage. This means:

- All data is saved locally on your device
- Data persists between browser sessions
- Clearing browser data will remove your saved playthroughs
- Data is not synced between devices

## 🔍 Usage

1. **Create a Playthrough**: Start by creating a new playthrough with a memorable name
2. **Track Collections**: Mark fish, bugs, and critters as collected and donated
3. **Monitor Progress**: Keep track of milestones, licenses, and skills
4. **Update Calendar**: Track the current day and season in your game
5. **Save Progress**: All changes are saved automatically when you use the save button

## 🌐 Live Demo

[Try Dinkum Tracker Online](https://your-deployment-url.vercel.app)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📢 Disclaimer

This project is not affiliated with, endorsed by, or connected to Dinkum or its creators. All game data is sourced from the [Dinkum Wiki](https://dinkum.fandom.com/wiki/Dinkum_Wiki). Game images and names are used for reference purposes only.
