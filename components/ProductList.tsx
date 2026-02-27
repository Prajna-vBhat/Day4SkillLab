"use client";

import { Product } from "@/types/product";

interface Props {
    products: Product[]
    onAdd: (product: Product) => void
}

export default function ProductList({ products, onAdd }: Props) {
    return (
        <div className="grid grid-cols-3 gap-6 mt-6">
            {products.map((product) => (
                <div key={product.id} className="p-6 rounded-xl shadow bg-gradient-to-tr from-yellow-100 via-pink-100 to-blue-100">
                    <h2 className="text-lg font-semibold text-purple-800">{product.name}</h2>
                    <p className="text-indigo-700">Price: ${product.price}</p>
                    <button
                    onClick={()=> onAdd(product)}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Add to Cart</button>
                </div>
            ))}
        </div>
    )
}
