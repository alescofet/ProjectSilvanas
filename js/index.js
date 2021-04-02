//Variables
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let gameOver = false
let loadedAllImages = false
const loadedImages = {}
const listOfUrls = {road: 'images/road.png', car: 'images/car.png'}
let counterForLoadedImages = 0
let backgroundMusic;
let enemyHitAudio;
let playerHitAudio;
let winnerAudio;
let loserAudio;
let playerShotAudio;
const arrayOfEnemies = []
const player = new Player()

//DOM

/* document.getElementById('startBtn').onclick = () => {
    startGame();
  };

document.addEventListener('keydown', (event)=>{
    if(event.key === 'w'){
        player.moveUp()
    } else if(event.key === 's'){
        player.moveDown()
}
}) */

//Game logic

const startGame = ()=>{
    loadImages()
    loadAudios()
    backgroundMusic.play()
    updateCanvas()
  }

const loadImages = ()=>{
    for(let key in listOfUrls){
        const img = new Image()
        img.src = listOfUrls[key]
        img.onload = ()=>{
            counterForLoadedImages++
            loadedImages[key] = img
            if(counterForLoadedImages === Object.keys(listOfUrls).length){
                loadedAllImages = true
            }
        }
    }
}

const loadAudios = ()=>{
    backgroundMusic = new Audio('/sounds/BackgroundMusic.mp3')
    backgroundAudio.loop = true
    
    playerHitAudio = new Audio('/sounds/PlayerHit.mp3')
    enemyHitAudio = new Audio('/sounds/EnemyHit.mp3')
    playerShotAudio = new Audio('/sounds/PlayerShot.mp3')
    winnerAudio = new Audio('/sounds/Winner.mp3')
    loserAudio = new Audio('/sounds/Loser.mp3')
  }

const clearCanvas = ()=>{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    }