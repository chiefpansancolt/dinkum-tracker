import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";

export const alt = "Dinkum Tracker";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
	const logoData = readFileSync(join(process.cwd(), "public/dinkum_d_logo.png"));
	const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

	return new ImageResponse(
		(
			<div
				style={{
					background: "linear-gradient(135deg, #3d6b4a 0%, #5a9367 50%, #8b572a 100%)",
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					fontFamily: "sans-serif",
					position: "relative",
				}}
			>
				{/* Subtle texture overlay */}
				<div
					style={{
						position: "absolute",
						inset: 0,
						background:
							"radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)",
					}}
				/>

				{/* Logo */}
				<img
					src={logoSrc}
					width={120}
					height={120}
					style={{ borderRadius: 24, marginBottom: 32 }}
				/>

				{/* Title */}
				<div
					style={{
						color: "white",
						fontSize: 80,
						fontWeight: 800,
						letterSpacing: "-2px",
						textShadow: "0 2px 12px rgba(0,0,0,0.3)",
						lineHeight: 1,
						marginBottom: 20,
					}}
				>
					Dinkum Tracker
				</div>

				{/* Subtitle */}
				<div
					style={{
						color: "rgba(255,255,255,0.85)",
						fontSize: 34,
						fontWeight: 400,
						letterSpacing: "0.5px",
					}}
				>
					Track your Dinkum progress
				</div>

				{/* Decorative dots */}
				<div
					style={{
						display: "flex",
						gap: 8,
						marginTop: 40,
					}}
				>
					{["Fish", "Bugs", "Milestones", "Licenses", "NPCs"].map((label) => (
						<div
							key={label}
							style={{
								background: "rgba(255,255,255,0.2)",
								borderRadius: 999,
								padding: "6px 16px",
								color: "rgba(255,255,255,0.9)",
								fontSize: 20,
							}}
						>
							{label}
						</div>
					))}
				</div>
			</div>
		),
		{ ...size },
	);
}
