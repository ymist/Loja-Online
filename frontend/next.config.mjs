/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/api/calculate-shipping",
				destination: "https://www.melhorenvio.com.br/api/v2/me/shipment/calculate",
			},
		];
	},
};

export default nextConfig;
