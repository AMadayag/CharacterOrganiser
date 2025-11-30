package CharacterOrg;

import CharacterOrg.util.Position;

public class Character extends Entity {
  private String nameFirst;
  private String nameLast;

  public Character(Position pos) {
    super(pos);
    this.nameFirst = "";
    this.nameLast = "";
  }

  public String getNameFirst() {
    return this.nameFirst;
  }

  public String getNameLast() {
    return this.nameLast;
  }

  public void addFirstName(String name) {
    this.nameFirst = name;
  }

  public void addLastName(String name) {
    this.nameLast = name;
  }
}