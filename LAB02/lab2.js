const prompt = require('prompt');

prompt.start();
console.log('Welcome to Rock, Paper, Scissors!');

promptUser();

function promptUser() {
    var playerChoice = '';
    var aiChoice = '';
    // Prompt user for input
    console.log('Please enter your choice: Rock, Paper, or Scissors.');
    prompt.get(['answer'], function (err, result) {
        if (err) { return onErr(err); }
        playerChoice = result.answer;
        aiChoice = rpsRandom();
        playerChoice = processUserRes(playerChoice);
        processPlays(playerChoice, aiChoice);
    });
}

function onErr(err) {
    console.log(err);
    return 1;
}

function processPlays(playerChoice, aiChoice) {
    if ((aiChoice + 1) % 3 == playerChoice){
        console.log("You win!");
    }
    else if(playerChoice == aiChoice){
        console.log("It's a tie!");
    }
    else {
        console.log("You lost!");
    }
}

function processUserRes(response) {
    if (response === 'Paper') {
        console.log("Player Chose Paper");
        return 1; // Paper
    } else if (response === 'Scissors') {
        console.log("Player Chose Scissors");
        return 2; // Scissors
    } else if (response === 'Rock'){
        console.log("Player Chose Rock");
        return 0; // Rock
    }
}

function rpsRandom() {
  const aiTurn = Math.random();
    if (aiTurn < 0.34) {
        console.log("Ai Chose Paper");
        return 1; // Paper
    } else if (aiTurn <= 0.67) {
        console.log("Ai Chose Scissors");
        return 2; // Scissors
    } else {
        console.log("Ai Chose Rock");
        return 0; // Rock
    }
}