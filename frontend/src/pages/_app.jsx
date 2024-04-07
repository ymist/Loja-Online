import "../styles/globals.scss";
import "../components/Swipper/styles.css";
import { ThemeProvider } from "@emotion/react";
import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "@/providers/auth_provider";

import { newTheme } from "@/utils/theme";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<AuthProvider>
				<NextUIProvider>
					<ThemeProvider theme={newTheme}>
						<Component {...pageProps} />
					</ThemeProvider>
				</NextUIProvider>
			</AuthProvider>
		</>
	);
}

export default MyApp;
