function getComputerChoice() {
    const valuesArr = ['Rock', 'Paper', 'Scissors'];
    const random = Math.floor(Math.random() * valuesArr.length);
   return valuesArr[random];
}

function getPlayerSelection(e) {
    e.target.style.width = '180px';
    e.target.style.height = '180px';
   return e.target.id;
}

function playRound(computer, player) {
    const valuesArr = ['Rock', 'Paper', 'Scissors'];
    let computerIndex = valuesArr.indexOf(computer);
    let playerIndex = valuesArr.indexOf(player[0].toUpperCase() + player.slice(1).toLowerCase());

    if(computerIndex == playerIndex) {
        return "It's a tie!";
    } else if (computerIndex == 0 && playerIndex == 2) {
        return "You Lose! Rock beats Scissors";
    } else if (playerIndex == 0 && computerIndex == 2) {
        return "You Win! Rock beats Scissors"
    } else if (computerIndex > playerIndex) {
        return `You Lose! ${valuesArr[computerIndex]} beats ${valuesArr[playerIndex]}`;
    } else if (playerIndex > computerIndex) {
        return `You Win! ${valuesArr[playerIndex]} beats ${valuesArr[computerIndex]}`;
    }
}

function reset(){
    const resetDiv = document.createElement('div');
    const resetBtn = document.createElement('button');
    const body = document.querySelector('body');

    resetBtn.textContent = "RESET";
    resetDiv.appendChild(resetBtn);
    body.appendChild(resetDiv);

    resetBtn.addEventListener('click', function(e){
        playerWin = 0;
        computerWin = 0;
        player.textContent = `Player: ${playerWin}`;
        computer.textContent = `Computer: ${computerWin}`;
        const results = document.querySelectorAll('.result');
        for(const result of results){
            result.parentNode.removeChild(result);
        }
        this.parentNode.removeChild(this);
        choices.forEach(choice => choice.disabled = false);
    });
}

function gameOver(text) {
    const winner = document.createElement('div');
    winner.textContent = text;
    winner.classList.add('result');
    result.appendChild(winner);
    choices.forEach(choice => choice.disabled = true);
    reset();
}

let playerWin = 0;
let computerWin = 0;

const result = document.querySelector('.results')
const choices = document.querySelectorAll(".choice");
const score = document.querySelectorAll(".score");
const player = document.querySelector("#player");
const computer = document.querySelector("#computer");

choices.forEach(choice => choice.addEventListener('click', function(e) {
    const roundResult = playRound(getComputerChoice(), getPlayerSelection(e));
    const res = document.createElement('div');
    res.style.cssText = "text-align: center; font-size: 24px";

    res.classList.add('result');
    res.textContent = roundResult;
    result.appendChild(res);

    if(roundResult.includes("You Win")){
        playerWin++;
        player.textContent = `Player: ${playerWin}`;
        score.appendChild(player);
        if(playerWin === 5){
            gameOver("Hurray! You won 5 times!");
        }
    } else if(roundResult.includes("You Lose")){
        computerWin++;
        computer.textContent = `Computer: ${computerWin}`;
        score.appendChild(computer);
        if(computerWin === 5){
            gameOver("Oh dear, Computer won 5 times...");
        }
    }
}));