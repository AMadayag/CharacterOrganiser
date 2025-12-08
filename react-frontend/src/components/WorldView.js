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

  useEffect(() => {
    if (entities.length > 0) {
      // Small delay to ensure DOM elements are rendered
      setTimeout(() => {
        setArrowsReady(true);
      }, 0);
    }
  }, [entities]);  

  const loadWorld = async () => {
    const res = await fetch("http://localhost:8080/api/world");
    const data = await res.json();

    // console.log("World data:", data);
    // console.log("Entities:", data.entities);
    // console.log("Relationships:", data.relationships);

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

    await fetch(`http://localhost:3000/characters/${id}/name`, {
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
            const startEl = document.getElementById(`entity-${rel.e1.id}`);
            const endEl = document.getElementById(`entity-${rel.e2.id}`);
            
            console.log("Arrow debug:", {
              relId: rel.id,
              startId: `entity-${rel.e1.id}`,
              endId: `entity-${rel.e2.id}`,
              startEl: startEl,
              endEl: endEl,
              startRect: startEl?.getBoundingClientRect(),
              endRect: endEl?.getBoundingClientRect()
            });
            
            return (
              <Xarrow
                key={rel.id}
                start={`entity-${rel.e1.id}`}
                end={`entity-${rel.e2.id}`}
                strokeWidth={2}
                color="black"
                showHead={false}
                label={rel.info}
              />
            );
          })}
        </div>
      </Xwrapper>
    </div>
  );  
}
