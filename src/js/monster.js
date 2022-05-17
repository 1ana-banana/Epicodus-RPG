import Item from  "./item";
import { MonsterClass } from "./class";

export default class Monster {
  constructor(name, level, monClass, itemDrops) {
    this.name = name;
    this.monClass = monClass;
    this.itemDrops = itemDrops;
    this.level = level;
  }
}