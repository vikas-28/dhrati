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
          where women shine
        </p>
        <p>
          Bringing you the finest grains and flours, straight from farms run by
          women.
        </p>
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
