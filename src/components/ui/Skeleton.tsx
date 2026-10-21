export function Skeleton({ className = "" }: { className?: string }) {
	return <div aria-hidden="true" className={`bg-track animate-pulse rounded-md ${className}`} />;
}
