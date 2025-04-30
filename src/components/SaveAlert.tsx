import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { SaveAlertProps } from "@/types";

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
