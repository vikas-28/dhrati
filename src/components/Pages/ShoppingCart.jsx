import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./ShoppingCart.css";

const ShoppingCart = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Cart Icon on Right Side */}
      <button className="cart-icon" onClick={toggleCart}>
        <FontAwesomeIcon icon={faCartShopping} style={{ color: "#586f69" }} />
      </button>

      {/* Shopping Cart Panel */}
      <div className={`shopping-cart ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={toggleCart}>
            ✖
          </button>
        </div>

        <div className="cart-items">
          <div className="cart-item">
            <img src="/assets/Ref/hero3.jpg" alt="wheat" />
            <div className="item-details">
              <p>Wheat</p>
              <div className="quantity">
                <button>-</button>
                <span>2</span>
                <button>+</button>
              </div>
              <p>₹35.00</p>
            </div>
          </div>

          <div className="cart-item">
            <img src="/assets/Ref/hero3.jpg" alt="soyabean" />
            <div className="item-details">
              <p>Soyabean</p>
              <div className="quantity">
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
              <p>₹40.00</p>
            </div>
          </div>
        </div>

        <div className="cart-footer">
          <p>
            Subtotal: <strong>₹75.00</strong>
          </p>
          <button className="view-cart">View Cart</button>
          <button className="checkout">Checkout</button>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
