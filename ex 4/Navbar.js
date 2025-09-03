import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext";

function Navbar() {
  const { cart } = useContext(CartContext);

  return (
    <nav style={{ padding: "15px", background: "#222", color: "white" }}>
      <Link style={{ margin: "0 15px", color: "white", fontWeight: "bold" }} to="/">Home</Link>
      <Link style={{ margin: "0 15px", color: "white", fontWeight: "bold" }} to="/products">Products</Link>
      <Link style={{ margin: "0 15px", color: "white", fontWeight: "bold" }} to="/cart">
        Cart 🛒 ({cart.length})
      </Link>
    </nav>
  );
}

export default Navbar;
