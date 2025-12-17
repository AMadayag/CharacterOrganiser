import { useState, useRef } from "react";
import CharacterOptions from "./CharacterOptions";
import { iconStyle } from "./iconOverlays";

export default function CharacterIcon({
  data,
  onStyleChange,
  onMove,
  onNameChange,
  onNotesChange,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const iconRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    
    setIsDragging(true);
    const rect = iconRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const container = iconRef.current.parentElement;
    const containerRect = container.getBoundingClientRect();

    const newX = e.clientX - containerRect.left - dragOffset.x;
    const newY = e.clientY - containerRect.top - dragOffset.y;

    onMove(data.id, { x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (e) => {
    if (!isDragging) {
      setShowOptions(!showOptions);
    }
  };

  const position = data.position || { x: 0, y: 0 };
  const style = iconStyle[data.style] || iconStyle.Default;

  return (
    <>
      <div
        id={`entity-${data.id}`}
        ref={iconRef}
        className="character-icon"
        style={{
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: "150px",
          height: "150px",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onDoubleClick={handleClick}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {/* Base image */}
          <img
            src="/images/characterIcon/CharacterIconBust.png"
            alt={data.name}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "contain",
              pointerEvents: "none",
            }}
          />
          
          {/* Overlays */}
          {style && (
            <img
              src={style}
              alt="base overlay"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "contain",
                pointerEvents: "none",
              }}
            />
          )}
        </div>
        
        <div
          style={{
            position: "absolute",
            bottom: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "14px",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            background: "rgba(255,255,255,0.9)",
            padding: "2px 6px",
            borderRadius: "3px",
          }}
        >
          {data.name}
        </div>
      </div>

      {showOptions && (
        <CharacterOptions
          data={data}
          position={position}
          onStyleChange={onStyleChange}
          onNameChange={onNameChange}
          onNotesChange={onNotesChange}
        />
      )}
    </>
  );
}