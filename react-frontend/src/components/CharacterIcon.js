import { useState, useRef, useEffect } from "react";
import { iconStyle } from "./iconOverlays";
import { useXarrow } from "react-xarrows";

function CharacterOptions({ data, onStyleChange, onNameChange, position, onNotesChange }) {
  const [notes, setNotes] = useState("");
  const [relatives, setRelatives] = useState([]);

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

    fetchRelatives();
    fetchNotes();
  }, [data.id]);

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
      
    </div>
  );
}

export default function CharacterIcon({
  data,
  onStyleChange,
  onMove,
  onNameChange,
  onNotesChange,
}) {
  const [dragging, setDragging] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const updateXarrow = useXarrow();

  const handleMouseDown = (e) => {
    if (e.target.tagName === "SELECT" || e.target.tagName === "INPUT") return;

    e.preventDefault();
    setDragging(true);

    const rect = e.currentTarget.getBoundingClientRect();
    offset.current = {
      x: e.clientX - data.position.x,
      y: e.clientY - data.position.y,
    };
  };

  const handleDoubleClick = () => {
    setShowOptions((prev) => !prev);
  };

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e) => {
      const newPos = {
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      };

      onMove(data.id, newPos);
      updateXarrow();
    };

    const handleMouseUp = () => setDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, onMove, data.id, updateXarrow]);

  return (
    <>
      <div
        id={`entity-${data.id}`}
        className="character-icon"
        style={{
          position: "absolute",
          left: `${data.position.x}px`,
          top: `${data.position.y}px`,
          width: "90px",
          height: "110px",
          cursor: dragging ? "grabbing" : "grab",
          zIndex: 10,
        }}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
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
