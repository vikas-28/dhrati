import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BuyProducts.css";

const products = [
  {
    id: 1,
    name: "Wheat",
    category: "Grains",
    price: 50,
    image: "/assets/grains.jpg",
  },
  {
    id: 2,
    name: "Soyabean",
    category: "Grains",
    price: 70,
    image: "/assets/grains.jpg",
  },
  {
    id: 3,
    name: "Ragi Atta",
    category: "Atta",
    price: 100,
    image: "/assets/aata.jpg",
  },
  {
    id: 4,
    name: "Moong Atta",
    category: "Atta",
    price: 120,
    image: "/assets/aata.jpg",
  },
  {
    id: 5,
    name: "Multigrain Atta",
    category: "Atta",
    price: 150,
    image: "/assets/aata.jpg",
  },
  {
    id: 6,
    name: "Mix Khichdi",
    category: "Khichdi",
    price: 200,
    image: "/assets/khichdi.jpg",
  },
];

const categories = ["All Products", "Grains", "Atta", "Khichdi"];

const BuyProducts = ({ cart, setCart }) => {
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

            <button
              className="add-to-cart"
              onClick={() => {
                const quantityToAdd = Number(quantities[product.id] || 5);
                const existingItem = cart.find(
                  (item) => item.id === product.id
                );

                if (existingItem) {
                  const updatedCart = cart.map((item) =>
                    item.id === product.id
                      ? {
                          ...item,
                          quantity: item.quantity + quantityToAdd,
                          price:
                            item.price +
                            (quantities[product.id] || 5) * (product.price / 5),
                        }
                      : item
                  );

                  setCart(updatedCart);
                } else {
                  setCart([
                    ...cart,
                    {
                      id: product.id,
                      name: product.name,
                      quantity: quantityToAdd,
                      price:
                        Number(quantities[product.id] || 5) *
                        (product.price / 5),
                      image: product.image,
                    },
                  ]);
                }
              }}
            >
              Add to Cart
            </button>

            {/* <button
              className="add-to-cart"
              onClick={() => {
                setCart([
                  ...cart,
                  {
                    id: `${product.id}`,
                    name: `${product.name}`,
                    quantity: `${quantities[product.id] || 5}`,
                    price: `${product.price}`,
                    image: `${product.image}`,
                  },
                ]);
              }}
            >
              Add to Cart
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyProducts;
