package CharacterOrganiser.app.src.main.java.characterOrg;

import CharacterOrganiser.app.src.main.java.util.Position;

public class Entity {
  private String notes;
  private Position position;

  public Entity(Position pos) {
    this.notes = "";
    this.position = pos;
  }

  public Position getPosition() {
    return this.position;
  }

  public void updatePosition(Position pos) {
    this.position = pos;
  }

  public void addNotes(String notes) {
    this.notes = notes;
  }

  public String getNotes() {
    return this.notes;
  }
}
