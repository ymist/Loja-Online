import "../styles/globals.scss";
import { ThemeProvider } from "@emotion/react";
import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "@/providers/auth_provider";

import { newTheme } from "@/utils/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import useInitializeData from "@/hooks/useInitializeData";

function MyApp({ Component, pageProps }) {
	useInitializeData();
	return (
		<>
			<AuthProvider>
				<NextUIProvider>
					<ThemeProvider theme={newTheme}>
						<Component {...pageProps} />
						<SpeedInsights />
						<ToastContainer
							position="top-right"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							pauseOnHover
							theme="colored"
						/>
					</ThemeProvider>
				</NextUIProvider>
			</AuthProvider>
		</>
	);
}

export default MyApp;
