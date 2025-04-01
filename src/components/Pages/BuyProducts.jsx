import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BuyProducts.css";

const products = [
  {
    id: 1,
    name: "Wheat",
    category: "Grains",
    price: 50,
    image: "/src/assets/grains.jpg",
  },
  {
    id: 2,
    name: "Soyabean",
    category: "Grains",
    price: 70,
    image: "/src/assets/grains.jpg",
  },
  {
    id: 3,
    name: "Ragi Atta",
    category: "Atta",
    price: 100,
    image: "/src/assets/aata.jpg",
  },
  {
    id: 4,
    name: "Moong Atta",
    category: "Atta",
    price: 120,
    image: "/src/assets/aata.jpg",
  },
  {
    id: 5,
    name: "Multigrain Atta",
    category: "Atta",
    price: 150,
    image: "/src/assets/aata.jpg",
  },
  {
    id: 6,
    name: "Mix Khichdi",
    category: "Khichdi",
    price: 200,
    image: "/src/assets/khichdi.jpg",
  },
];

const categories = ["All Products", "Grains", "Atta", "Khichdi"];

const BuyProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities({ ...quantities, [productId]: newQuantity });
  };

  const filteredProducts =
    selectedCategory === "All Products"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="buy-products-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>Categories</h3>
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </aside>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              onClick={() => navigate(`/product/${product.id}`)}
            />
            <h4 onClick={() => navigate(`/product/${product.id}`)}>
              {product.name}
            </h4>
            <p>₹{(quantities[product.id] || 5) * (product.price / 5)}</p>

            <div className="quantity-selector">
              <button
                onClick={() =>
                  handleQuantityChange(
                    product.id,
                    Math.max(5, (quantities[product.id] || 5) - 5)
                  )
                }
              >
                -
              </button>
              <span>{quantities[product.id] || 5} kg</span>
              <button
                onClick={() =>
                  handleQuantityChange(
                    product.id,
                    (quantities[product.id] || 5) + 5
                  )
                }
              >
                +
              </button>
            </div>

            <button className="add-to-cart">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyProducts;
