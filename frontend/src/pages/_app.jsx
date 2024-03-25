import "../styles/globals.scss";
import { ThemeProvider } from "@emotion/react";

import { newTheme } from "@/utils/theme";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<ThemeProvider theme={newTheme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}

export default MyApp;
