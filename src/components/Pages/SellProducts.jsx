import { useState } from "react";
import "./SellProducts.css";
import { useProductsContext } from "../../hooks/useProductsContext";

export default function SellProducts() {
  const { dispatch } = useProductsContext();

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [pricePerKg, setPricePerKg] = useState("");
  const [error, setError] = useState(null);
  const image = "/assets/about_image.jpg";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const price = pricePerKg * 5;
    const product = { category, image, name, price, pricePerKg };

    const response = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "CREATE_PRODUCT", payload: json });
      setError(null);
      setCategory("");
      setName("");
      setPricePerKg("");
      console.log("new product added : ", json);
    }
    if (!response.ok) {
      setError(json.error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>Add a product</h3>
        <label>Category</label>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          required
        >
          <option value="Khichdi">Khichdi</option>
          <option value="Atta">Atta</option>
          <option value="Grains">Grains</option>
          <option value="Sell">Sell</option>
        </select>
        <br />
        <label>Name</label>
        <input
          required
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
        <br />
        <label>Price per KG</label>
        <input
          required
          type="number"
          onChange={(e) => {
            setPricePerKg(e.target.value);
          }}
          value={pricePerKg}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
