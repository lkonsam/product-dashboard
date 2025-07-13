import React from "react";
import { useProductContext } from "../hooks/useProductContext";

export default function StatsCards() {
  const { products } = useProductContext();

  const totalRevenue = products.reduce(
    (sum, p) => sum + parseFloat(p.price),
    0
  );
  const lowStock = products.filter((p) => p.stock < 10).length;
  const categories = new Set(products.map((p) => p.category));

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Total Products</p>
        <p className="text-lg font-bold">{products.length}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Total Revenue</p>
        <p className="text-lg font-bold">${totalRevenue.toFixed(2)}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Low Stock Items</p>
        <p className="text-lg font-bold">{lowStock}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Categories Count</p>
        <p className="text-lg font-bold">{categories.size}</p>
      </div>
    </div>
  );
}
