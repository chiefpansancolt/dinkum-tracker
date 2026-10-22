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
      {
        source: "/dinkum",
        destination: "/reference",
        permanent: true,
      },
      {
        source: "/dinkum/animals",
        destination: "/reference?tab=animals",
        permanent: true,
      },
      {
        source: "/dinkum/resources",
        destination: "/reference?tab=resources",
        permanent: true,
      },
      {
        source: "/dinkum/seeds",
        destination: "/reference?tab=plants&sub=seeds",
        permanent: true,
      },
      {
        source: "/dinkum/crops",
        destination: "/reference?tab=plants&sub=crops",
        permanent: true,
      },
      {
        source: "/dinkum/flowers",
        destination: "/reference?tab=plants&sub=flowers",
        permanent: true,
      },
      {
        source: "/dinkum/trees",
        destination: "/reference?tab=plants&sub=trees",
        permanent: true,
      },
      {
        source: "/dinkum/food-modeller",
        destination: "/reference?tab=food",
        permanent: true,
      },
      {
        source: "/dinkum/daily-milestones",
        destination: "/reference?tab=daily",
        permanent: true,
      },
      {
        source: "/itemsBreakdown",
        destination: "/items-breakdown",
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

export default nextConfig;
