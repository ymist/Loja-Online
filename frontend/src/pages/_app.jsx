import "../styles/globals.scss";
import { ThemeProvider } from "@emotion/react";
import { NextUIProvider } from "@nextui-org/react";

import { newTheme } from "@/utils/theme";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<NextUIProvider>
				<ThemeProvider theme={newTheme}>
					<Component {...pageProps} />
				</ThemeProvider>
			</NextUIProvider>
		</>
	);
}

export default MyApp;
