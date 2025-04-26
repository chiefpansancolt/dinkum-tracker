import ItemsBreakdownPage from "./ItemsBreakdownPage";

export const metadata = {
	title: "Items Breakdown - Dinkum Tracker",
	description: "Track all resources used in Dinkum recipes, buildings, tools, and more",
};

export default function ResourcesRoute() {
	return (
		<div className="m-4">
			<ItemsBreakdownPage />
		</div>
	);
}
