import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./ShoppingCart.css";
import CartContext from "../../context/CartContext";

export default function ShoppingCart() {
  const { cart, setCart } = useContext(CartContext);
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
  const [cartTotal, setcartTotal] = useState(0);
  useEffect(() => {
    // -------------------------
    // using map method
    // -------------------------
    // let total = 0;
    // setcartTotal(() => {
    //   cart.map((item) => {
    //     total += item.price * item.quantity;
    //   });
    //   return total;
    // });

    // -----------------------
    // using reduce method
    // -----------------------
    setcartTotal(() => {
      return cart.reduce((acc, item) => {
        return (acc += item.price * item.quantity);
      }, 0);
    });
  }, [cart]);

  const [animateBadge, setAnimateBadge] = useState(false);
  useEffect(() => {
    if (cart.length === 1) {
      setAnimateBadge(true);
      const timeout = setTimeout(() => setAnimateBadge(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [cart.length]);
  return (
    <>
      {/* Cart Icon on Right Side */}
      <button className="cart" onClick={toggleCart}>
        <FontAwesomeIcon
          className="cart-icon"
          icon={faCartShopping}
          style={{ color: "#586f69" }}
        />
        {cart.length > 0 && (
          <span className={`cart-badge ${animateBadge && "pop"}`}>
            {cart.length}
          </span>
        )}
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
          <button className="checkout">Checkout</button>
        </div>
      </div>
    </>
  );
}
