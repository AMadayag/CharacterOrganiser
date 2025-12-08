package characterOrg.model;

public class Relationship {
  private Entity e1;
  private Entity e2;
  private String info = "";
  private int id = (int)(Math.random() * 1000);

  public Relationship(Entity e1, Entity e2) {
    this.e1 = e1;
    this.e2 = e2;
  }

  public int getId() {
    return this.id;
  }

  public Entity getE1() {
    return this.e1;
  }

  public Entity getE2() {
    return this.e2;
  }

  public String getInfo() {
    return this.info;
  }

  public void updateInfo(String info) {
    this.info = info;
  }

  public void updateE1(Entity e) {
    this.e1 = e;
  }

  public void updateE2(Entity e) {
    this.e2 = e;
  }
}
