function getComputerChoice() {
    const valuesArr = ['Rock', 'Paper', 'Scissors'];
    const random = Math.floor(Math.random() * valuesArr.length);
    return valuesArr[random];
}

function playRound(computer, player) {
    const valuesArr = ['Rock', 'Paper', 'Scissors'];
    let compIn = valuesArr.indexOf(computer);
    let plyIn = valuesArr.indexOf(player[0].toUpperCase() + player.slice(1).toLowerCase());

    if(compIn == plyIn) {
        return "It's a tie!";
    } else if (compIn == 0 && plyIn == 2) {
        return "You Lose! Rock beats Scissors";
    } else if (plyIn == 0 && compIn == 2) {
        return "You Win! Rock beats Scissors"
    } else if (compIn > plyIn) {
        return `You Lose! ${valuesArr[compIn]} beats ${valuesArr[plyIn]}`;
    } else if (plyIn > compIn) {
        return `You Win! ${valuesArr[plyIn]} beats ${valuesArr[compIn]}`;
    }
}

function game() {
    let playerWin = 0;

    for(let i = 0; i < 5; i++){
        let player = "";
        while(player.length == 0)
            player = window.prompt("Enter your choice:", "");

        let computer = getComputerChoice();
        console.log("Player Selection: " + player);
        console.log("Computer Selection: " + computer);

        let result = playRound(computer, player);
        console.log(">> " + result);
        if(result.includes("You Win")){
            playerWin++;
        } else if(result.includes("tie")){
            i--;
        }
    }

    if(playerWin >= 3) {
        console.log("Congratulations! You win " + playerWin + " of 5 rounds");
    } else {
        console.log("Aww! You lost " + (5-playerWin) + " of 5 rounds");
    }
}

console.log("Welcome to Rock, Paper, Scissors game");
console.log("NOTE: Tied rounds are repeated");

game();
