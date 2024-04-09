import "../styles/globals.scss";
import { ThemeProvider } from "@emotion/react";
import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "@/providers/auth_provider";

import { newTheme } from "@/utils/theme";
import useStore from "@/data/global_states/useProducts";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
	const inicialize = useStore((state) => state.inicialize);
	useEffect(() => {
		inicialize();
	}, []);
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
