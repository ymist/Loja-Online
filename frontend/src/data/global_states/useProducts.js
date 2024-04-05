import { create } from "zustand";

const useProducts = create((set) => ({
	products: [],
	categories: [],
	brands: [],

	setCategories: (category) => set({ categories: category }),
	setProducts: (product) => set({ products: product }),
	setBrands: (brand) => set({ brands: brand }),
}));

export default useProducts;
