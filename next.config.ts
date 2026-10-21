import withFlowbiteReact from "flowbite-react/plugin/nextjs";
import { readFileSync } from "node:fs";
import type { NextConfig } from "next";

const { version } = JSON.parse(readFileSync("./package.json", "utf8")) as {
  version: string;
};

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "192.168.*.*"],
  env: { NEXT_PUBLIC_APP_VERSION: version },
  async redirects() {
    return [
      {
        source: "/playthrough/list",
        destination: "/playthroughs",
        permanent: true,
      },
      {
        source: "/playthrough/new",
        destination: "/playthroughs/new",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "static.wikia.nocookie.net" },
    ],
  },
};

export default withFlowbiteReact(nextConfig);
