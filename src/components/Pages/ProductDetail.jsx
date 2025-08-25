import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import ProductsContext from "../../context/ProductsContext";

// const products = [
//   {
//     id: 1,
//     name: "Wheat",
//     category: "Grains",
//     price: 50,
//     image: "/assets/grains.jpg",
//     description:
//       "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
//   },
//   {
//     id: 2,
//     name: "Soyabean",
//     category: "Grains",
//     price: 70,
//     image: "/assets/grains.jpg",
//     description:
//       "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
//   },
//   {
//     id: 3,
//     name: "Ragi Atta",
//     category: "Atta",
//     price: 100,
//     image: "/assets/aata.jpg",
//     description:
//       "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
//   },
//   {
//     id: 4,
//     name: "Moong Atta",
//     category: "Atta",
//     price: 120,
//     image: "/assets/aata.jpg",
//     description:
//       "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
//   },
//   {
//     id: 5,
//     name: "Multigrain Atta",
//     category: "Atta",
//     price: 150,
//     image: "/assets/aata.jpg",
//     description:
//       "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
//   },
//   {
//     id: 6,
//     name: "Mix Khichdi",
//     category: "Khichdi",
//     price: 200,
//     image: "/assets/khichdi.jpg",
//     description:
//       "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
//   },
// ];

const ProductDetail = () => {
  const { product: products } = useContext(ProductsContext);
  const { _id } = useParams();
  // const product = products.find((item) => item._id === parseInt(_id));
  const product = products.find((item) => item._id === _id);
  const [quantity, setQuantity] = useState(5);

  if (!product) {
    return <h2 className="not-found">Product not found!</h2>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="product-description">{product.description}</p>
        <p className="product-price">
          Price: ₹{(quantity / 5) * product.price}
        </p>

        <div className="quantity-selector">
          <button onClick={() => setQuantity(Math.max(5, quantity - 5))}>
            -
          </button>
          <span>{quantity} kg</span>
          <button onClick={() => setQuantity(quantity + 5)}>+</button>
        </div>

        <div className="product-buttons">
          <button className="add-to-cart">Add to Cart</button>
          <button className="buy-now">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
