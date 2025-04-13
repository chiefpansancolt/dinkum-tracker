import Link from "next/link";

export default function Home() {
    return (
        <div className="space-y-8">
            <section className="card bg-secondary-light">
                <h1 className="text-4xl font-bold text-primary mb-4">Welcome to Dinkum Tracker</h1>
                <p className="text-lg mb-6">
                    Track your progress as you play through the relaxing world of Dinkum. Keep track of animals you've
                    seen, fish you've caught, bugs you've collected, and milestones you've reached.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/playthroughs" className="btn btn-primary text-center">
                        View My Playthroughs
                    </Link>
                    <Link href="/new-playthrough" className="btn btn-secondary text-center">
                        Start New Playthrough
                    </Link>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                    <h2 className="text-2xl font-bold text-primary mb-3">Track Your Collections</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Animals spotted in the wild</li>
                        <li>Fish caught during your adventures</li>
                        <li>Bugs collected around the island</li>
                        <li>Minerals mined from caves and rocks</li>
                        <li>Special items discovered</li>
                    </ul>
                </div>

                <div className="card">
                    <h2 className="text-2xl font-bold text-primary mb-3">Monitor Your Progress</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Town development milestones</li>
                        <li>Licenses obtained</li>
                        <li>Buildings constructed</li>
                        <li>Villagers moved in</li>
                        <li>Island achievements</li>
                    </ul>
                </div>
            </section>

            <section className="card bg-accent-light">
                <h2 className="text-2xl font-bold text-accent mb-3">How It Works</h2>
                <ol className="list-decimal list-inside space-y-3">
                    <li>
                        <span className="font-medium">Create a new playthrough</span> - Give your game a name to help
                        you keep track
                    </li>
                    <li>
                        <span className="font-medium">Update your progress</span> - Check off items as you collect them
                        in-game
                    </li>
                    <li>
                        <span className="font-medium">Save automatically</span> - Your progress is saved locally to your
                        device
                    </li>
                    <li>
                        <span className="font-medium">Track multiple playthroughs</span> - Create and switch between
                        different saves
                    </li>
                </ol>
                <div className="mt-6">
                    <Link href="/new-playthrough" className="btn btn-primary">
                        Get Started Now
                    </Link>
                </div>
            </section>
        </div>
    );
}
