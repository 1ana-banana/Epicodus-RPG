import Item from  "./item";
import { MonsterClass } from "./class";

export default class Monster {
  constructor(name, level, monClass, itemDrops) {
    this.name = name;
    this.monClass = monClass;
    this.itemDrops = itemDrops;
    this.level = level;

    for (let i = 1; i < level; i++) {
      this.monClass.LevelUp();
    }

    this.hp = monClass.str + 30;
  }

  GetDrops() {
    let drops = this.itemDrops.concat([]);
    drops.push(Math.floor(Math.random() * this.level * 10 ) + (10 * this.level));
    return drops;
  }

  static CreateMonster(level) {
    const numDrops = Math.floor(Math.random() * 4);
    let drops = [];
    for (let i = 0; i < numDrops; i++) {
      drops.push(Item.CreateItem(level));
    }

    return new Monster(monsterNames[Math.floor(Math.random() * 14)], level, new MonsterClass(), drops);
  }
}

const monsterNames = [
  "Sam the French Baguette Rider",
  "Rodger the Menance",
  "Diana the Careful Master",
  "Ana the Joyful Racer",
  "Baron Calamari",
  "Emperor Squid",
  "Fishy fish on a scooter"
];