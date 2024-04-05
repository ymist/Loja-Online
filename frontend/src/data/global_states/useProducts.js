

import { create } from 'zustand'

const useProducts = create((set) => ({
products: [],
categories: [],

setCategories: (category)=>set({categories: category}),
setProducts: (product)=>set({products: product}),
    
}))

export default useProducts