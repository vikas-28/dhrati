import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./ShoppingCart.css";

export default function ShoppingCart({ cart, setCart }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  function deleteCard(id) {
    setCart((cart) => {
      return cart.filter((item) => item.id != id);
    });
  }
  function increaseQuantity(id) {
    return setCart((oldCart) =>
      oldCart.map((item) => {
        if (item.id === id) return { ...item, quantity: item.quantity + 5 };
        return item;
      })
    );
  }
  function decreaseQuantity(id) {
    setCart((oldCart) =>
      oldCart.map((item) => {
        if (item.id === id) {
          if (item.quantity === 5) return item;
          return { ...item, quantity: item.quantity - 5 };
        }
        return item;
      })
    );
  }
  const cartTotal = cart.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);
  return (
    <>
      {/* Cart Icon on Right Side */}
      <button className="cart-icon" onClick={toggleCart}>
        <FontAwesomeIcon icon={faCartShopping} style={{ color: "#586f69" }} />(
        )
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
                  <button onClick={() => decreaseQuantity(product.id)}>
                    -
                  </button>
                  <span>{product.quantity} kg</span>
                  <button onClick={() => increaseQuantity(product.id)}>
                    +
                  </button>
                </div>
                <p>₹{product.quantity * product.price}</p>
              </div>
              <button onClick={() => deleteCard(product.id)}>Delete</button>
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
