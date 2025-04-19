"use client";

import { useState, useEffect, useRef } from "react";
import { Alert, Card, Button, Label, ToggleSwitch, FileInput, Select, Badge } from "flowbite-react";
import { HiInformationCircle, HiDownload, HiUpload, HiTrash } from "react-icons/hi";
import Link from "next/link";
import {
	downloadData,
	importData,
	clearAllData,
	saveThemePreference,
	saveDefaultSortPreference,
	getDefaultSortPreference,
} from "@/lib/services/dataService";
import { getPlaythroughs } from "@/lib/localStorage";

const SettingsPage = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [darkMode, setDarkMode] = useState(false);
	const [confirmReset, setConfirmReset] = useState(false);
	const [resetSuccess, setResetSuccess] = useState(false);
	const [exportSuccess, setExportSuccess] = useState(false);
	const [importSuccess, setImportSuccess] = useState(false);
	const [importError, setImportError] = useState(false);
	const [defaultSort, setDefaultSort] = useState("lastUpdated");
	const [playthroughCount, setPlaythroughCount] = useState(0);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const isDark = document.documentElement.classList.contains("dark");
			setDarkMode(isDark);
			setDefaultSort(getDefaultSortPreference());
			setPlaythroughCount(getPlaythroughs().length);
		}
	}, []);

	const handleDarkModeToggle = () => {
		if (typeof window !== "undefined") {
			document.documentElement.classList.toggle("dark");
			const newDarkMode = !darkMode;
			setDarkMode(newDarkMode);
			saveThemePreference(newDarkMode);
		}
	};

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setDefaultSort(value);
		saveDefaultSortPreference(value);
	};

	const handleExportData = () => {
		downloadData();
		setExportSuccess(true);
		setTimeout(() => setExportSuccess(false), 3000);
	};

	const handleImportData = async () => {
		if (!fileInputRef.current?.files?.length) {
			return;
		}

		try {
			const file = fileInputRef.current.files[0];
			const success = await importData(file);

			if (success) {
				setImportSuccess(true);
				setImportError(false);
				setPlaythroughCount(getPlaythroughs().length);

				if (fileInputRef.current) {
					fileInputRef.current.value = "";
				}
			} else {
				setImportError(true);
				setImportSuccess(false);
			}
		} catch (error) {
			console.error("Import error:", error);
			setImportError(true);
			setImportSuccess(false);
		}

		setTimeout(() => {
			setImportSuccess(false);
			setImportError(false);
		}, 3000);
	};

	const handleResetData = () => {
		if (!confirmReset) {
			setConfirmReset(true);
			return;
		}

		clearAllData();
		setResetSuccess(true);
		setConfirmReset(false);
		setPlaythroughCount(0);
		setTimeout(() => setResetSuccess(false), 3000);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-primary mb-6 text-3xl font-bold">Settings</h1>

			<div className="mb-8">
				<Alert color="info" icon={HiInformationCircle}>
					<div className="mb-1 text-lg font-medium">Data Storage!</div>
					<p className="mb-1">
						Your data is stored locally in the browser. Data is lost when the browser
						cache is cleared.
					</p>
					<p>Please use the functions below to export and backup your data.</p>
				</Alert>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<Card>
					<div className="mb-4 flex items-center justify-between">
						<h2 className="text-primary text-xl font-bold">Data Management</h2>
						<Badge color="info">
							{playthroughCount}{" "}
							{playthroughCount === 1 ? "Playthrough" : "Playthroughs"}
						</Badge>
					</div>

					<div className="space-y-6">
						<div>
							<div className="mb-2 flex items-center justify-between">
								<Label htmlFor="export-data">Export Data</Label>
								{exportSuccess && (
									<span className="text-sm text-green-500">
										Export successful!
									</span>
								)}
							</div>
							<Button color="primary" onClick={handleExportData} className="w-full">
								<HiDownload className="mr-2 h-5 w-5" />
								Export All Playthroughs
							</Button>
							<p className="mt-1 text-sm text-gray-500">
								Download a backup file of all your saved playthroughs.
							</p>
						</div>

						<div>
							<div className="mb-2 flex items-center justify-between">
								<Label htmlFor="import-data">Import Data</Label>
								{importSuccess && (
									<span className="text-sm text-green-500">
										Import successful!
									</span>
								)}
								{importError && (
									<span className="text-sm text-red-500">
										Invalid file format
									</span>
								)}
							</div>
							<div className="flex flex-col gap-2">
								<FileInput
									id="import-data"
									ref={fileInputRef}
									accept=".json"
								/>
								<p className="text-sm text-gray-500">
									Upload a previously exported file (.json)
								</p>
								<Button color="secondary" onClick={handleImportData}>
									<HiUpload className="mr-2 h-5 w-5" />
									Import Data
								</Button>
							</div>
						</div>

						<div>
							<div className="mb-2 flex items-center justify-between">
								<Label htmlFor="reset-data" className="text-red-500">
									Reset All Data
								</Label>
								{resetSuccess && (
									<span className="text-sm text-green-500">
										Data reset successful
									</span>
								)}
							</div>
							<Button color="red" onClick={handleResetData} className="w-full">
								<HiTrash className="mr-2 h-5 w-5" />
								{confirmReset ? "Confirm Reset" : "Reset All Data"}
							</Button>
							<p className="mt-1 text-sm text-red-500">
								Warning: This will delete all playthroughs and cannot be undone.
							</p>
						</div>
					</div>
				</Card>

				{/* Appearance & Preferences */}
				<Card>
					<h2 className="text-primary mb-4 text-xl font-bold">
						Appearance & Preferences
					</h2>

					<div className="space-y-6">
						<div className="flex items-center justify-between">
							<Label htmlFor="dark-mode-toggle">Dark Mode</Label>
							<ToggleSwitch
								id="dark-mode-toggle"
								checked={darkMode}
								onChange={handleDarkModeToggle}
								label=""
							/>
						</div>

						<div>
							<div className="mb-2 block">
								<Label htmlFor="default-sort">Default Playthrough Sort</Label>
							</div>
							<Select
								id="default-sort"
								value={defaultSort}
								onChange={handleSortChange}
							>
								<option value="lastUpdated">Last Updated</option>
								<option value="name">Name</option>
								<option value="createdAt">Date Created</option>
								<option value="completion">Completion Percentage</option>
							</Select>
							<p className="mt-1 text-sm text-gray-500">
								Choose how playthroughs are sorted by default.
							</p>
						</div>

						<div>
							<div className="mb-2 block">
								<Label>Additional Resources</Label>
							</div>
							<div className="space-y-2">
								<Button
									as={Link}
									href="https://dinkum.fandom.com/wiki/Dinkum_Wiki"
									color="light"
									className="w-full text-left"
									target="_blank"
									rel="noopener noreferrer"
								>
									Dinkum Wiki
								</Button>
								<Button
									as={Link}
									href="https://github.com/chiefpansancolt/dinkum-tracker"
									color="light"
									className="w-full text-left"
									target="_blank"
									rel="noopener noreferrer"
								>
									Project Repository
								</Button>
							</div>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default SettingsPage;
