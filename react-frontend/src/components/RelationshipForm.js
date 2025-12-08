import { useState } from "react";

export default function RelationshipForm({ onSubmit, onClose, entities: entitiesObj }) {
  const entitiesArray = entitiesObj.entities

  const [id1, setId1] = useState("");
  const [id2, setId2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id1 || !id2) return;

    onSubmit(id1, id2);

    setId1("");
    setId2("");
    onClose();
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
        zIndex: 1000,
      }}
    >
      <h3>Add Relationship</h3>
      <form onSubmit={handleSubmit}>
        <select
          value={id1}
          onChange={(e) => setId1(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <option value="">Select first character</option>
          {entitiesArray.map((entity) => (
            <option key={entity.id} value={entity.id}>
              {entity.name}
            </option>
          ))}
        </select>


        <select
          value={id2}
          onChange={(e) => setId2(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <option value="">Select second character</option>
          {entitiesArray.map((entity) => (
            <option key={entity.id} value={entity.id}>
              {entity.name}
            </option>
          ))}
        </select>

        <button type="submit">Submit</button>
        <button type="button" onClick={onClose} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      </form>
    </div>
  );
}
