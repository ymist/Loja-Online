/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {},
		colors: {
			palette: {
				primary: {
					main: "#1a907f",
					dark: "#0e635a",
					light: "#4ab5a9",
				},
				secondary: {
					main: "#ff6600",
					dark: "#cc5200",
					light: "#ff8533",
				},
				tertiary: {
					main: "#bdebd6",
					dark: "#91c9b7",
					light: "#e6fff5",
				},
				base: {
					main: "white",
					dark: "#14213d",
				},
			},
			text: {
				dark: {
					primary: "#101026",
					secondary: "#1d1d2e",
					grey_900: "#212529",
				},
				light: {
					primary: "#fff",
				},
			},
		},
	},
	plugins: [require("daisyui")],
};
