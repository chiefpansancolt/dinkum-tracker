import { Spinner } from "flowbite-react";
import { useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { SaveFABProps } from "@/types";
import { errorToast, successToast } from "@/lib/notifications";

export default function SaveFAB({ isDirty, onSave }: SaveFABProps) {
	const [isSaving, setIsSaving] = useState(false);

	const handleSave = async () => {
		if (!isDirty || isSaving) return;

		setIsSaving(true);
		try {
			const success = onSave();

			if (success) {
				successToast({ message: "Saved Successfully!" });
			} else {
				errorToast({ message: "Failed to Save Changes" });
			}
		} catch (error) {
			errorToast({ message: "Error saving changes" });
			console.error(error);
		} finally {
			setTimeout(() => {
				setIsSaving(false);
			}, 800);
		}
	};

	if (!isDirty) return null;

	return (
		<button
			onClick={handleSave}
			disabled={isSaving}
			className="bg-accent hover:bg-accent/95 focus:ring-accent fixed right-6 bottom-6 z-30 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full p-0 text-white shadow-lg transition-colors focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
			aria-label="Save Progress"
		>
			{isSaving ? <Spinner size="md" color="white" /> : <FaRegSave className="h-6 w-6" />}
		</button>
	);
}
