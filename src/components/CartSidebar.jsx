import React from "react";
import { useProductContext } from "../hooks/useProductContext";

export default function CartSidebar({ collapsed, toggleSidebar }) {
  const { cart } = useProductContext();
  return (
    <aside
      className={`
        z-50 bg-white border shadow-lg transition-transform duration-300 ease-in-out
        flex flex-col 
        fixed top-0 right-0 min-h-full
        w-[80%] md:w-96
        ${collapsed ? "translate-x-full" : "translate-x-0 translate-y-0"}
      `}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b p-4">
        <h2 className="text-xl font-bold text-gray-800">🛒 Cart</h2>
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700 text-2xl font-semibold"
        >
          &times;
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {cart.items.length === 0 ? (
          <p className="text-gray-500">No items in cart.</p>
        ) : (
          <ul className="space-y-4">
            {cart.items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-start border-b pb-3"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => cart.updateItem(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => cart.updateItem(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <button
                    onClick={() => cart.removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 text-lg"
                    title="Remove"
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="text-lg font-bold text-gray-800 flex justify-between">
          <span>Total:</span>
          <span>
            $
            {cart.items
              .reduce((t, i) => t + i.quantity * parseFloat(i.price), 0)
              .toFixed(2)}
          </span>
        </div>
        <button
          disabled={cart.items.length === 0}
          className={`w-full mt-4 py-2 rounded text-white font-semibold transition-colors ${
            cart.items.length === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Checkout
        </button>
      </div>
    </aside>
  );
}
