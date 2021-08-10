// Create variables for the game state
let player1Score = 0
let player2Score = 0
let player1Turn = true

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")

let diceShuffle = setTimeout(shuffleDice, 75)

function shuffleDice() {
    if (player1Turn) {
        const roll = rollDice()
        player1Dice.style.backgroundImage = `url('img/${roll}.svg')`
    } else {
        const roll = rollDice()
        player2Dice.style.backgroundImage = `url('img/${roll}.svg')`
    }
    diceShuffle = setTimeout(shuffleDice, 75)
}

function rollDice() {
    const randomNumber = Math.floor(Math.random() * 6) + 1
    return randomNumber
}

function showResetButton() {
    rollBtn.style.display = "none"
    resetBtn.style.display = "block"
    clearTimeout(diceShuffle)
}

/* Hook up a click event listener to the Roll Dice Button. */
 rollBtn.addEventListener("click", function() {
    const roll = rollDice()

    if (player1Turn) {
        player1Score += roll
        player1Scoreboard.textContent = player1Score
        player1Dice.style.backgroundImage = `url('img/${roll}.svg')`
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
        message.textContent = "Player 2 Turn"
    } else {
        player2Score += roll
        player2Scoreboard.textContent = player2Score
        player2Dice.style.backgroundImage = `url('img/${roll}.svg')`
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        message.textContent = "Player 1 Turn"
    }
    
    if(player1Score >= 20 || player2Score >= 20) {
        if(player1Turn) {
            if(player1Score - player2Score > 6) {
                message.textContent = "Player 1 Won 🥳"
                showResetButton()
            }
        } else {
            if(player1Score > player2Score) {
                message.textContent = "Player 1 Won 🥳"
                showResetButton()
            } else if (player2Score > player1Score) {
                message.textContent = "Player 2 Won 🎉"
                showResetButton()
            } else {
                message.textContent = "Tie Game 👀"
                showResetButton()
            }
        }
    }
    player1Turn = !player1Turn
})
 
resetBtn.addEventListener("click", function(){
    reset()
})

function reset() {
    player1Score = 0
    player2Score = 0
    player1Turn = true
    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0
    player1Dice.style.backgroundImage = `url('img/1.svg')`
    player2Dice.style.backgroundImage = `url('img/1.svg')`
    message.textContent = "Player 1 Turn"
    resetBtn.style.display = "none"
    rollBtn.style.display = "block"
    player2Dice.classList.remove("active")
    player1Dice.classList.add("active")
    diceShuffle = setTimeout(shuffleDice, 75)
}
