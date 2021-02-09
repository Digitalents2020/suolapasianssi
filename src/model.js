export class Card {
  constructor(symbol, oxidation) {
    this.symbol = symbol;
    this.oxidation = oxidation;
  }
}

export class Salt {
  constructor() {
    this.cards = [];
  }

  get oxidation() {
    return this.cards.map((x) => x.oxidation).reduce((a, b) => a + b, 0);
  }
}

export class Game {
  constructor() {
    let deck = [
      ...Array(6).fill(["Na", 1]),
      ...Array(6).fill(["K", 1]),
      ...Array(6).fill(["Cl", -1]),
      ...Array(6).fill(["F", -1]),

      ...Array(3).fill(["Ca", 2]),
      ...Array(3).fill(["Mg", 2]),
      ...Array(3).fill(["O", -2]),
      ...Array(3).fill(["S", -2]),

      ...Array(2).fill(["Al", 3]),
      ...Array(2).fill(["N", -3]),
    ];

    deck = deck.map(([symbol, oxidation]) => [
      new Card(symbol, oxidation),
      Math.random() * 6969,
    ]);

    deck.sort((a, b) => a[1] - b[1]);
    deck = deck.map((x) => x[0]);

    this.hand = deck.splice(0, 5);
    this.deck = deck.splice(5);
    this.table = [];
    this.compounds = [];
    this.salts = new Set();

    this.score = 0;

    console.log(this);
  }

  addCardFromDeck() {
    if (this.table.length + this.hand.length < 8 && this.deck.length !== 0) {
      const anions = this.hand.map((x) => x.oxidation).filter((x) => x < 0);
      const cations = this.hand.map((x) => x.oxidation).filter((x) => x > 0);

      if (anions.length === 0 || cations.length === 0) {
        let needed;

        if (anions.length === 0) {
          needed = cations.map((x) => -x);
        } else if (cations.length === 0) {
          needed = anions.map((x) => -x);
        }

        for (let i = 0; i < this.deck.length; ++i) {
          if (needed.includes(this.deck[i].oxidation)) {
            const tmp = this.deck[0];
            this.deck[0] = this.deck[i];
            this.deck[i] = tmp;
            console.log("swapped", i);
            break;
          }
        }
      }

      this.hand.push(this.deck.shift());
    }
  }

  moveCardToTable(index) {
    this.table.push(this.hand.splice(index, 1)[0]);
  }

  moveCardToHand(index) {
    this.hand.push(this.table.splice(index, 1)[0]);
  }

  gotSalt() {
    const oxidation = this.table
      .map((x) => x.oxidation)
      .reduce((a, b) => a + b, 0);
    console.log(oxidation);
    if (this.table.length === 0) {
      return false;
    }
    return oxidation === 0;
  }

  takeSalt() {
    this.compounds.push(this.table);

    const things = new Set(this.table.map((x) => x.symbol));

    let newScore = Math.round(100 / (things.size - 1));

    this.table.sort((a, b) => b.oxidation - a.oxidation);

    let name = this.table
      .map((x) => x.symbol)
      .reduce((a, c) => {
        if (a.includes(c)) {
          return a;
        }
        return [...a, c];
      }, [])
      .join("");

    console.log("lmao", name);

    if (!this.salts.has(name)) {
      this.salts.add(name);
      newScore *= 1.5;
      console.log("new discovery");
    }

    newScore = Math.round(newScore);
    console.log("+" + newScore);

    this.score += newScore;

    this.table = [];

    while (this.hand.length < 5 && this.deck.length !== 0) {
      this.addCardFromDeck();
    }
  }
}
