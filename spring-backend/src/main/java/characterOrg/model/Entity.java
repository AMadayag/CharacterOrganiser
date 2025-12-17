package characterOrg.model;

import java.util.ArrayList;
import java.util.List;

import characterOrg.model.util.Colour;
import characterOrg.model.util.Position;

public class Entity {
  private int id = (int)(Math.random() * 1000);
  private String name;
  private String notes = "";
  private Position position;
  private Colour colour = Colour.BLACK;
  private EntityType type;
  private String style = "Default";
  private List<Relative> relatives = new ArrayList<Relative>();

  public Entity(Position pos, String name, String type) {
    this.name = name;
    this.position = pos;
    this.type = EntityType.setEntityType(type);
  }

  public List<Relative> getRelatives() {
    return this.relatives;
  }

  public void addRelative(Entity e) {
    if (e.equals(this)) {
      return;
    }
    Relative r = new Relative(e);
    this.relatives.add(r);
  }

  public void removeRelative(int r) {
    this.relatives.remove(r);
  }

  public int getId() {
    return this.id;
  }

  public String getStyle() {
    return this.style;
  }

  public void setStyle(String style) {
    this.style = style;
  }

  public void setType(String type) {
    this.type = EntityType.setEntityType(type);
  }

  public String getType() {
    return this.type.getType();
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Colour getColour() {
    return this.colour;
  }
 
  public void changeColour(Colour colour) {
    this.colour = colour;
  }

  public Position getPosition() {
    return this.position;
  }

  public void updatePosition(Position pos) {
    this.position = pos;
  }

  public void updateNotes(String notes) {
    this.notes = notes;
  }

  public String getNotes() {
    return this.notes;
  }

  public Relative getRelativeFromId(int id) {
    for (Relative rel : this.relatives) {
      if (rel.getEntity().getId() == id) {
        return rel;
      }
    }
    return null;
  }
}