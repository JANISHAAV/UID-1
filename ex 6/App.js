// src/App.js
import React, { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.description && formData.quantity) {
      setItems([...items, formData]);
      setFormData({ name: "", description: "", quantity: "" });
    } else {
      alert("Please fill all fields!");
    }
  };

  const handleRemove = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>📝 Add Item to List</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            ➕ Add Item
          </button>
        </form>

        <h2 style={styles.subtitle}>📋 Item List</h2>
        <ul style={styles.list}>
          {items.map((item, index) => (
            <li key={index} style={styles.listItem}>
              <div>
                <strong>{item.name}</strong> ({item.quantity}) -{" "}
                <em>{item.description}</em>
              </div>
              <button
                style={styles.removeButton}
                onClick={() => handleRemove(index)}
              >
                ❌ Remove
              </button>
            </li>
          ))}
        </ul>
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
    background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
    padding: "20px",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
    width: "400px",
    textAlign: "center",
  },
  title: {
    fontSize: "26px",
    marginBottom: "20px",
    color: "#333",
  },
  subtitle: {
    marginTop: "25px",
    marginBottom: "10px",
    fontSize: "22px",
    color: "#444",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    marginTop: "15px",
    textAlign: "left",
  },
  listItem: {
    background: "#f3f4f6",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  removeButton: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default App;
