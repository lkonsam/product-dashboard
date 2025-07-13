export function generateMockProducts(count = 1000) {
  const categories = ["Electronics", "Books", "Clothing", "Toys"];
  const statusOptions = ["Active", "Inactive"];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    category: categories[i % categories.length],
    price: (Math.random() * 500).toFixed(2),
    stock: Math.floor(Math.random() * 100),
    status: statusOptions[i % 2],
    image: `https://picsum.photos/seed/${i}/60/60`,
  }));
}
