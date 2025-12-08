import { useState, useRef, useEffect } from "react";
import { iconStyle } from "./iconOverlays";

function CharacterOptions({ data, onStyleChange, onNameChange, position, onNotesChange }) {
  const [notes, setNotes] = useState("");
  const [relatives, setRelatives] = useState([]);
  const [openNotes, setOpenNotes] = useState({});

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch(
        `http://localhost:8080/api/world/entity/${data.id}/notes`
      );
      const text = await res.text();
      setNotes(text);
    };
  
    const fetchRelatives = async () => {
      const res = await fetch(
        `http://localhost:8080/api/world/entity/${data.id}/relatives`
      );
      const r = await res.json();
      setRelatives(r);
    }

    fetchNotes();
    fetchRelatives();
  }, [data.id]);

  return (
    <div
      style={{
        position: "absolute",
        left: position.x + 170,
        top: position.y + 25,
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
        <summary style={{ marginTop: "6px", cursor: "pointer", fontWeight: "bold" }}>
          Notes
        </summary>
        <input
          type="text"
          value={notes}
          onChange={(e) => {
            const newNotes = e.target.value;
            setNotes(newNotes);
            onNotesChange(data.id, newNotes);
          }}
          placeholder="Notes"
          style={{ width: "100%", marginTop: "6px" }}
        />
      </details>
      <details>
        <summary style={{ marginTop: "6px", cursor: "pointer", fontWeight: "bold" }}>
          Relationships
        </summary>
        <input
          type="text"
          value={notes}
          onChange={(e) => {
            const newNotes = e.target.value;
            setNotes(newNotes);
            onNotesChange(data.id, newNotes);
          }}
          placeholder="Notes"
          style={{ width: "100%", marginTop: "6px" }}
        />
      </details>
      
    </div>
  );
}

export default function CharacterIcon({ data, onStyleChange, onMove, onNameChange, onNotesChange }) {
  const [dragging, setDragging] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.target.tagName === "SELECT" || e.target.tagName === "INPUT") return;

    e.preventDefault();
    setDragging(true);

    const rect = e.currentTarget.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleDoubleClick = () => {
    if (showOptions === false)
      setShowOptions(true);
    else
      setShowOptions(false);
  };

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e) => {
      const newPos = {
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      };
      onMove(data.id, newPos);
    };

    const handleMouseUp = () => setDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, onMove, data.id]);

  return (
    <>
      <div
        className="character-icon"
        style={{
          left: data.position.x,
          top: data.position.y,
          cursor: dragging ? "grabbing" : "grab",
          position: "absolute",
        }}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick} // open modal
      >
        <img
          src="images/characterIcon/CharacterIconBust.png"
          alt="Character"
          className="icon"
          draggable={false}
        />
        {data.style && iconStyle[data.style] && (
          <img
            src={iconStyle[data.style]}
            alt={data.style}
            className="overlay-icon"
            draggable={false}
          />
        )}
        <p className="character-name">{data.name}</p>
      </div>

      {showOptions && data.position && (
        <CharacterOptions
          data={data}
          position={data.position}
          onStyleChange={onStyleChange}
          onNameChange={onNameChange}
          onNotesChange={onNotesChange}
        />
      )}
    </>
  );
}
