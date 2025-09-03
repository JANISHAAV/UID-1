// src/App.js
import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>⚡ Counter Application ⚡</h1>
        <h2 style={styles.counter}>{count}</h2>
        <div style={styles.buttons}>
          <button style={styles.decrement} onClick={() => setCount(count - 1)}>
            ➖ Decrement
          </button>
          <button style={styles.increment} onClick={() => setCount(count + 1)}>
            ➕ Increment
          </button>
        </div>
        <button style={styles.reset} onClick={() => setCount(0)}>
          🔄 Reset
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#333",
  },
  counter: {
    fontSize: "60px",
    fontWeight: "bold",
    color: "#4f46e5",
    marginBottom: "20px",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "20px",
  },
  increment: {
    padding: "10px 20px",
    fontSize: "18px",
    backgroundColor: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
  decrement: {
    padding: "10px 20px",
    fontSize: "18px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
  reset: {
    padding: "10px 20px",
    fontSize: "18px",
    backgroundColor: "#6b7280",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
};

export default App;
