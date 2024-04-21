import { apiClient } from "@/services/apiClient";
import useStore from "./global_states/useProducts";

export const addToCart = async (id, user) => {
	console.log(user);
	if (!user?.id) {
		return 403;
	}

	const status = await apiClient.post("/add-to-cart", {
		data: {
			quantity: 1,
			product_id: id,
			user_id: user.id,
		},
	});
	console.log(status);
};
