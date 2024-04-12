import { create } from "zustand";
import checkJWT from "../checkJWT";
import { apiClient } from "@/services/apiClient";

const useStore = create((set) => ({
	products: [],
	categories: [],
	brands: [],

	setCategories: (category) => set({ categories: category }),
	setProducts: (product) => set({ products: product }),
	setBrands: (brand) => set({ brands: brand }),
	setUser: (newUser) => set({ user: newUser }),

	user: null,
	inicialize: async () => {
		const token = checkJWT();
		if (token) {
			const response = await apiClient.get("/perfil", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(response.data);
			if (response.status !== 401) {
				console.log(response.data);
				const user = response.data;
				set({ user: user });
			} else {
				console.log("erroororo");
			}
		}
	},
}));

export default useStore;
