package characterOrg.model.worlds;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Relative {

  @JsonIgnore
  private Entity entity;

  private String info = "";

  public Relative(Entity e) {
    this.entity = e;
  }

  public Entity getEntity() {
    return this.entity;
  }

  @JsonProperty("entity")
  public EntityStub getEntityStub() {
    return new EntityStub(entity.getId(), entity.getName());
  }

  public String getInfo() {
    return info;
  }

  public void updateInfo(String s) {
    this.info = s;
  }

  static class EntityStub {
    public int id;
    public String name;

    public EntityStub(int id, String name) {
      this.id = id;
      this.name = name;
    }
  }
}
