import "../styles/globals.scss";
import { ThemeProvider } from "@emotion/react";
import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "@/providers/auth_provider";

import { newTheme } from "@/utils/theme";
import useStore from "@/data/global_states/useProducts";
import { useEffect } from "react";
import { apiClient } from "@/services/apiClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

function MyApp({ Component, pageProps }) {
	const inicialize = useStore((state) => state.inicialize);
	const setBrands = useStore((state) => state.setBrands);
	const setCategoriesMenu = useStore((state) => state.setCategories);
	const setAllProducts = useStore((state) => state.setProducts);

	useEffect(() => {
		const response = async () => {
			inicialize();
			const productsResponse = await apiClient.get("/products");
			const categories = await apiClient.get("/categories");
			const listBrands = await apiClient.get("/brands");
			setBrands(listBrands.data);
			setAllProducts(productsResponse.data);
			setCategoriesMenu(categories.data);
		};
		response();
	}, []);
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
