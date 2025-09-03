import React, { useContext } from "react";
import { CartContext } from "../CartContext";

function Products() {
  const { addToCart } = useContext(CartContext);

  const productList = [
    { id: 1, name: "Laptop", price: "$999", img: "https://via.placeholder.com/200x120?text=Laptop" },
    { id: 2, name: "Headphones", price: "$199", img: "https://via.placeholder.com/200x120?text=Headphones" },
    { id: 3, name: "Smartphone", price: "$799", img: "https://via.placeholder.com/200x120?text=Smartphone" }
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Products</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
        {productList.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "12px",
              background: "white",
              boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
              textAlign: "center"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src={product.img} alt={product.name} style={{ width: "100%", borderRadius: "8px" }} />
            <h3 style={{ margin: "10px 0" }}>{product.name}</h3>
            <p style={{ fontWeight: "bold", color: "#007bff" }}>{product.price}</p>
            <button
              style={{
                background: "#28a745",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
              onClick={() => addToCart(product)}
            >
              ➕ Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
