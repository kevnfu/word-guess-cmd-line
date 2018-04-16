let Word = require('./Word.js');
let fs = require('fs');
let inquirer = require('inquirer');
let lines;

// load words
fs.readFile('words.txt', 'utf8', (err, data) => {
  lines = data.split('\n'); // store in global variable

  playGame();
});

// sets up game
function playGame() {
  let randomIndex = Math.floor(Math.random() * lines.length);
  let [word, def] = lines[randomIndex].split(' - ');

  word = new Word(word);
  console.log("Guess the word!");
  console.log("Definition:", def);
  
  guess(word);
}

// asks for letter guesses
function guess(word) {
  inquirer.prompt({
    type: 'input',
    name: 'character',
    message: word.toString(),
    validate: (value) => {
      if(/^[a-zA-Z]$/.test(value)) {
        return true;
      } else {
        return "Guess one letter.";
      }
    }
  }).then(answers => {
    word.guess(answers.character);
    if(!word.isSolved()) {
      guess(word);
    } else {
      // finished game!
      console.log(word.toString(), "solved!");
      playAgain(); // asks if user wants to play again
    }
  });
}

// asks if user wants to play again
function playAgain() {
  inquirer.prompt({
    type: 'confirm',
    name: 'again',
    message: 'Play again?',
    default: true
  }).then(answers => {
    if(answers.again) {
      playGame();
    }
  });
}