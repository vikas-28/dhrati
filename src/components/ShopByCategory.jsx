import React from "react";
import { useNavigate } from "react-router-dom";
import "./ShopByCategory.css";

const categories = [
  {
    name: "Grains",
    image: "/assets/grains.jpg",
  },
  {
    name: "Aata",
    image: "/assets/aata.jpg",
  },
  {
    name: "Khichdi",
    image: "/assets/khichdi.jpg",
  },
];

const ShopByCategory = () => {
  const navigate = useNavigate();

  return (
    <div className="category-section">
      <p>Shop</p>
      <h2>Products By Category</h2>
      <div className="category-container">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-card"
            onClick={() => navigate("/buyproducts")}
          >
            <img
              src={category.image}
              alt={category.name}
              className="category-image"
            />
            <div className="category-name">{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
