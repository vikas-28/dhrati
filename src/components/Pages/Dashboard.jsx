import { useState } from "react";
import "./Dashboard.css";
import { useProductsContext } from "../../hooks/useProductsContext";

export default function Dashboard() {
  const { products, dispatch } = useProductsContext();
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [dash, setDash] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [toast, setToast] = useState(null);

  const [pricePerKg, setPricePerKg] = useState("");
  const [error, setError] = useState(null);
  const image = "/assets/about_image.jpg";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const price = pricePerKg * 5;
    const product = { category, image, name, price, pricePerKg };

    // ***** for prod *****
    const response = await fetch(
      "https://dhrati-backend.onrender.com/products",
      {
        // ***** for local *****
        // const response = await fetch("/api/products", {

        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      const productId = json.insertedId;
      const createdProduct = {
        category,
        image,
        name,
        price,
        pricePerKg,
        _id: productId,
      };
      dispatch({ type: "CREATE_PRODUCT", payload: createdProduct });
      setError(null);
      setCategory("");
      setName("");
      setPricePerKg("");
      setToast(" ℹ️ Product added successfully");
      setTimeout(() => setToast(null), 3000);
      setDash("update");
    }
    if (!response.ok) {
      setError(json.error);
    }
  };

  const handleDelete = async () => {
    // ***** for prod *****
    const response = await fetch(
      `https://dhrati-backend.onrender.com/products/${deletingProduct._id}`,
      {
        // ***** for local *****
        // const response = await fetch(`/api/products/${deletingProduct._id}`, {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({
        type: "DELETE_PRODUCT",
        payload: deletingProduct,
      });
      setDeletingProduct(null); // close modal
      setToast(" ℹ️ Product deleted successfully");
      setTimeout(() => setToast(null), 3000);
    } else {
      console.error(json.error);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const { _id, ...rest } = editingProduct; // strip _id
    const updatedProduct = { ...rest };

    // ***** for prod *****
    const response = await fetch(
      `https://dhrati-backend.onrender.com/products/${editingProduct._id}`,
      {
        // ***** for local *****
        // const response = await fetch(`/api/products/${editingProduct._id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedProduct),
        headers: { "Content-Type": "application/json" },
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_PRODUCT", payload: editingProduct });
      setEditingProduct(null); // close modal
      setToast(" ℹ️ Product Updated successfully");
      setTimeout(() => setToast(null), 3000);
    } else {
      console.error(json.error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Top Buttons */}
      <div className="dashboard-top-buttons">
        <button
          className={`dashboard-btn ${dash === "update" ? "active" : ""}`}
          onClick={() => setDash("update")}
        >
          Update/Delete Products
        </button>
        <button
          className={`dashboard-btn ${dash === "add" ? "active" : ""}`}
          onClick={() => setDash("add")}
        >
          Add Product
        </button>
      </div>

      {/* Content Area */}
      <div className="dashboard-content">
        {dash === "add" ? (
          <form onSubmit={handleSubmit} className="dashboard-product-form">
            <h3 className="dashboard-form-title">Add Product</h3>

            <label className="dashboard-form-label">Category</label>
            <select
              className="dashboard-form-input"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              required
            >
              <option value="">Select</option>
              <option value="Khichdi">Khichdi</option>
              <option value="Atta">Atta</option>
              <option value="Grains">Grains</option>
              <option value="Sell">Sell</option>
            </select>

            <label className="dashboard-form-label">Name</label>
            <input
              required
              type="text"
              className="dashboard-form-input"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            <label className="dashboard-form-label">Price per KG</label>
            <input
              required
              type="number"
              className="dashboard-form-input"
              onChange={(e) => setPricePerKg(e.target.value)}
              value={pricePerKg}
            />

            <button type="submit" className="dashboard-submit-btn">
              Submit
            </button>
          </form>
        ) : (
          <div className="dashboard-product-list">
            {products.map((item) => (
              <div className="dashboard-product-card" key={item._id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="dashboard-product-image"
                />
                <div className="dashboard-product-info">
                  <h4 className="dashboard-product-name">{item.name}</h4>
                  <p className="dashboard-product-price">
                    ₹{item.pricePerKg}/Kg
                  </p>
                </div>
                <div className="dashboard-product-actions">
                  <button
                    className="dashboard-icon-btn dashboard-edit-btn"
                    onClick={() => setEditingProduct(item)}
                  >
                    ✏️
                  </button>
                  <button
                    className="dashboard-icon-btn dashboard-delete-btn"
                    onClick={() => setDeletingProduct(item)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {editingProduct && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal-content">
            <h3>Edit Product</h3>
            <form onSubmit={handleUpdateSubmit}>
              <label>Category</label>
              <input
                type="text"
                value={editingProduct.category}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    category: e.target.value,
                  })
                }
              />

              <label>Name</label>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
              />

              <label>Price per KG</label>
              <input
                type="number"
                value={editingProduct.pricePerKg}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    pricePerKg: e.target.value,
                    price: e.target.value * 5, // recalc total price
                  })
                }
              />

              <label>Image URL</label>
              <input
                type="text"
                value={editingProduct.image}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    image: e.target.value,
                  })
                }
              />

              <div className="dashboard-modal-actions">
                <button type="submit" className="dashboard-submit-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="dashboard-cancel-btn"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deletingProduct && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal-content">
            <h3>Delete Product</h3>
            <p>
              Are you sure you want to delete{" "}
              <strong>{deletingProduct.name}</strong>?
            </p>
            <div className="dashboard-modal-actions">
              <button className="dashboard-submit-btn" onClick={handleDelete}>
                Yes, Delete
              </button>
              <button
                className="dashboard-cancel-btn"
                onClick={() => setDeletingProduct(null)} // just close
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {toast && (
        <div className="dashboard-toast">
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
