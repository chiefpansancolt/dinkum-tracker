import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaDiscord } from "react-icons/fa6";

export default function Footer() {
	return (
		<footer className="bg-primary p-6 text-white">
			<div className="mx-auto max-w-screen-xl">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
					<div className="col-span-1 md:col-span-2">
						<Link href="/" className="mb-4 flex items-center">
							<Image
								src="/dinkum_d_logo.png"
								className="mr-3 h-8"
								alt="Dinkum Logo"
								width={32}
								height={32}
							/>
							<span className="self-center text-2xl font-semibold whitespace-nowrap">
								Dinkum Tracker
							</span>
						</Link>
						<p className="my-4 font-light">
							Dinkum Tracker is a comprehensive tracking application for your Dinkum
							adventures. Manage multiple playthroughs, track collections, and monitor
							progress all in one place - all saved locally in your browser.
						</p>
						<ul className="mt-5 flex space-x-6">
							<li>
								<a
									href="https://github.com/chiefpansancolt/dinkum-tracker"
									className="hover:text-highlight text-gray-200"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FaGithub className="h-5 w-5" />
									<span className="sr-only">GitHub</span>
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:text-highlight text-gray-200"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FaDiscord className="h-5 w-5" />
									<span className="sr-only">Discord</span>
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h2 className="mb-6 text-sm font-semibold uppercase">Resources</h2>
						<ul>
							<li className="mb-4">
								<a
									href="https://dinkum.fandom.com/wiki/Dinkum_Wiki"
									className="hover:text-highlight"
									target="_blank"
									rel="noopener noreferrer"
								>
									Dinkum Wiki
								</a>
							</li>
							<li className="mb-4">
								<a href="/settings" className="hover:text-highlight">
									Settings
								</a>
							</li>
						</ul>
					</div>

					<div>
						<ul>
							<li className="mb-4 text-sm">
								This project is not affiliated with, endorsed by, or connected to
								Dinkum or its creators.
							</li>
							<li className="mb-4 text-sm">
								Game data is sourced from the Dinkum Wiki. Game images and names are
								used for reference purposes only.
							</li>
						</ul>
					</div>
				</div>
				<hr className="my-6 border-gray-200/20 lg:my-8" />
				<div className="text-center">
					<span className="text-sm">© 2025 Dinkum Tracker. All Rights Reserved.</span>
				</div>
			</div>
		</footer>
	);
}
