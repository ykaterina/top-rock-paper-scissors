function getComputerChoice() {
    const valuesArr = ['Rock', 'Paper', 'Scissors'];
    const random = Math.floor(Math.random() * valuesArr.length);
   return valuesArr[random];
}

function getPlayerSelection(e) {
    e.target.classList.add('selected');
   return e.target.id;
}

function computerListener(comp){
    const comChoice = document.querySelector(`.computer #${comp.toLowerCase()}`);
    comChoice.classList.add('compSelected');
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

function displayScore(roundResult){
    if(roundResult.includes("You Win")){
        playerWin++;
        player.textContent = `${playerWin}`;
        if(playerWin === 5){
            gameOver("Hurray! You won 5 times!");
        }
    } else if(roundResult.includes("You Lose")){
        computerWin++;
        computer.textContent = `${computerWin}`;
        if(computerWin === 5){
            gameOver("Oh dear, Computer won 5 times...");
        }
    }
}

function gameOver(text) {
    const body = document.querySelector('body');
    const overlay = document.createElement('div');
    const popup = document.createElement('div');
    const header = document.createElement('h2');
    const content = document.createElement('span');
    const resetBtn = document.createElement('button');
    
    overlay.style.cssText = "position: relative; position: fixed; top: 0; right: 0; bottom: 0;"
                            + "left: 0; background: rgba(0,0,0,.8);";
    popup.style.cssText = "display: flex; flex-direction: column; align-items: center; justify-content: space-between;"
                            + "width: 40%; height: 30%; background: #F5F5DC; border-radius: 20px; position: absolute;"
                            + "top: 0; right: 0; bottom: 0px; left: 0; margin: auto; font-size: 24px; padding: 10px;"
                            + "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;";
    resetBtn.style.cssText = "font-size: 18px; margin: 10px; width: 100px; padding: 5px 10px; background: #FFE4E1; border-radius: 5px;"
    header.textContent = "GAME OVER";
    content.textContent = text;
    resetBtn.textContent = "RESET";
    resetBtn.setAttribute("id", "reset");
    popup.appendChild(header);
    popup.appendChild(content);
    popup.appendChild(resetBtn);
    overlay.appendChild(popup);
    body.appendChild(overlay);
    
    choices.forEach(choice=> choice.setAttribute('disabled', true));
    resetBtn.addEventListener('click', function(){
        playerWin = 0;
        computerWin = 0;
        player.textContent = `${playerWin}`;
        computer.textContent = `${computerWin}`;
        const results = document.querySelectorAll('.result');
        for(const result of results){
            result.parentNode.removeChild(result);
        }
        this.parentNode.removeChild(this);
        body.removeChild(overlay);
        choices.forEach(choice=> choice.removeAttribute("disabled"));
    });
}

function removeTransition(e) {
    if(e.propertyName !== 'transform') return;
    this.classList.remove('selected');
    this.classList.remove('compSelected');
}

let playerWin = 0;
let computerWin = 0;

const result = document.querySelector('.results')
const choices = document.querySelectorAll(".choice");
const playerside = document.querySelector(".player");
const computerside = document.querySelector(".computer");

const player = document.querySelector("#player");
const computer = document.querySelector("#computer");

choices.forEach(choice => 
    choice.addEventListener('transitionend', removeTransition),
);

window.addEventListener('click', function(e) {
    if(e.target.parentNode == null || e.target.parentNode.classList[0] !== "choices") return;
    else {
        const comp = getComputerChoice();
        const roundResult = playRound(comp, getPlayerSelection(e));
        const res = document.createElement('div');
        res.style.cssText = "text-align: center; font-size: 18px; padding: 10px;";

        res.classList.add('result');
        res.textContent = roundResult;
        result.appendChild(res);

        computerListener(comp);
        displayScore(roundResult);
    }
});
