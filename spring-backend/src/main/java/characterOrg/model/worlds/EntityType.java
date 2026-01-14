package characterOrg.model.worlds;

public interface EntityType {
  public String getType();

  public static EntityType setEntityType(String type) {
    switch(type.toLowerCase()) {
      case "character":
        return new Character();
      case "place":
        return new Place();
      default:
        throw new Error("Error: Type not found!");
    }
  }
}
