package characterOrg.model.util;

public class Position {
  int x;
  int y;

  public Position(int x, int y) {
    this.x = x;
    this.y = y;
  }

  public void setX(int newX) {
    this.x = newX;
  }

  public void setY(int newY) {
    this.y = newY;
  }

  public int getX() {
    return this.x;
  }

  public int getY() {
    return this.y;
  }
}