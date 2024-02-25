const playButton = document.querySelector('#start')
const maincontainer = document.querySelector('.maincontainer')
const yellow = document.querySelector('.yellow')
const blue = document.querySelector('.blue')
const red = document.querySelector('.red')
const green = document.querySelector('.green')
const scoreText = document.querySelector('#scorenumber')
const colors = ['yellow', 'blue', 'red', 'green']

let level = 0
let score = 0
let gamePattern = []
let userPattern = []

const startGame = async () => {
    gamePattern = []
    userPattern = []
    level = 0
    score = 0
    scoreText.innerText = score
    playSound('start')
    setTimeout(() => {
        nextSequence()
    }, 1000);
}

const nextSequence = () => {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = colors[randomNumber];
    gamePattern.push(randomChosenColour);
    
    animateColor(randomChosenColour);
}

const animateColor = (color) => {
    const button = document.querySelector(`.${color}`);
    switch (color) {
        case 'yellow':
            maincontainer.style.boxShadow = '0px 0px 60px rgba(255, 255, 0, 0.5)'
            button.style.backgroundColor = 'rgba(255, 255, 0, 0.5)';
            playSound('yellow')
            break;
        case 'blue':
            maincontainer.style.boxShadow = '0px 0px 60px rgba(0, 0, 255, 0.5)'
            button.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';
            playSound('blue')
            break;
        case 'red':
            maincontainer.style.boxShadow = '0px 0px 60px rgba(255, 0, 0, 0.5)'
            button.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
            playSound('red')
            break;
        case 'green':
            maincontainer.style.boxShadow = '0px 0px 60px rgba(0, 128, 0, 0.5)'
            button.style.backgroundColor = 'rgba(0, 128, 0, 0.5)';
            playSound('green')
            break;
        default:
            break;
    }
    setTimeout(() => {
        button.style.backgroundColor = '';
        maincontainer.style.boxShadow = ''
    }, 1000);
}

const checkAnswer = (currentLevel) => {
    if(gamePattern[currentLevel] === userPattern[currentLevel]){
        if(userPattern.length === gamePattern.length){
            score++
            level++
            userPattern = []
            scoreText.innerText = score
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
    }else{
        playSound('gameover')
        scoreText.innerText = 'Game over'
    }
}

const playSound = (color) => {
    let audio = new Audio('./sounds/' + color + '.mp3')
    audio.play()
}

const addColor = async (color) => {
    userPattern.push(color)
    checkAnswer(userPattern.length - 1)
}

yellow.addEventListener('click', () => {
    addColor('yellow')
    playSound('yellow')
})

blue.addEventListener('click', () => {
    addColor('blue')
    playSound('blue')
})

red.addEventListener('click', () => {
    addColor('red')
    playSound('red')
})

green.addEventListener('click', () => {
    addColor('green')
    playSound('green')
})

playButton.addEventListener('click', startGame)