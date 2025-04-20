/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from "react";
import { Card, Progress, Badge } from "flowbite-react";
import { licenses } from "@/data/dinkum";
import { License, LicenseStatsProps } from "@/types/dinkum";

const LicenseStats: React.FC<LicenseStatsProps> = ({ collected }) => {
	const stats = useMemo(() => {
		const areAllLevelsComplete = (license: License) => {
			return license.levels.every((level) => {
				const licenseKey = `${license.id}_level_${level.level}`;
				return collected[licenseKey] === true;
			});
		};

		const totalLevels = licenses.reduce(
			(total, license) => total + license.levels.length,
			0
		);

		const completedLevels = Object.keys(collected).filter((key) => collected[key]).length;

		const completedLicenses = licenses.filter((license) =>
			areAllLevelsComplete(license)
		).length;

		let totalPermitPoints = 0;
		let spentPermitPoints = 0;

		licenses.forEach((license) => {
			license.levels.forEach((level) => {
				totalPermitPoints += level.permitPointCost;

				const licenseKey = `${license.id}_level_${level.level}`;
				if (collected[licenseKey]) {
					spentPermitPoints += level.permitPointCost;
				}
			});
		});

		return {
			totalLevels,
			completedLevels,
			totalLicenses: licenses.length,
			completedLicenses,
			totalPermitPoints,
			spentPermitPoints,
		};
	}, [collected]);

	return (
		<Card className="flex h-full flex-col">
			<div className="flex h-full flex-col">
				<div className="flex-none">
					<h2 className="text-primary mb-4 text-xl font-bold">License Progress</h2>
				</div>

				<div className="flex-grow overflow-auto">
					<div className="mb-6">
						<div className="mb-4 flex justify-between">
							<span className="text-lg font-medium">Licenses Obtained</span>
							<span className="text-accent font-medium">
								{stats.completedLicenses}/{stats.totalLicenses} Complete
							</span>
						</div>
						<Progress
							progress={Math.round(
								(stats.completedLicenses / stats.totalLicenses) * 100
							)}
							size="lg"
							color="green"
						/>

						<div className="mt-4 flex justify-between">
							<span className="text-sm font-medium">License Levels</span>
							<span className="text-sm font-medium">
								{stats.completedLevels}/{stats.totalLevels} (
								{Math.round((stats.completedLevels / stats.totalLevels) * 100)}%)
							</span>
						</div>
						<Progress
							progress={Math.round((stats.completedLevels / stats.totalLevels) * 100)}
							size="md"
							color="blue"
						/>
					</div>

					<div>
						<h3 className="mb-2 text-lg font-medium">Permit Points Spent</h3>
						<div className="flex items-center gap-2">
							<Badge color="primary" size="lg">
								<span className="flex items-center">
									{stats.spentPermitPoints.toLocaleString()} /{" "}
									{stats.totalPermitPoints.toLocaleString()}{" "}
									<img
										src="https://static.wikia.nocookie.net/dinkum/images/9/97/Permit_Points.png"
										alt="Permit Points"
										className="ml-2 w-7"
									/>
								</span>
							</Badge>
							<span className="text-sm text-gray-500">
								(
								{Math.round(
									(stats.spentPermitPoints / stats.totalPermitPoints) * 100
								)}
								% spent)
							</span>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default LicenseStats;
