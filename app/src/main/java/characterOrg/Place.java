package characterOrg;

import characterOrg.util.Position;

public class Place extends Entity {
  private String name;

  public Place(Position pos) {
    super(pos);
    this.name = "";
  }

  public String getName() {
    return this.name;
  }

  public void addName(String name) {
    this.name = name;
  }
}
