package characterOrg.model.user;

import java.util.ArrayList;
import java.util.List;

public class Database {
  private List<User> users;
  private static Database instance;

  private Database() {
    this.users = new ArrayList<User>();
  }

  public static Database getDatabase() {
    if (instance == null) {
      return instance = new Database();
    }
    return instance;
  }

  public List<User> getUsers() {
    return this.users;
  }

  public void addNewUser(User u) {
    this.users.add(u);
  }

  public User getUser(String username) {
    return users.stream()
      .filter(u -> u.getUser() == username)
      .findFirst()
      .orElse(null);
  }

  public User getUser(int id) {
    return users.stream()
      .filter(u -> u.getId() == id)
      .findFirst()
      .orElse(null);
  }
}
