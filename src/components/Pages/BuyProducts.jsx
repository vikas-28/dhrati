import React, { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./BuyProducts.css";
import CartContext from "../../context/CartContext";
import { ProductsContext } from "../../context/ProductsContext";

const BuyProducts = () => {
  const { cart, setCart } = useContext(CartContext);
  const { product: products, mockCategories: categories } =
    useContext(ProductsContext);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "All Products";

  const [selectedCategory, setSelectedCategory] = useState(category);
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
        <h2>
          <strong>Categories</strong>
        </h2>
        <br />
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
          <div className="product-card" key={product._id}>
            <img
              src={product.image}
              alt={product.name}
              onClick={() => navigate(`/product/${product._id}`)}
            />
            <h4 onClick={() => navigate(`/product/${product._id}`)}>
              {product.name}
            </h4>
            <p>₹{(quantities[product._id] || 5) * (product.price / 5)}</p>

            <div className="quantity-selector">
              <button
                onClick={() =>
                  handleQuantityChange(
                    product._id,
                    Math.max(5, (quantities[product._id] || 5) - 5)
                  )
                }
              >
                -
              </button>
              <span>{quantities[product._id] || 5} kg</span>
              <button
                onClick={() =>
                  handleQuantityChange(
                    product._id,
                    (quantities[product._id] || 5) + 5
                  )
                }
              >
                +
              </button>
            </div>

            <button
              className="add-to-cart"
              onClick={() => {
                const quantityToAdd = Number(quantities[product._id] || 5);
                const existingItem = cart.find(
                  (item) => item._id === product._id
                );

                if (existingItem) {
                  const updatedCart = cart.map((item) =>
                    item._id === product._id
                      ? {
                          ...item,
                          quantity: item.quantity + quantityToAdd,
                          cartPrice:
                            item.cartPrice +
                            (quantities[product._id] || 5) *
                              (product.price / 5),
                        }
                      : item
                  );

                  setCart(updatedCart);
                } else {
                  setCart([
                    ...cart,
                    {
                      _id: product._id,
                      name: product.name,
                      quantity: quantityToAdd,
                      price: product.pricePerKg,
                      cartPrice:
                        Number(quantities[product._id] || 5) *
                        (product.price / 5),
                      image: product.image,
                    },
                  ]);
                }
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyProducts;
