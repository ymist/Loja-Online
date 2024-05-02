import { apiClient } from "@/services/apiClient";

export const addToCart = async (id, user, quantity, setUser) => {
	console.log(id, user);
	if (!user?.id) {
		return 403;
	}

	const status = await apiClient.post("/add-to-cart", {
		quantity: quantity,
		product_id: id,
		user_id: user.id,
	});

	if (status.status === 200) {
		const updCart = await apiClient.get("/cart", {
			user_id: user.id,
		});
		if (updCart.status === 200) {
			console.log(updCart.data);
			user.cart[0] = updCart.data;
			user.cart[0];
			setUser(user);

			return 200;
		} else {
			onCloseModalDelete();
			toast.error("Erro ao deletar produto!");
			return 402;
		}
	}

	return 402;
};
