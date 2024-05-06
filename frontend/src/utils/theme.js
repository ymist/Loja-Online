import { Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";

export const newTheme = createTheme({
	palette: {
		primary: {
			main: "#1a907f",
			dark: "#0e635a",
			light: "#4ab5a9",
			contrastText: "#fff",
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
			gray: "#c2c2c2",
		},
		bggray: {
			main: "#f2f3f5",
		},
	},
	text: {
		dark: {
			primary: "#101026",
			secondary: "#1d1d2e",
		},
		light: {
			primary: "#fff",
		},
	},
});
