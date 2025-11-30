package com.CharacterOrg;

import java.util.ArrayList;
import java.util.List;

import com.CharacterOrg.util.Colour;
import com.CharacterOrg.util.Position;

public class Entity {
  private String notes;
  private Position position;
  private List<Character> characterConnections;
  private List<Place> placeConnections;
  private Colour textColour;
  private Colour fillColour;

  public Entity(Position pos) {
    this.notes = "";
    this.position = pos;
    this.characterConnections = new ArrayList<Character>();
    this.placeConnections = new ArrayList<Place>();
    this.textColour = Colour.BLACK;
    this.fillColour = Colour.WHITE;
  }

  public Colour getTextColour() {
    return this.textColour;
  }

  public Colour getFillColour() {
    return this.fillColour;
  }
 
  public void changeTextColour(Colour colour) {
    this.textColour = colour;
  }

  public void changeFillColour(Colour colour) {
    this.fillColour = colour;
  }

  public void addPlace(Place place) {
    this.placeConnections.add(place);
  }

  public void removePlace(Place place) {
    this.placeConnections.remove(place);
  }

  public void addCharacter(Character character) {
    this.characterConnections.add(character);
  }

  public void removeCharacter(Character character) {
    this.characterConnections.remove(character);
  }

  public Position getPosition() {
    return this.position;
  }

  public void updatePosition(Position pos) {
    this.position = pos;
  }

  public void addNotes(String notes) {
    this.notes = notes;
  }

  public String getNotes() {
    return this.notes;
  }
}