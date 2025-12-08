package characterOrg.model.request;

public class RelationshipRequest {
  private int rId;
  private int id1;
  private int id2;
  private String info;

  public RelationshipRequest(int rId, int id1, int id2, String info) {
    this.rId = rId;
    this.id1 = id1;
    this.id2 = id2;
    this.info = info;
  }

  public void addRId(int id) {
    this.rId = id;
  }

  public int getRId() {
    return this.rId;
  }

  public void addInfo(String info) {
    this.info = info;
  }

  public String getInfo() {
    return this.info;
  }

  public void addId1(int i) {
    this.id1 = i;
  }

  public void addId2(int i) {
    this.id2 = i;
  }

  public int getId1() {
    return this.id1;
  }

  public int getId2() {
    return this.id2;
  }
}
