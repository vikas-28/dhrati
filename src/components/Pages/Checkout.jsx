import React, { useState, useContext } from "react";
import CartContext from "../../context/CartContext";
import "./Checkout.css";

export default function Checkout() {
  const { cart } = useContext(CartContext);

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    notes: "",
  });

  const [savedAddress, setSavedAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = () => {
    setSavedAddress(
      `${form.firstName} ${form.lastName}, ${form.address}, ${form.city}, ${form.state}, ${form.zip}`
    );
    setShowForm(false);
  };

  const calculatePrice = () => {
    const mrp = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    let discount = 0;
    let discountPercent = 0;

    if (mrp >= 500 && mrp <= 1000) {
      discountPercent = 5;
      discount = mrp * 0.05;
    } else if (mrp > 1000) {
      discountPercent = 10;
      discount = mrp * 0.1;
    }

    const gst = (mrp - discount) * 0.05;
    const total = mrp - discount + gst;

    return {
      mrp: Math.round(mrp),
      discount: Math.round(discount),
      discountPercent,
      gst: Math.round(gst),
      total: Math.round(total),
    };
  };

  const { mrp, discount, discountPercent, gst, total } = calculatePrice();

  return (
    <div className="checkout-page">
      <div className="main-content">
        <div className="order-info">
          <h1>Your Order</h1>
          {cart.map((item) => (
            <div key={item.id} className="order-item">
              <img src={item.image} alt={item.name} />
              <div>
                <p>
                  {item.name} × {item.quantity}
                </p>
                <p>₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="address-section">
          <h2>Delivery Address</h2>
          {savedAddress ? (
            <div className="saved-address">{savedAddress}</div>
          ) : (
            <p>No address saved.</p>
          )}
          <button
            className="toggle-form-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Add Address"}
          </button>

          {showForm && (
            <div className="address-form">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={form.address}
                onChange={handleChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
              />
              <input
                type="text"
                name="zip"
                placeholder="Zip Code"
                value={form.zip}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
              />
              <textarea
                name="notes"
                placeholder="Notes (optional)"
                value={form.notes}
                onChange={handleChange}
              />
              <button onClick={handleAddAddress}>Save Address</button>
            </div>
          )}
        </div>
      </div>

      <div className="price-summary">
        <h2>
          <strong>Price Details</strong>
        </h2>
        <p>MRP: ₹{mrp}</p>
        <p>GST/Fees: ₹{gst}</p>
        <p>
          Discount ({discountPercent}%): -₹{discount}
        </p>
        <hr />
        <p>
          <strong>Total: ₹{total}</strong>
        </p>
      </div>

      <button className="place-order-btn">Place Order</button>
    </div>
  );
}
