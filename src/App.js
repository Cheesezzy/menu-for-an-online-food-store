import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./Menu";
import Categories from "./Categories";
import items from "./data";
import ViewOrders from "./ViewOrders";
import OrderHistory from "./OrderHistory";
import OrderDetails from "./OrderDetails";

const allCategories = ["all", ...new Set(items.map((item) => item.category))];

function App() {
  const [menuItems, setMenuItems] = useState(items);
  const [categories, setCategories] = useState(allCategories);
  const [clickCount, setClickCount] = useState(0);
  const [showCounter, setShowCounter] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [orders, setOrders] = useState([]);

  const handleShowOrderHistory = () => {
    setShowOrders(true);
  };

  const filterItems = (category) => {
    if (category === "all") {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  const deleteOrder = (index) => {
    setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
    setClickCount((prevCount) => prevCount - 1);
  };

  const resetOrders = () => {
    setOrders([]);
    setClickCount(0);
  };

  return (
    <Router>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <section className="menu section">
                <div className="title">
                  <div>
                    <h2>Restaurant</h2>
                    <div className="underline"></div>
                  </div>
                  {showCounter && (
                    <ViewOrders
                      clickCount={clickCount}
                      setShowOrders={setShowOrders}
                      onShowOrderHistory={handleShowOrderHistory}
                    />
                  )}
                </div>
                <Categories categories={categories} filterItems={filterItems} />
                {showOrders ? (
                  <OrderHistory
                    orders={orders}
                    setShowOrders={setShowOrders}
                    deleteOrder={deleteOrder}
                    isVisible={showOrders}
                    resetOrders={resetOrders}
                  />
                ) : (
                  <Menu
                    items={menuItems}
                    setClickCount={setClickCount}
                    setShowCounter={setShowCounter}
                    setOrders={setOrders}
                    orders={orders}
                  />
                )}
              </section>
            }
          />
          <Route path="/order-details" element={<OrderDetails />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
