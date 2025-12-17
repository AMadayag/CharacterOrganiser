import { useState, useEffect } from "react";
import CharacterForm from "./CharacterForm";
import CharacterIcon from "./CharacterIcon";
import "./CharacterIcon.css";
import RelationshipForm from "./RelationshipForm";
import Xarrow, { Xwrapper } from "react-xarrows";

export default function WorldView() {
  const [world, setWorld] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showRelForm, setShowRelForm] = useState(false);
  const [entities, setEntities] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [arrowsReady, setArrowsReady] = useState(false);
  const [editingRelId, setEditingRelId] = useState(null);
  const [editingRelInfo, setEditingRelInfo] = useState("");

  useEffect(() => {
    if (entities.length > 0) {
      setTimeout(() => {
        setArrowsReady(true);
      }, 0);
    }
  }, [entities]);  

  const loadWorld = async () => {
    const res = await fetch("http://localhost:8080/api/world");
    const data = await res.json();

    setWorld(data);
    setEntities(data.entities);
    setRelationships(data.relationships);
  };

  const addCharacter = async (form) => {
    await fetch("http://localhost:8080/api/world/entity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pos: form.pos,
        name: form.name,
        type: "character",
        style: form.style,
      }),
    });

    setShowForm(false);
    loadWorld();
  };

  const saveNewEntityPos = async (id, pos) => {
    await fetch(`http://localhost:8080/api/world/entity/${id}/position`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        x: pos.x,
        y: pos.y,
      })
    });
  };

  const addRelationship = async (id1, id2) => {
    await fetch("http://localhost:8080/api/world/relationships", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id1, id2 }),
    });

    await loadWorld();
  };

  const updateRelationshipInfo = async (relId, newInfo) => {
    await fetch(`http://localhost:8080/api/world/relationships/${relId}/info`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ info: newInfo }),
    });

    setRelationships((prev) =>
      prev.map((rel) =>
        rel.id === relId ? { ...rel, info: newInfo } : rel
      )
    );
  };

  const handleStyleChange = async (id, newStyle) => {
    await fetch(`http://localhost:8080/api/world/entity/${id}/style`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ style: newStyle }),
    });

    setEntities((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, style: newStyle } : e
      )
    );
  };

  const handleNotesChange = async (id, newNotes) => {
    await fetch(`http://localhost:8080/api/world/entity/${id}/notes`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: newNotes }),
    });
  };

  const handleNameChange = async (id, newName) => {
    setEntities((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name: newName } : c))
    );

    await fetch(`http://localhost:8080/api/world/entity/${id}/name`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
  };

  const handleCharacterMove = (id, newPosition) => {
    setEntities((prev) =>
      prev.map((entity) =>
        entity.id === id
          ? { ...entity, position: newPosition }
          : entity
      )
    );
  
    saveNewEntityPos(id, newPosition);
  };

  const handleArrowDoubleClick = (rel) => {
    setEditingRelId(rel.id);
    setEditingRelInfo(rel.info || "");
  };

  const handleRelInfoSubmit = () => {
    if (editingRelId) {
      updateRelationshipInfo(editingRelId, editingRelInfo);
      setEditingRelId(null);
      setEditingRelInfo("");
    }
  };

  const handleRelInfoCancel = () => {
    setEditingRelId(null);
    setEditingRelInfo("");
  };

  useEffect(() => {
    loadWorld();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>World: {world?.name}</h1>
      <button onClick={() => setShowForm(true)}>Add Character</button>
  
      {showForm && (
        <CharacterForm
          onSubmit={addCharacter}
          onClose={() => setShowForm(false)}
        />
      )}
  
      <button onClick={() => setShowRelForm(true)}>Add Relationship</button>
  
      {showRelForm && (
        <RelationshipForm
          onSubmit={addRelationship}
          onClose={() => setShowRelForm(false)}
          entities={entities}
        />
      )}

      {editingRelId && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            zIndex: 10000,
          }}
        >
          <h3>Edit Relationship</h3>
          <input
            type="text"
            value={editingRelInfo}
            onChange={(e) => setEditingRelInfo(e.target.value)}
            placeholder="Relationship info..."
            style={{ width: "100%", marginBottom: "10px" }}
            autoFocus
          />
          <button onClick={handleRelInfoSubmit}>Save</button>
          <button onClick={handleRelInfoCancel} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        </div>
      )}
  
      <Xwrapper>
        <div 
          className="entity-list"
          style={{
            position: "relative",
            width: "100%",
            minHeight: "600px"
          }}
        >
          {entities?.map((entity) => {
            if (entity.type === "character") {
              return (
                <CharacterIcon
                  key={entity.id}
                  data={entity}
                  onStyleChange={handleStyleChange}
                  onMove={handleCharacterMove}
                  onNameChange={handleNameChange}
                  onNotesChange={handleNotesChange}
                />
              );
            }
            return null;
          })}
          
          {arrowsReady && relationships?.map((rel) => {            
            return (
              <Xarrow
                key={rel.id}
                start={`entity-${rel.e1.id}`}
                end={`entity-${rel.e2.id}`}
                strokeWidth={2}
                color="black"
                showHead={false}
                label={{
                  middle: (
                    <div
                      onDoubleClick={(e) => {
                        e.stopPropagation();
                        handleArrowDoubleClick(rel);
                      }}
                      style={{
                        background: "white",
                        padding: "6px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        border: "2px solid #333",
                        fontSize: "14px",
                        fontWeight: "bold",
                        minWidth: "80px",
                        textAlign: "center",
                        userSelect: "none",
                      }}
                      title="Double-click to edit"
                    >
                      {rel.info || "Double-click to edit"}
                    </div>
                  ),
                }}
              />
            );
          })}
        </div>
      </Xwrapper>
    </div>
  );  
}