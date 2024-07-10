// hooks/useInitializeData.js
import { useEffect } from "react";
import useStore from "@/data/global_states/useProducts";
import { apiClient } from "@/services/apiClient";

const useInitializeData = () => {
	const inicialize = useStore((state) => state.inicialize);
	const setBrands = useStore((state) => state.setBrands);
	const setCategoriesMenu = useStore((state) => state.setCategories);
	const setAllProducts = useStore((state) => state.setProducts);

	useEffect(() => {
		const fetchData = async () => {
			try {
				inicialize();
				const [productsResponse, categoriesResponse, brandsResponse] = await Promise.all([
					apiClient.get("/products"),
					apiClient.get("/categories"),
					apiClient.get("/brands"),
				]);

				setBrands(brandsResponse.data);
				setAllProducts(productsResponse.data);
				setCategoriesMenu(categoriesResponse.data);
			} catch (error) {
				console.error("Failed to fetch initial data", error);
			}
		};

		fetchData();
	}, [inicialize, setBrands, setCategoriesMenu, setAllProducts]);
};

export default useInitializeData;
