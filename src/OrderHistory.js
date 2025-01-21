import React, { useState } from "react";
import { ArrowLeft, CircleX } from "lucide-react";
import ReactSelect from "react-select";
import tableNos from "./tabledetails";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { CSSTransition } from "react-transition-group";
import { v4 as uuidv4 } from "uuid"; // Import uuid

const OrderHistory = ({
  orders,
  setShowOrders,
  deleteOrder,
  isVisible,
  resetOrders,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (selectedOption) =>
    setSelectedItem(selectedOption?.value);

  const customStyles = {
    control: (styles) => ({ ...styles, borderColor: "#ccc" }),
    option: (styles, { isSelected }) => ({
      ...styles,
      backgroundColor: isSelected ? "#c59d5f" : styles.backgroundColor,
      color: isSelected ? "#fff" : styles.color,
      "&:hover": { backgroundColor: "#f0f0f0" },
    }),
    singleValue: (styles) => ({ ...styles, color: "#333" }),
  };

  const handlePlaceOrder = () => {
    const orderDetails = {
      id: uuidv4(), // Generate a UUID for the order ID
      tableNumber: selectedItem,
      time: new Date().toLocaleTimeString(),
      status: "Pending",
      items: orders.map((order) => ({
        name: order.title,
        quantity: 1,
        price: order.price,
      })),
      total: orders.reduce((total, order) => total + order.price, 0),
    };
    console.log(orderDetails); // Log the order details to the console
    resetOrders(); // Reset orders before navigating
    navigate("/order-details", { state: { order: orderDetails } }); // Navigate to OrderDetails page
  };

  return (
    <CSSTransition
      in={isVisible}
      timeout={300}
      classNames="pageSlider"
      unmountOnExit
    >
      <div className="order-history">
        <h2>Order History</h2>
        <button onClick={() => setShowOrders(false)} className="back-btn">
          <ArrowLeft />
          Back to Menu
        </button>
        <ul>
          {orders.map((order, index) => (
            <li
              key={index}
              style={{
                boxShadow: "0px 4px 10px rgba(197, 157, 95, 0.5)",
                borderRadius: "10px",
                padding: "15px",
                marginBlock: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <img
                  className="photo"
                  src={order.image}
                  alt={order.title}
                  style={{ width: "100px", height: "100px" }}
                />
                <p>
                  {order.title} - ${order.price}
                </p>
              </div>
              <CircleX
                onClick={() => deleteOrder(index)}
                style={{ cursor: "pointer" }}
              />
            </li>
          ))}
        </ul>
        <p style={{ fontWeight: "bold", color: "black" }}>
          Total: ${orders.reduce((total, order) => total + order.price, 0)}
        </p>

        <div>
          <div className="card-dd">
            <label
              htmlFor="table-number"
              style={{ color: "black", fontWeight: "bold" }}
            >
              Select Table Number
            </label>
            <ReactSelect
              id="table-number"
              value={tableNos.find((table) => table.value === selectedItem)}
              onChange={handleChange}
              options={tableNos}
              placeholder="Please select"
              styles={customStyles}
            />
          </div>
          <button
            className="place-btn"
            onClick={handlePlaceOrder}
            disabled={!selectedItem}
          >
            Place Order Now
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default OrderHistory;
