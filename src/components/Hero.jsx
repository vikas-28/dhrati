import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="hero">
      <div className="hero_content">
        <h1>धृti</h1>
        <p>
          Dhrati Mahila Farmer Producer Co.
          <br />
          WHERE WOMEN SHINE
        </p>
        <p>authentic products</p>
        <button className="hero_btn" onClick={() => navigate("/buyproducts")}>
          SHOP NOW
        </button>
      </div>
      <div className="image_container">
        <img
          className="hero_image"
          src="/assets/hero_img_right.png"
          alt="Grains and Flour"
        />
      </div>
    </div>
  );
};

export default Hero;
