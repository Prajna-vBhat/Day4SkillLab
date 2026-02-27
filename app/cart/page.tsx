"use client"
import { useCartStore } from "@/store/cartStore"

export default function CartPage() {
    const cart = useCartStore((state) => state.cart)
    const removeFromCart = useCartStore((state) => state.removeFromCart)

    return (
        <main className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold">Cart Page</h1> 
            <p className="mt-4">Items in Cart: {cart.length}</p>
            <div className="mt-6">
                {cart.map((item) => (
                    <div key={item.id} className="p-4 rounded-lg shadow mb-3 flex justify-between items-center bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 text-gray-800">
                        <span>{item.name} - ${item.price}</span>
                        <button
                            className="text-red-600 font-bold hover:underline"
                            onClick={() => removeFromCart(item.id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </main>
    )
}