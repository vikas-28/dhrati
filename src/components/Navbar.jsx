import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ShoppingCart from "./Pages/ShoppingCart";
import "./Navbar.css";

export default function Navbar({ cart, setCart }) {
  const [position, setPosition] = useState({
    left: 393,
    width: 84,
    opacity: 1,
  });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="header">
        <NavLink className="logo" to="/">
          <span className="dh3"> धृti</span>
        </NavLink>

        <nav className={`nav-links ${isOpen ? "open" : ""}`}>
          <Tab
            setPosition={setPosition}
            to="/"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Tab>
          <Tab
            setPosition={setPosition}
            to="/buyproducts"
            onClick={() => setIsOpen(false)}
          >
            Shop
          </Tab>
          <Tab
            setPosition={setPosition}
            to="/sell"
            onClick={() => setIsOpen(false)}
          >
            Sell
          </Tab>
          <Tab
            setPosition={setPosition}
            to="/our-story"
            onClick={() => setIsOpen(false)}
          >
            Our Story
          </Tab>
          <Tab
            setPosition={setPosition}
            to="/dashboard"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Tab>

          <Cursor position={position} />
        </nav>

        <div className="cart-btn">
          <ShoppingCart cart={cart} setCart={setCart} />
        </div>

        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>
      </header>
      <div className="navbar-border"></div>
    </>
  );
}

const Tab = ({ children, setPosition, to, onClick }) => {
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
          onClick && onClick();
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
