import { Toast, ToastToggle } from "flowbite-react";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import { HiCheck, HiExclamation, HiInformationCircle, HiX } from "react-icons/hi";
import { CustomToastProps } from "@/types";

const CustomToast = ({ closeToast, data }: CustomToastProps) => {
	const iconMap = {
		success: <HiCheck className="h-5 w-5" />,
		error: <HiX className="h-5 w-5" />,
		info: <HiInformationCircle className="h-5 w-5" />,
		warning: <HiExclamation className="h-5 w-5" />,
	};

	const bgColorMap = {
		success: "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200",
		error: "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200",
		info: "bg-blue-100 text-blue-500 dark:bg-blue-700 dark:text-blue-200",
		warning: "bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200",
	};

	return (
		<Toast className="flex items-center rounded-lg">
			{data.type && (
				<div
					className={twMerge(
						"inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
						bgColorMap[data.type]
					)}
				>
					{iconMap[data.type]}
				</div>
			)}
			<div className="ml-3 text-sm font-normal text-wrap">{data.message}</div>
			<ToastToggle onClick={closeToast} />
		</Toast>
	);
};

export default CustomToast;
