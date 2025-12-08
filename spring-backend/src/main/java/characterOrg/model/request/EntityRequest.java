package characterOrg.model.request;

import characterOrg.model.util.Position;

public class EntityRequest {
  private Position position;
  private String name;
  private String type;
  private String style;
  private String notes;

  public EntityRequest(Position position, String name, String type, String style, String notes) {
    this.position = position;
    this.name = name;
    this.type = type;
    this.style = style;
    this.notes = notes;
  }

  public EntityRequest() {}

  public void setNotes(String notes) {
    this.notes = notes;
  }

  public String getNotes() {
    return this.notes;
  }

  public void setStyle(String style) {
    this.style = style;
  }

  public String getStyle() {
    return this.style;
  }

  public Position getPosition() {
    return position;
  }

  public void setPos(Position position) {
    this.position = position;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getType() {
    return this.type;
  }
}
