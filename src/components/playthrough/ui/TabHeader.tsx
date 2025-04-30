import SaveAlert from "@/components/SaveAlert";
import { Badge } from "flowbite-react";
import { TabHeaderProps } from "@/types";

const TabHeader = ({
	title,
	collectionName,
	enableCollectionCount = true,
	collectedCount = 0,
	collectionTotal = 0,
	enableSaveAlert = true,
	isDirty,
	dirtyMessage,
}: TabHeaderProps) => {
	return (
		<div>
			<div className="mb-2 flex items-center justify-between">
				<h1 className="text-primary text-2xl font-bold">
					{title}
					{enableCollectionCount && (
						<span className="ml-1">
							({collectedCount} / {collectionTotal})
						</span>
					)}
				</h1>
				{enableCollectionCount && (
					<Badge color="blue" size="lg">
						{Math.round((collectedCount / collectionTotal) * 100)}% {collectionName}
					</Badge>
				)}
			</div>

			{enableSaveAlert && dirtyMessage && isDirty && <SaveAlert message={dirtyMessage} />}
		</div>
	);
};

export default TabHeader;
