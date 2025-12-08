import { useState } from "react";

export default function CharacterForm({ onSubmit, onClose }) {
  const [name, setName] = useState("");
  const [style, setStyle] = useState("Default");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      pos: {x: 50, y: 150}, // default position
      name,
      style,
    });

    setName("");
    setStyle("Default");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        padding: "20px",
        border: "1px solid #ccc",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
      }}
    >
      <h3>Add Character</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}
