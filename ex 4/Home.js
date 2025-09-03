import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>✨ Welcome to Simple Shop ✨</h1>
      <p style={{ fontSize: "18px", color: "#555" }}>
        Your one-stop shop for awesome products!
      </p>
      <Link
        to="/products"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "12px 20px",
          background: "#007bff",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold"
        }}
      >
        🛍️ Start Shopping
      </Link>
    </div>
  );
}

export default Home;
