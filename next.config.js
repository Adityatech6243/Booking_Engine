/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    domains: ["riverorchidresort.com"], // Add your domain(s) here
  },
  trailingSlash: true,
  basePath: "/booking-engine",
};

module.exports = nextConfig;
