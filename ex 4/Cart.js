import React, { useContext } from "react";
import { CartContext } from "../CartContext";

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty 🛒</p>
      ) : (
        <div style={{ display: "grid", gap: "15px" }}>
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                background: "white",
                boxShadow: "0 4px 8px rgba(0,0,0,0.05)"
              }}
            >
              <div>
                <h3 style={{ margin: 0 }}>{item.name}</h3>
                <p style={{ margin: 0, color: "#007bff" }}>{item.price}</p>
              </div>
              <button
                style={{
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
                onClick={() => removeFromCart(index)}
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
