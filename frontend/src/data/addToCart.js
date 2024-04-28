import { apiClient } from "@/services/apiClient";

export const addToCart = async (id, user, quantity) => {
	console.log(id, user);
	if (!user?.id) {
		return 403;
	}

	const status = await apiClient.post("/add-to-cart", {
		quantity: quantity,
		product_id: id,
		user_id: user.id,
	});
	console.log(status);
};
