import Link from "next/link";
import { Card, Button } from "flowbite-react";

export default function Home() {
	return (
    <div className="mx-auto px-4 container py-8">
      <div className="space-y-8">
        <Card className="bg-secondary/20 p-6 shadow-md">
          <h1 className="text-primary mb-4 text-4xl font-bold">
            Welcome to Dinkum Tracker
          </h1>
          <p className="mb-6 text-lg">
            Track your progress as you play through the relaxing world of
            Dinkum. Keep track of animals you've seen, fish you've caught, bugs
            you've collected, and milestones you've reached.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button as={Link} href="/playthrough/list" color="primary">
              View My Playthroughs
            </Button>
            <Button as={Link} href="/playthrough/new" color="secondary">
              Start New Playthrough
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <h2 className="text-primary mb-3 text-2xl font-bold">
              Track Your Collections
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>Animals spotted in the wild</li>
              <li>Fish caught during your adventures</li>
              <li>Bugs collected around the island</li>
              <li>Minerals mined from caves and rocks</li>
              <li>Special items discovered</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-primary mb-3 text-2xl font-bold">
              Monitor Your Progress
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>Town development milestones</li>
              <li>Licenses obtained</li>
              <li>Buildings constructed</li>
              <li>Villagers moved in</li>
              <li>Island achievements</li>
            </ul>
          </Card>
        </div>

        <Card className="bg-accent/10">
          <h2 className="text-accent mb-3 text-2xl font-bold">How It Works</h2>
          <ol className="list-inside list-decimal space-y-3">
            <li>
              <span className="font-medium">Create a new playthrough</span> -
              Give your game a name to help you keep track
            </li>
            <li>
              <span className="font-medium">Update your progress</span> - Check
              off items as you collect them in-game
            </li>
            <li>
              <span className="font-medium">Save automatically</span> - Your
              progress is saved locally to your device
            </li>
            <li>
              <span className="font-medium">Track multiple playthroughs</span> -
              Create and switch between different saves
            </li>
          </ol>
          <div className="mt-6">
            <Button as={Link} href="/playthrough/new" color="primary">
              Get Started Now
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
