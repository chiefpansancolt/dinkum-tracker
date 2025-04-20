import { Spinner } from "flowbite-react";

const LoadingPlaythrough = ({ message = "Loading playthrough..." }) => {
	return (
		<div className="flex min-h-[50vh] w-full flex-col items-center justify-center py-12">
			<Spinner size="xl" color="primary" />
			<p className="mt-4 text-lg text-gray-600 dark:text-gray-400">{message}</p>
		</div>
	);
};

export default LoadingPlaythrough;
