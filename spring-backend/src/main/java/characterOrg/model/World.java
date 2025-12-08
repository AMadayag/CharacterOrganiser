package characterOrg.model;

import java.util.ArrayList;
import java.util.List;

import characterOrg.model.util.Position;

public class World {
  private String name;
  private List<Entity> entities;
  private List<Relationship> relationships;

  public World() {
    this.entities = new ArrayList<Entity>();
    this.name = "New World";
  }

  public Entity getEntityFromId(int id) {
    for (Entity e : this.entities) {
      if (e.getId() == id) {
        return e;
      }
    }
    return null;
  }

  public List<Entity> getEntities() {
    return this.entities;
  }

  public List<Relationship> getRelationships() {
    return this.relationships;
  }

  public void addRelationship(Entity e1, Entity e2) {
    e1.addRelative(e2.getId());
    e2.addRelative(e1.getId());

    Relationship newR = new Relationship(e1, e2);
    this.relationships.add(newR);
  }

  public Relationship getRelationshipFromId(int id) {
    for (Relationship r : relationships) {
      if (r.getId() == id) {
        return r;
      }
    }
    return null;
  }

  public void removeRelationship(Relationship r) {
    Entity e1 = r.getE1();
    Entity e2 = r.getE2();

    e1.removeRelative(e2.getId());
    e2.removeRelative(e1.getId());

    this.relationships.add(r);
  }

  public String getName() {
    return this.name;
  }

  public void addName(String name) {
    this.name = name;
  }

  public Entity addEntity(Position pos, String name, String type) {
    Entity newPlace = new Entity(pos, name, type);
    this.entities.add(newPlace);

    return newPlace;
  }

  public void removePlace(Entity place) {
    this.entities.remove(place);
  }

  public void removeCharacter(Entity character) {
    this.entities.remove(character);
  }
}