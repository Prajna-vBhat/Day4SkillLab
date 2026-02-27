import {create}from "zustand"
import {Product} from "@/types/product"

interface CartState {
    cart: Product[]
    addToCart: (product: Product) => void
    removeFromCart: (id: number) => void
}

export const useCartStore = create<CartState>((set) => ({
    cart: [],
    addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
    removeFromCart: (id) => 
        set((state) => {
            const idx = state.cart.findIndex((p) => p.id === id);
            if (idx === -1) return { cart: state.cart };
            const newCart = [...state.cart];
            newCart.splice(idx, 1);
            return { cart: newCart };
        }),
}))