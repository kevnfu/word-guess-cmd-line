let Letter = require('./Letter.js');

class Word {
  constructor(word) {
    this.letters = word.split('').map(c => new Letter(c));
  }

  toString() {
    return this.letters
        .map(l => l.toString())
        .reduce((a,b) => a + b);
  }

  guess(c) {
    this.letters.forEach(l => l.check(c));
  }

  isSolved() {
    return this.letters.every(l => l.guessed);
  }
}

module.exports = Word;