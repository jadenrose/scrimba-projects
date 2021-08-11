// game options
const gridWidth = 60 // vw
const gridMaxWidth = 600 // px

let selectedDifficulty = 'normal'
let game
let width

function getGameProps() {
    // difficulty levels
    const levels = {
        easy: {
            tiles: 10,
            initSpeed: 1000,
            speedMult: 0.95
        },
        normal: {
            tiles: 14,
            initSpeed: 900,
            speedMult: 0.9
        },
        hard: {
            tiles: 20,
            initSpeed: 600,
            speedMult: 0.85
        }
    }

    const difficulty = levels[selectedDifficulty] 
    const rowTiles = difficulty.tiles
    const speedMult = difficulty.speedMult
    const interval = difficulty.initSpeed

    const tileWidth = gridWidth / rowTiles
    const tileMaxWidth = gridMaxWidth / rowTiles

    // set css variables
    document.documentElement.style.setProperty('--grid-width', `${gridWidth}vw`)
    document.documentElement.style.setProperty('--grid-height', `${gridWidth}vw`)
    document.documentElement.style.setProperty('--grid-max-width', `${gridMaxWidth}px`)
    document.documentElement.style.setProperty('--grid-max-height', `${gridMaxWidth}px`)

    document.documentElement.style.setProperty('--tile-width', `${tileWidth}vw`)
    document.documentElement.style.setProperty('--tile-height', `${tileWidth}vw`)
    document.documentElement.style.setProperty('--tile-max-width', `${tileMaxWidth}px`)
    document.documentElement.style.setProperty('--tile-max-height', `${tileMaxWidth}px`)

    return {
        width: rowTiles,
        speed: interval,
        mult: speedMult
    }
}

// grab DOM elements
const grid = document.querySelector('.grid')
const startBtn = document.getElementById('start')
const resetBtn = document.getElementById('reset')
const easyBtn = document.getElementById('easy')
const normalBtn = document.getElementById('normal')
const hardBtn = document.getElementById('hard')
const scoreDisplay = document.getElementById('score-display')

easyBtn.addEventListener('click', function(){
    selectedDifficulty = 'easy'
    renderDiff()
    renderGame()
})
normalBtn.addEventListener('click', function(){
    selectedDifficulty = 'normal'
    renderDiff()
    renderGame()
})
hardBtn.addEventListener('click', function(){
    selectedDifficulty = 'hard'
    renderDiff()
    renderGame()
})

// listen for buttons
startBtn.addEventListener('click', function() {
    renderGame()
    initGame()
})
resetBtn.addEventListener('click', function() {
    renderGame()
})

// declare game variables in global scope
let score = 0
let worm = []
let tiles = []
let timerId = 0
let direction = 1

// initialise game state
renderGame()

function renderGame() {
    clearInterval(timerId)
    grid.classList.remove('game-over')
    grid.innerHTML = null
    score = 0
    tiles = []
    direction = 1
    game = getGameProps()
    width = game.width
    interval = game.speed
    mult = game.mult
    renderDiff()
    renderScore()
    worm = [width+3, width+2, width+1]
    createGrid()
    renderWorm()
}

function initGame() {
    clearInterval(timerId)
    timerId = setInterval(move, interval)
    generateApple()
}

function renderDiff() {
    document.querySelectorAll('.diff').forEach(btn => 
        btn.classList.remove('active')
    )
    document.getElementById(selectedDifficulty).classList.add('active')
}

function renderScore() {
    scoreDisplay.textContent = score
}

// create grid
function createGrid() {
    for(let i=0; i<width*width; i++) {
        const tile = document.createElement('div')
        tile.classList.add('tile')
        grid.appendChild(tile)
        tiles.push(tile)
    }
}

// render worm
function renderWorm() {
    worm.forEach(index => {
        tiles[index].classList.add('worm')
    })

    const newHead = tiles[worm[0]]

    let dirClass = 'right'
    switch (direction) {
        case -width:
            dirClass = 'up'
            break
        case 1:
            dirClass = 'right'
            break
        case width:
            dirClass = 'down'
            break
        case -1:
            dirClass = 'left'
            break
    }

    newHead.classList.add('head', dirClass)
    
    const newTail = tiles[worm[worm.length-1]]
    newTail.classList.add('tail')
}

// move worm
function move() {
    const dead = checkGameOver()

    
    
    if (!dead) {
        tiles[worm[0]].classList.remove('head')
        worm.unshift(worm[0] + direction)
        const tail = worm.pop()
        tiles[tail].classList.remove('worm', 'head', 'tail', 'up', 'right', 'down', 'left')
        
        if(checkEatApple()) {
            worm.push(tail)
        }
        renderWorm()
    }
}

// key listeners
document.addEventListener('keydown', registerInput)

function registerInput(e) {
    const keyPress = e.key
    switch (keyPress) {
        case 'w':
        case 'ArrowUp':
            direction = -width
            break
        case 'd':
        case 'ArrowRight':
            direction = 1
            break
        case 's':
        case 'ArrowDown':
            direction = width
            break
        case 'a':
        case 'ArrowLeft':
            direction = -1
            break
    }
}

// apple
function generateApple() {
    let randomNumber
    do {
        randomNumber = Math.floor(Math.random() * width*width)
    } while (tiles[randomNumber].classList.contains('worm'))

    tiles[randomNumber].classList.add('apple')
}
function checkEatApple() {
    if(tiles[worm[0]].classList.contains('apple')) {
        tiles[worm[0]].classList.remove('apple')
        score++
        renderScore()
        generateApple()
        interval *= mult
        clearInterval(timerId)
        timerId = setInterval(move, interval)
        
        return true
    }
}

// game over
function checkGameOver() {
    if (
        // hit top
        (worm[0] - width < 0 && direction === -width) ||
        // hit right
        (worm[0] % width === (width-1) && direction === 1) ||
        // hit bottom
        (worm[0] + width >= width*width && direction === width) ||
        // hit left
        (worm[0] % width === 0 && direction === -1) ||
        tiles[worm[0] + direction].classList.contains('worm')
    ) {
        gameOver()
        return true
    }
}

function gameOver() {
    clearInterval(timerId)
    grid.classList.add('game-over')
}
