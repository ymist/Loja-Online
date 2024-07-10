import { useEffect, useState } from "react";
import useStore from "@/data/global_states/useProducts";

const useOrdersDetails = () => {
	const user = useStore((state) => state.user);
	const products = useStore((state) => state.products);
	const [orderDetails, setOrderDetails] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (user?.order && products.length > 0) {
			const orderDetailsArray = user.order.map((order) => {
				const items = order.orderItems.map((item) => {
					const product = products.find((product) => product.id === item.product_id);
					return { product, quantity: item.quantity };
				});

				return { id: order.id, items, created_at: order.created_at };
			});

			// Ordenar os pedidos por data de criação mais recente
			orderDetailsArray.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

			setOrderDetails(orderDetailsArray);
		}
		setLoading(false);
	}, [user, products]);

	return { orderDetails, loading };
};

export default useOrdersDetails;
