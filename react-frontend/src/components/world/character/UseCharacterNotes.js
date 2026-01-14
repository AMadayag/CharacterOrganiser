import { useState, useEffect } from "react";

export function useCharacterNotes(entityId, onNotesChange) {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!entityId) return;

    const fetchNotes = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/world/entity/${entityId}/notes`
        );
        const text = await res.text();
        setNotes(text);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [entityId]);

  const updateNotes = (newNotes) => {
    setNotes(newNotes);
    onNotesChange(entityId, newNotes);
  };

  return { notes, updateNotes };
}
