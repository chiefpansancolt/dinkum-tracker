// src/app/layout.tsx
import "./global.css";
import type { Metadata } from "next";
import Header from "../components/Header";
import FAB from "../components/FAB";

export const metadata: Metadata = {
  title: "Dinkum Tracker",
  description: "Track your progress in the Dinkum game",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          {children}
        </main>
        <footer className="footer p-4 text-center">
          <p className="text-sm">
            Dinkum Tracker - Not affiliated with Dinkum game. Data sourced from{" "}
            <a
              href="https://dinkum.fandom.com/wiki/Dinkum_Wiki"
              className="underline hover:text-highlight"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dinkum Wiki
            </a>
          </p>
        </footer>
        <FAB />
      </body>
    </html>
  );
}