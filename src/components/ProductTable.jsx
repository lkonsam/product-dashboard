import React, { useState } from "react";
import Table from "./Table";
import { useProductContext } from "../hooks/useProductContext";

export default function ProductTable() {
  const { products, cart } = useProductContext();

  const [editableProducts, setEditableProducts] = useState(products);
  const [modalProduct, setModalProduct] = useState(null);

  const handleDelete = (id) => {
    setEditableProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEdit = (id) => {
    const name = prompt("Enter new name:");
    if (name) {
      setEditableProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, name } : p))
      );
    }
  };

  const handleAddToCart = (product) => {
    cart.addItem(product);
  };

  const handleView = (product) => {
    setModalProduct(product);
  };

  const headers = [
    { label: "ID", field: "id", sortable: true },
    { label: "🖼️", field: "image" },
    { label: "📦 Name", field: "name", sortable: true },
    { label: "🏷️ Category", field: "category", sortable: true },
    { label: "💲Price", field: "price", sortable: true },
    { label: "📊 Stock", field: "stock", sortable: true },
    { label: "🔖 Status", field: "status", sortable: true },
    { label: "⚙️", field: "actions" },
  ];

  const data = editableProducts.map((p) => ({
    ...p,
    image: (
      <img
        src={p.image}
        alt="product"
        className="w-10 h-10 object-cover rounded"
      />
    ),
    actions: (
      <div className="flex gap-1 flex-wrap">
        <button
          className="text-xs bg-green-500 text-white px-2 py-1 rounded"
          onClick={() => handleView(p)}
        >
          👁️ View
        </button>
        <button
          className="text-xs bg-yellow-500 text-white px-2 py-1 rounded"
          onClick={() => handleEdit(p.id)}
        >
          ✏️ Edit
        </button>
        <button
          className="text-xs bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => handleDelete(p.id)}
        >
          🗑️ Delete
        </button>
        <button
          className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => handleAddToCart(p)}
        >
          🛒 Add
        </button>
      </div>
    ),
  }));

  return (
    <>
      <div className="w-full overflow-hidden">
        <Table
          data={data}
          headers={headers}
          className="shadow rounded w-full"
        />
      </div>

      {/* Modal */}
      {modalProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded max-w-md w-full">
            <h2 className="text-lg font-bold mb-2">📋 Product Details</h2>
            <p>
              <strong>🆔 ID:</strong> {modalProduct.id}
            </p>
            <p>
              <strong>📦 Name:</strong> {modalProduct.name}
            </p>
            <p>
              <strong>🏷️ Category:</strong> {modalProduct.category}
            </p>
            <p>
              <strong>💲 Price:</strong> ${modalProduct.price}
            </p>
            <p>
              <strong>📊 Stock:</strong> {modalProduct.stock}
            </p>
            <p>
              <strong>🔖 Status:</strong> {modalProduct.status}
            </p>
            <div className="mt-4 text-right">
              <button
                className="px-3 py-1 bg-gray-300 rounded"
                onClick={() => setModalProduct(null)}
              >
                ❌ Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
