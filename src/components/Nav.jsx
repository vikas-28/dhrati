import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ShoppingCart from "./Pages/ShoppingCart";
import "./Nav.css";

export default function Nav({ cart, setCart }) {
  const [position, setPosition] = useState({ left: 1, width: 84, opacity: 1 });

  return (
    <>
      <header className="header">
        <NavLink className="logo" to="/">
          <span className="dh3"> धृti</span>
        </NavLink>

        <div>
          <ul className="relative mx-auto flex w-fit rounded-full p-0.5">
            <Tab setPosition={setPosition} to="/">
              Home
            </Tab>
            <Tab setPosition={setPosition} to="/buyproducts">
              Shop
            </Tab>
            <Tab setPosition={setPosition} to="/sell">
              Sell
            </Tab>
            <Tab setPosition={setPosition} to="/our-story">
              Our Story
            </Tab>
            <Tab setPosition={setPosition} to="/dashboard">
              Dashboard
            </Tab>

            <Cursor position={position} />
          </ul>
        </div>

        <div className="cart-btn">
          <ShoppingCart cart={cart} setCart={setCart} />
        </div>
      </header>
      <div className="navbar-border"></div>
    </>
  );
}

const Tab = ({ children, setPosition, to }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="tabs relative z-10 block cursor-pointer px-3 py-1.5 text-xs md:px-5 md:py-3 md:text-base"
    >
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? "active-tab" : "")}
        onClick={() => {
          if (!ref.current) return;
          const { width } = ref.current.getBoundingClientRect();
          setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
        }}
      >
        {children}
      </NavLink>
    </li>
  );
};

const Cursor = ({ position }) => (
  <motion.li
    animate={position}
    className="cursor absolute z-0 h-7 rounded-full md:h-12"
  />
);
