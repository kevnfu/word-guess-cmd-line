class Letter {
  constructor(character) {
    this.character = character;
    this.guessed = false;
  }

  toString() {
    return this.guessed ? this.character : '_';
  }

  check(character) {
    if(character === this.character) {
      this.guessed = true;
    }
  }
}

module.exports = Letter;