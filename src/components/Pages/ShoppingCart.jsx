import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./ShoppingCart.css";

export default function ShoppingCart({ cart, setCart }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const [cartTotal, setCartTotal] = useState(0);
  return (
    <>
      {/* Cart Icon on Right Side */}
      <button className="cart-icon" onClick={toggleCart}>
        <FontAwesomeIcon icon={faCartShopping} style={{ color: "#586f69" }} />(
        {cart.length})
      </button>

      {/* Shopping Cart Panel */}
      <div className={`shopping-cart ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={toggleCart}>
            ✖
          </button>
        </div>
        {/* items card */}
        <div className="cart-items">
          {cart.map((product) => (
            <div key={product.id} className="cart-item">
              <img src={product.image} alt="image" />
              <div className="item-details">
                <p>{product.name}</p>
                <div className="quantity">
                  <button>-</button>
                  <span>{product.quantity} kg</span>
                  <button>+</button>
                </div>
                <p>₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-footer">
          <p>
            Subtotal: <strong>₹{cartTotal}</strong>
          </p>
          <button className="view-cart">View Cart</button>
          <button className="checkout">Checkout</button>
        </div>
      </div>
    </>
  );
}
