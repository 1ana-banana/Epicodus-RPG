export default class Item {
  constructor (name, str, dex, int, value) {
    this.name = name;
    this.str = str;
    this.dex = dex;
    this.int = int;
    this.value = value;
  }

  ToString() {
    return `${this.name}: [str: ${this.str}, dex: ${this.dex}, int: ${this.int}] ${this.value * 1.5} RevBucks`;
  }

  static CreateItem(level) {
    let focus = Math.floor(Math.random() * 3 );
    let str = 0;
    let dex = 0;
    let int = 0;
    let className = "";

    switch (focus) {
      case 0: 
        str = Math.floor((Math.random() * 5) + level * 2 + 3);
        dex = Math.floor((Math.random() * 5) + level + 1);
        int = Math.floor((Math.random() * 3));
        className += weaponNames.class.honda[Math.floor(Math.random() * 4)];
        break;
      case 1: 
        str = Math.floor((Math.random() * 5) + level + 1);
        dex = Math.floor((Math.random() * 5) + level * 2 + 3);
        int = Math.floor((Math.random() * 3));
        className += weaponNames.class.suzuki[Math.floor(Math.random() * 4)];
        break;
      case 2:
        str = Math.floor((Math.random() * 3));
        dex = Math.floor((Math.random() * 5) + level + 1);
        int = Math.floor((Math.random() * 5) + level * 2 + 3);
        className += weaponNames.class.ducati[Math.floor(Math.random() * 4)];
        break;
      case 3:
        str = Math.floor((Math.random() * 5));
        dex = Math.floor((Math.random() * 3) + level + 1);
        int = Math.floor((Math.random() * 5) + level * 2 + 3);
        className += weaponNames.class.triumph[Math.floor(Math.random() * 4)];
        break;
      
    }

    let name = weaponNames.prefix[Math.floor(Math.random() * 9)] + " " + className + " of " + weaponNames.suffix[Math.floor(Math.random() * 8)];

    return new Item(name, str, dex, int, 10 * level);
  }
}

const weaponNames = {
  "class": {
    "honda": [
      "keyfob",
      "fender eliminator",
      "exhaust",
    ],
    "suzuki" : [
      "keychain",
      "bar end mirror",
      "axle protector"
    ],
    "ducati" : [
      "desmo valve",
      "red helmet",
      "oil pan"
    ],
    "triumph" : [
      "tophat",
      "mustache tattoo",
      "comfort seat"
    ]
  },
  "prefix": [
    "shiny",
    "leaking",
    "OEM",
    "aftermarket",
    "second-hand",
    "HP Boost",
    "Torqueboosting",
    "Extra loud"
  ],
  "suffix" : [
    "destruction",
    "snobbery",
    "chaos",
    "slipperiness",
    "speed",
    "noise"
  ]
};