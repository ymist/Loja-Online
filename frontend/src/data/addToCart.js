import { apiClient } from "@/services/apiClient";

export const addToCart = async (id, user) => {
	console.log(id, user);
	if (!user?.id) {
		return 403;
	}

	const status = await apiClient.post("/add-to-cart", {
		quantity: 1,
		product_id: id,
		user_id: user.id,
	});
	console.log(status);
};
