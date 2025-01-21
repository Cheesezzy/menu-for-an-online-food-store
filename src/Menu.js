import React from "react";

const Menu = ({ items, setClickCount, setShowCounter, setOrders }) => {
  const handleClick = (menuItem) => {
    setClickCount((prevCount) => {
      const newCount = prevCount + 1;
      setShowCounter(true);
      return newCount;
    });
    setOrders((prevOrders) => [
      ...prevOrders,
      {
        ...menuItem,
        id: prevOrders.length + 1,
        date: new Date().toLocaleDateString(),
        status: "Pending",
        items: [
          {
            id: menuItem.id,
            name: menuItem.title,
            quantity: 1,
            price: menuItem.price,
          },
        ],
        total: menuItem.price,
        image: menuItem.img,
      },
    ]);
  };

  return (
    <div className="section-center">
      {items.map((menuItem) => {
        const { id, title, img, desc, price } = menuItem;

        return (
          <article key={id} className="menu-item">
            <img src={img} alt={title} className="photo" />
            <div className="item-info">
              <header>
                <h4>{title}</h4>
                <h4 className="price">${price}</h4>
              </header>
              <p className="item-text">{desc}</p>
              <button className="btn" onClick={() => handleClick(menuItem)}>
                Place Order
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Menu;
