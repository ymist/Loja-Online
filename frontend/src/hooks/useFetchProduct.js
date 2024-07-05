import { useEffect, useState } from "react";

import useStore from "@/data/global_states/useProducts";
import { apiClient } from "@/services/apiClient";

const useFetchProducts = (id) => {
	const [product, setProduct] = useState(null);
	const [filterProducts, setFilterProducts] = useState([]);
	const [info, setInfo] = useState({});
	const products = useStore((state) => state.products);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await apiClient(`/product/${id}`);

				if (response.data?.error) {
					throw new Error("Product not found");
				}

				const filteredProducts = products.filter((item) => item.brand.id === response.data.brand.id && item.id !== response.data.id);

				setFilterProducts(filteredProducts);
				setProduct(response.data);
				setInfo({
					stock: response.data.stock,
					product_id: response.data.id,
				});
			} catch (error) {
				console.error(error);
			}
		};

		if (id) {
			fetchProduct();
		}
	}, [id, products]);

	return { product, filterProducts, info };
};

export default useFetchProducts;
