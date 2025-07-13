import React, { useState } from "react";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import ProductTable from "./components/ProductTable";
import CartSidebar from "./components/CartSidebar";
import { ProductContextProvider } from "./contexts/ProductContextProvider";

export default function App() {
  const [collapsedCartSidebar, setCollapsedCartSidebar] = useState(true);
  const toggleCartSidebar = () => setCollapsedCartSidebar((prev) => !prev);

  return (
    <ProductContextProvider>
      <div className="w-full min-h-screen bg-gray-50">
        {/* Header always on top */}
        <Header toggleCartSidebar={toggleCartSidebar} />

        {/* Main content: flex row */}
        <main className="min-h-screen bg-gray-100">
          {/* Left main area */}
          <div className="p-4">
            <StatsCards />
            <ProductTable />
          </div>

          {/* Right cart sidebar */}
          <CartSidebar
            collapsed={collapsedCartSidebar}
            toggleSidebar={toggleCartSidebar}
          />
        </main>
      </div>
    </ProductContextProvider>
  );
}
