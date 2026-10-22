import { ActivateAndRedirect } from "@/comps/layout/ActivateAndRedirect";

export default async function Redirect({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	return <ActivateAndRedirect playthroughId={id} to="/skills" />;
}
