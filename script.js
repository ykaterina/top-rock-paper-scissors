function getComputerChoice() {
    const valuesArr = ['Rock', 'Paper', 'Scissors'];
    const random = Math.floor(Math.random() * valuesArr.length);
    return valuesArr[random];
}

console.log(getComputerChoice());