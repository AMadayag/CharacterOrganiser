import { useState, useEffect } from "react";
import { iconStyle } from "./iconOverlays";
import { useCharacterNotes } from "./UseCharacterNotes";

export default function CharacterOptions({
  data,
  onStyleChange,
  onNameChange,
  position,
  onNotesChange,
}) {
  const [relatives, setRelatives] = useState([]);

  const { notes, updateNotes } = useCharacterNotes(
    data.id,
    onNotesChange
  );

  useEffect(() => {
    const fetchRelatives = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/world/entity/${data.id}/relatives`
        );

        if (!res.ok) {
          console.error("Failed to fetch relatives:", res.status);
          return;
        }

        const r = await res.json();
        setRelatives(r);
      } catch (error) {
        console.error("Error fetching relatives:", error);
        setRelatives([]);
      }
    };

    fetchRelatives();
  }, [data.id]);

  const updateRelativeInfo = async (relativeEntityId, newInfo) => {
    // Update locally
    setRelatives((prev) =>
      prev.map((rel) =>
        rel.entity.id === relativeEntityId
          ? { ...rel, info: newInfo }
          : rel
      )
    );

    // Send to backend
    await fetch(
      `http://localhost:8080/api/world/entity/${data.id}/relative/${relativeEntityId}/info`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ info: newInfo }),
      }
    );
  };

  return (
    <div
      style={{
        position: "absolute",
        left: `${position.x + 170}px`,
        top: `${position.y + 25}px`,
        background: "white",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        boxShadow: "0 0 5px rgba(0,0,0,0.3)",
        zIndex: 1000,
      }}
    >
      <input
        type="text"
        value={data.name}
        onChange={(e) => onNameChange(data.id, e.target.value)}
        placeholder="Name"
        style={{ width: "100%", marginBottom: "6px" }}
      />

      <select
        value={data.style}
        onChange={(e) => onStyleChange(data.id, e.target.value)}
        style={{ width: "100%" }}
      >
        {Object.keys(iconStyle).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>

      <details>
        <summary
          style={{
            marginTop: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Notes
        </summary>

        <input
          type="text"
          value={notes}
          onChange={(e) => updateNotes(e.target.value)}
          placeholder="Notes"
          style={{ width: "100%", marginTop: "6px" }}
        />
      </details>

      <details>
        <summary
          style={{
            marginTop: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Relatives ({relatives.length})
        </summary>

        <div style={{ marginTop: "6px" }}>
          {relatives.map((rel) => (
            <div
              key={rel.entity.id}
              style={{ marginBottom: "8px" }}
            >
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  display: "block",
                }}
              >
                {rel.entity.name}
              </label>

              <input
                type="text"
                value={rel.info}
                onChange={(e) =>
                  updateRelativeInfo(
                    rel.entity.id,
                    e.target.value
                  )
                }
                placeholder="Relationship info..."
                style={{ width: "100%", fontSize: "12px" }}
              />
            </div>
          ))}

          {relatives.length === 0 && (
            <p
              style={{
                fontSize: "12px",
                color: "#666",
                fontStyle: "italic",
              }}
            >
              No relatives yet
            </p>
          )}
        </div>
      </details>
    </div>
  );
}
