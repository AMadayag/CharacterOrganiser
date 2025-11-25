package CharacterOrganiser.app.src.main.java.characterOrg;

import java.util.ArrayList;
import java.util.List;

import CharacterOrganiser.app.src.main.java.util.Position;

public class World {
  private List<Entity> entities;

  public World() {
    this.entities = new ArrayList<Entity>();
  }

  public Character addCharacter(Position pos) {
    Character newCharacter = new Character(pos);
    this.entities.add(newCharacter);

    return newCharacter;
  }

  public Place addPlace(Position pos) {
    Place newPlace = new Place(pos);
    this.entities.add(newPlace);

    return newPlace;
  }

  public void removePlace(Place place) {
    this.entities.remove(place);
  }

  public void removeCharacter(Character character) {
    this.entities.remove(character);
  }
}
