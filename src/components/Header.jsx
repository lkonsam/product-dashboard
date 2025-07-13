import React from "react";
import { useProductContext } from "../hooks/useProductContext";

export default function Header({ toggleCartSidebar }) {
  const { cart } = useProductContext();
  const cartCount = cart.items.length;
  return (
    <>
      <header className="w-full flex items-center justify-between bg-blue-600 p-4 shadow">
        <h1 className="text-xl font-bold text-white">Product Dashboard</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="hidden md:block border px-2 py-1 rounded bg-white text-gray-800 focus:outline-none w-sm"
          />
          <div className="relative">
            <button
              className="rounded bg-blue-600 text-2xl"
              onClick={toggleCartSidebar}
            >
              🛒
            </button>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
        </div>
      </header>
      <div className="w-full">
        <input
          type="text"
          placeholder="Search..."
          className="w-full md:hidden border px-2 py-1  bg-white text-gray-800 focus:outline-none "
        />
      </div>
    </>
  );
}
