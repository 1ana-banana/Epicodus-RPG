import Item from "../src/js/item.js";
import Character from "./../src/js/character.js";
import { Honda } from "../src/js/class.js";

describe("character", () => {
  let character;
  beforeEach(() => {
    character = new Character("test", new Honda());
  });
  
  test("It should return a new object with the given properties and correct hp", () => {
    expect(character.name).toEqual("test");
    expect(character.charClass).toEqual(new Honda());
    expect(character.hp).toEqual(60);
  });

  test("It should increase hp based on level up stats", () => {
    character.LevelUp();
    expect(character.hp).toEqual(65);
  });
});