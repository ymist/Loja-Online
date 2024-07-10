import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useStore from "@/data/global_states/useProducts";

const useOrderDetails = () => {
	const router = useRouter();
	const user = useStore((state) => state.user);
	const products = useStore((state) => state.products);
	const { order_id } = router.query;
	const [loading, setLoading] = useState(true);
	const [orderDetails, setOrderDetails] = useState(null);

	useEffect(() => {
		const fetchOrderDetails = async () => {
			if (!user) return;

			const order = user.order.find((orderFind) => orderFind.id === order_id);
			if (!order) {
				router.push("/error-404/");
				return;
			}

			const items = await Promise.all(
				order.orderItems.map(async (item) => {
					const product = await fetchProductById(item.product_id);
					return {
						product,
						quantity: item.quantity,
						price: item.price,
					};
				}),
			);

			const orderDetailJson = {
				id: order.id,
				order,
				created_at: order.created_at,
				items,
			};

			setOrderDetails(orderDetailJson);
			setLoading(false);
		};

		fetchOrderDetails();
	}, [user, order_id]);

	const fetchProductById = async (productId) => {
		// Implementar como buscar produtos por ID
		const product = products.find((product) => product.id === productId);
		return product;
	};

	return { loading, orderDetails };
};

export default useOrderDetails;
