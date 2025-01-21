import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const OrderDetails = () => {
  const location = useLocation();
  const { order } = location.state;

  useEffect(() => {
    // Check if the page has already been refreshed
    const hasRefreshed = sessionStorage.getItem("hasRefreshed");

    if (!hasRefreshed) {
      // Set the flag in session storage
      sessionStorage.setItem("hasRefreshed", "true");
      // Refresh the page
      window.location.reload();
    }
  }, []);

  return (
    <div className="order-details">
      <h2>Order Confirmation</h2>
      <p>
        <strong>Order Number:</strong> {order.id}
      </p>
      <p>
        <strong>Table Number:</strong> {order.tableNumber}
      </p>
      <p>
        <strong>Time:</strong> {order.time}
      </p>
      <p>
        <strong>Status:</strong> {order.status}
      </p>
      <h3>Order Items:</h3>
      <ul>
        {order.items.map((item, index) => (
          <li key={index}>
            {item.name} x {item.quantity} - ${item.price}
          </li>
        ))}
      </ul>
      <p>
        <strong>Total Amount:</strong> ${order.total}
      </p>
    </div>
  );
};

export default OrderDetails;
