package characterOrg.model.user;

import java.util.ArrayList;
import java.util.List;

import characterOrg.model.worlds.World;

public class User {
  private List<World> worlds = new ArrayList<World>();
  private int id = (int)(Math.random() * 1000);
  private String user;
  private String pwd;

  public User(String user, String pwd) {
    this.user = user;
    this.pwd = pwd;
  }

  public void addWorld(World w) {
    this.worlds.add(w);
  }

  public void deleteWorld(World w) {
    this.worlds.remove(w);
  }

  public List<World> getWorlds() {
    return this.worlds;
  }

  public int getId() {
    return this.id;
  }

  public String getUser() {
    return this.user;
  }

  public String getPwd() {
    return this.pwd;
  }
}
