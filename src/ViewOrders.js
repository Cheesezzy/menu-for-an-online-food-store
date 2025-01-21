import React from "react";
import { ClipboardList } from "lucide-react";

const ViewOrders = ({ clickCount, setShowOrders, onShowOrderHistory }) => {
  const handleClick = () => {
    setShowOrders(true); // Set showOrders state to true to display OrderHistory
    onShowOrderHistory(); // Trigger the order history view (no need to pass true)
  };

  return (
    <div className="view-orders" onClick={handleClick}>
      <ClipboardList />
      <h5>View Orders</h5>
      <p
        style={{
          fontWeight: "bold",
          fontSize: "12px",
          border: "1px solid red",
          borderRadius: "50%",
          padding: "0px 5px",
          background: "red",
          color: "white",
        }}
      >
        {clickCount}
      </p>
    </div>
  );
};

export default ViewOrders;
