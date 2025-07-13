import { useEffect, useState } from "react";
import { useProductContext } from "../hooks/useProductContext";

export default function CategoryFilter() {
  const { categorySet, rawProducts, setProducts } = useProductContext();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategorySelect = (e) => {
    const value = e.target.value;

    if (value === "all") {
      setSelectedCategories([]);
      setProducts(rawProducts);
      return;
    }

    if (value && !selectedCategories.includes(value)) {
      setSelectedCategories((prev) => [...prev, value]);
    }
  };

  const handleRemoveCategory = (category) => {
    setSelectedCategories((prev) => prev.filter((cat) => cat !== category));
  };

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setProducts(rawProducts);
    } else {
      const filtered = rawProducts.filter((p) =>
        selectedCategories.includes(p.category.toLowerCase())
      );
      setProducts(filtered);
    }
  }, [selectedCategories, rawProducts, setProducts]);

  return (
    <div className="mb-4">
      <select
        onChange={handleCategorySelect}
        className="border px-2 py-1 rounded"
        defaultValue=""
      >
        <option value="" disabled>
          Filter by category...
        </option>
        <option value="all">Show All</option>
        {[...categorySet].map((category) => (
          <option key={category} value={category.toLowerCase()}>
            {category}
          </option>
        ))}
      </select>

      {/* Selected Category Pills */}
      <div className="mt-2 flex gap-2 flex-wrap">
        {selectedCategories.map((cat) => (
          <span
            key={cat}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            {cat}
            <button
              className="text-red-500 font-bold"
              onClick={() => handleRemoveCategory(cat)}
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
