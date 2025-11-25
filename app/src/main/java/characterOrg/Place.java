package CharacterOrganiser.app.src.main.java.characterOrg;

import java.util.ArrayList;
import java.util.List;

import CharacterOrganiser.app.src.main.java.util.Position;

public class Place extends Entity {
  private String name;
  private List<Character> characters;

  public Place(Position pos) {
    super(pos);
    this.name = "";
    this.characters = new ArrayList<Character>();
  }

  public String getName() {
    return this.name;
  }

  public void addName(String name) {
    this.name = name;
  }

  public void addCharacter(Character character) {
    this.characters.add(character);
  }

  public void removeCharacter(Character character) {
    this.characters.remove(character);
  }
}
