import { Alert } from "flowbite-react";
import { SaveAlertProps } from "@/types";
import { HiInformationCircle } from "react-icons/hi";

const SaveAlert = ({ message }: SaveAlertProps) => {
	return (
		<div className="mb-4">
			<Alert color="yellow" icon={HiInformationCircle}>
				<div className="flex items-center gap-2">
					<span className="font-medium">Unsaved changes</span>
					<span className="text-sm">{message}</span>
				</div>
			</Alert>
		</div>
	);
};

export default SaveAlert;
