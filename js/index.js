window.onload = () => {
    //PlayerClass
    class Player{
        constructor(){
            this.img = ``
            this.width = 100
            this.height = 100
            this.x = 0
            this.y = (ctx.canvas.height/3)*2
        }
        drawSelf(){
            ctx.drawImage(loadedImages.player, this.x, this.y, this.width, this.height)
          }
    
        moveUp(){
            this.y -= 10
          }
    
        moveDown(){
            this.y += 10
          }
        
      }

      //EnemyClass
      class Enemy{
        constructor(){ 
        this.img = ``
        this.width = 50
        this.height = 50
        this.x = ctx.canvas.width-75
        this.y = 175 + enemySeparation
        }
        drawSelf(){
            ctx.drawImage(loadedImages.enemy, this.x, this.y, this.width, this.height)
        }
    }
    

    //Variables
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    let gameOver = false
    let loadedAllImages = false
    const loadedImages = {}
    const listOfUrls = {player: '/images/Player.png', enemy: '/images/Enemy2.png', playerSpell: `/images/playerSpell.png`, enemySpell: `/images/enemySpell.png` }
    let counterForLoadedImages = 0
    let backgroundMusic;
    let enemyHitAudio;
    let playerHitAudio;
    let winnerAudio;
    let loserAudio;
    let playerShotAudio;
    let enemySeparation = 0
    const arrayOfEnemies = []
    const player = new Player()
    let counter = 0

//DOM

document.getElementById('start').onclick = () => {
    startGame();
  };

  document.getElementById('mute').onclick = () => {
    muteMusic();
  };

document.addEventListener('keydown', (event)=>{
    if(event.key === 'w'){
        player.moveUp()
    } else if(event.key === 's'){
        player.moveDown()
}
})

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
    backgroundMusic.loop = true
    backgroundMusic.volume = 0.2
    backgroundMusic.muted = false
    
    playerHitAudio = new Audio('/sounds/PlayerHit.mp3')
    enemyHitAudio = new Audio('/sounds/EnemyHit.mp3')
    playerShotAudio = new Audio('/sounds/PlayerShot.mp3')
    winnerAudio = new Audio('/sounds/Winner.mp3')
    loserAudio = new Audio('/sounds/Loser.mp3')
  }

const clearCanvas = ()=>{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    }
const drawPlayer = ()=>{
    player.drawSelf()
      }
const createEnemies = ()=>{
    
    if(counter !== 5){
        const enemy = new Enemy()
        arrayOfEnemies.push(enemy)
        counter++
        enemySeparation += 260/5
        
    }
}
const drawEnemies = ()=>{
    arrayOfEnemies.forEach((enemy)=>{
      enemy.drawSelf()
    })
}
const checkForBoundaries = ()=>{
  if (player.y > 383){
      player.y = 383
  }
  if (player.y < 124){
      player.y = 124
  }
}
const muteMusic = ()=>{
  if (backgroundMusic.muted===false){
    backgroundMusic.muted = true
  } else {backgroundMusic.muted = false}
  
}

const updateCanvas = ()=>{
    if(loadedAllImages){
      clearCanvas()
      drawPlayer()
      createEnemies()
      drawEnemies()
      console.log(backgroundMusic.muted)
      /* console.log(player.y) */
      checkForBoundaries()
      /* checkCollision() */
     /*  renderScore() */
    }
    requestAnimationFrame(updateCanvas)
  }
}