import React from "react";
import "./AboutCompany.css";
import image from "/assets/about_image.jpg";

const AboutCompany = () => {
  return (
    <div className="about-container">
      <h2>About Us</h2>
      <div className="about-content">
        <div className="about-text">
          <p>
            <strong>Dhrati Mahila Farmer Producer Company Limited</strong> is a
            private company incorporated on <strong>11th November 2022</strong>,
            registered under <strong>RoC Gwalior</strong> with CIN:
            <strong>U01100MP2022PTC063373</strong>.
          </p>
          <p>
            We operate in the{" "}
            <strong>agriculture and food processing sector</strong>, focusing on
            buying and selling grains and processed food products.
          </p>
          <p>Our main products include:</p>
          <p>
            <strong>
              Wheat, Soybean, Ragi Atta, Moong Atta, Multigrain Atta, Mix
              Khichdi
            </strong>
          </p>
          <p>
            We buy <strong>wheat and soybean directly from farmers</strong>,
            ensuring fair trade and better pricing for agricultural producers.
          </p>
        </div>
        <div className="about-image">
          <img src={image} alt="Office" />
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;
