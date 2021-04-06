window.onload = () => {
  //PlayerClass
  class Player {
    constructor() {
      this.img = ``;
      this.width = 30;
      this.height = 45;
      this.x = 0;
      this.y = 175 + (260 / 5) * 2;
      this.health = 5;
    }
    drawSelf() {
      ctx.drawImage(
        loadedImages.player,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    moveUp() {
      this.y -= 260 / 5;
    }

    moveDown() {
      this.y += 260 / 5;
    }
  }

  //EnemyClass
  class Enemy {
    constructor() {
      this.img = ``;
      this.width = 30;
      this.height = 45;
      this.x = ctx.canvas.width - 75;
      this.y = 175 + enemySeparation;
      this.health = 1;
    }
    drawSelf() {
      ctx.drawImage(
        loadedImages.enemy,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }
  //EnemyClass
  class Enemy2 {
    constructor() {
      this.img = ``;
      this.width = 30;
      this.height = 45;
      this.x = ctx.canvas.width - 75;
      this.y = 175 + enemySeparation;
      this.health = 2;
    }
    drawSelf() {
      ctx.drawImage(
        loadedImages.enemy2,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }
  //EnemyClass
  class Enemy3 {
    constructor() {
      this.img = ``;
      this.width = 155;
      this.height = 260;
      this.x = ctx.canvas.width - 160;
      this.y = 175;
      this.health = 10;
    }
    drawSelf() {
      ctx.drawImage(
        loadedImages.enemy3,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }
  //playerSpellClass
  class PlayerSpell {
    constructor() {
      this.img = ``;
      this.width = 15;
      this.height = 15;
      this.x = player.x + player.width;
      this.y = player.y + player.height / 2;
    }
    drawSelf() {
      ctx.drawImage(
        loadedImages.playerSpell,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    moveSelf() {
      if(checkHz<90){
      this.x += 5;}
      else{this.x +=2.5}
    }
  }
  //enemySpellClass
  class EnemySpell {
    constructor() {
      this.img = ``;
      this.width = 20;
      this.height = 20;
      this.x = 0;
      this.y = 0;
    }
    drawSelf() {
      ctx.drawImage(
        loadedImages.enemySpell,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    moveSelf() {
      if(checkHz<90){
      this.x -= 5;}
      else{this.x -=2.5}
    }
  }
  class EnemySpell2 {
    constructor() {
      this.img = ``;
      this.width = 15;
      this.height = 15;
      this.x = 0;
      this.y = 0;
    }
    drawSelf() {
      ctx.drawImage(
        loadedImages.enemySpell2,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    moveSelf() {
      if(checkHz<90){
      this.x -= 5;}
      else{this.x -=2.5}
    }
  }
  class EnemySpell3 {
    constructor() {
      this.img = ``;
      this.width = 15;
      this.height = 15;
      this.x = 0;
      this.y = 0;
    }
    drawSelf() {
      ctx.drawImage(
        loadedImages.enemySpell3,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    moveSelf() {
      if(checkHz<90){
      this.x -= 5;}
      else{this.x -=2.5}
    }
  }
  
  //Health Bar
  class HealthBar {
    constructor() {
      this.maxHealth = 5;
      this.x = 80;
      this.y = 10;
      this.maxWidth = 200;
      this.height = 35;
      this.health = this.maxHealth;
    }
    setHealth() {
      this.health = player.health;
    }
    drawSelf() {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.maxWidth, this.height);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      let width = this.maxWidth * (this.health / this.maxHealth);
      ctx.rect(this.x, this.y, width, this.height);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();
    }
  }
  class BossHealthBar {
    constructor() {
      this.maxHealth = 10;
      this.maxWidth = 200;
      this.height = 35;
      this.health = this.maxHealth;
      this.x = ctx.canvas.width-this.maxWidth-50-30;
      this.y = 10;
    }
    setHealth() {
      this.health = bossHealth;
    }
    drawSelf() {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.maxWidth, this.height);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      let width = this.maxWidth * (this.health / this.maxHealth);
      ctx.rect(this.x, this.y, width, this.height);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();
    }
  }

  //Avatar
  class Avatar {
    constructor() {
      this.img = ``;
      this.width = 50;
      this.height = 50;
      this.x = 10;
      this.y = 10;
    }
    drawSelf() {
      ctx.drawImage(
        loadedImages.avatar,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }
  class AvatarBoss {
    constructor() {
      this.img = ``;
      this.width = 50;
      this.height = 50;
      this.x = ctx.canvas.width - 60;
      this.y = 10;
    }
    drawSelf() {
      ctx.drawImage(
        loadedImages.avatarBoss,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }
  //Variables
  let animationFrame = true;
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let gameOver = false;
  let winner = false;
  let loadedAllImages = false;
  const loadedImages = {};
  const listOfUrls = {
    player: "./images/Playerfixed.png",
    enemy: "./images/Enemy1.png",
    enemy2:"./images/Enemy2.png",
    enemy3:"./images/Enemy3.png",
    playerSpell: "./images/playerSpell.png",
    enemySpell: "./images/enemySpell.png",
    enemySpell2: "./images/enemySpell2.png",
    enemySpell3: "./images/enemySpell3.png",
    avatar: "./images/avatar.png",
    avatarBoss: "./images/avatarBoss.png"
  };
  let counterForLoadedImages = 0;
  let backgroundMusic;
  let enemyHitAudio;
  let playerHitAudio;
  let winnerAudio;
  let loserAudio;
  let playerShotAudio;
  let enemySeparation = 0;
  const arrayOfEnemies = [];
  const arrayOfPlayerSpells = [];
  const arrayOfEnemySpells = [];
  let bossHealth = 10
  const player = new Player();
  const avatar = new Avatar();
  const healthBar = new HealthBar();
  const avatarBoss = new AvatarBoss()
  const bossHealthBar = new BossHealthBar()
  let counterRound1 = 0;
  let counterRound2 = 0;
  let counterRound3 = 0;
  let playerSpellCounter = 0;
  let enemySpellCounter = 0;
  let round = 0
  let checkHz = 0

  //DOM

  document.getElementById("start").onclick = () => {
    startGame();
    document.getElementById("start").classList.add(`noHover`);
  };

  document.getElementById("mute").onclick = () => {
    muteMusic();
  };

  document.addEventListener("keydown", (event) => {
    if (event.key === "w") {
      player.moveUp();
    } else if (event.key === "s") {
      player.moveDown();
    }
  });

  //Game logic

  const startGame = () => {
    loadImages();
    loadAudios();
    backgroundMusic.play();
    updateCanvas();
  };

  const loadImages = () => {
    for (let key in listOfUrls) {
      const img = new Image();
      img.src = listOfUrls[key];
      img.onload = () => {
        counterForLoadedImages++;
        loadedImages[key] = img;
        if (counterForLoadedImages === Object.keys(listOfUrls).length) {
          loadedAllImages = true;
        }
      };
    }
  };

  const loadAudios = () => {
    backgroundMusic = new Audio("./sounds/BackgroundMusic.mp3");
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.2;
    backgroundMusic.muted = false;

    playerHitAudio = new Audio("./sounds/PlayerHit.mp3");
    enemyHitAudio = new Audio("./sounds/EnemyHit.mp3");
    playerShotAudio = new Audio("./sounds/PlayerShot.mp3");
    playerShotAudio.volume = 0.2;
    winnerAudio = new Audio("./sounds/Winner.mp3");
    loserAudio = new Audio("./sounds/Loser.mp3");
  };

  const clearCanvas = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };
  const drawPlayer = () => {
    player.drawSelf();
  };
  const drawAvatar = () => {
    avatar.drawSelf();
  };
  const drawHealthBar = () => {
    healthBar.drawSelf();
  };
  const drawBossAvatar=()=>{
    if (round === 2){
      avatarBoss.drawSelf()
    }
  }
  const drawBossHealthBar = () => {
    if (round === 2){
      bossHealthBar.setHealth()
      bossHealthBar.drawSelf();
    }
  };
  const createEnemies = () => {
    if(round ===0){
      if (counterRound1 !== 5) {
      const enemy = new Enemy();
      arrayOfEnemies.push(enemy);
      counterRound1++;
      enemySeparation += 260 / 5;
    }
  }else if(round === 1){
    if (counterRound2 !== 5) {
      const enemy2 = new Enemy2();
      arrayOfEnemies.push(enemy2);
      counterRound2++;
      enemySeparation += 260 / 5;
    }
  }else if(round === 2){
    if (counterRound3 !== 1) {
    const enemy3 = new Enemy3();
      arrayOfEnemies.push(enemy3);
      counterRound3++;
  }}
}
  const drawEnemies = () => {
    arrayOfEnemies.forEach((enemy) => {
      enemy.drawSelf();
    });
  };
  document.addEventListener("keydown", (event) => {
    if (event.key === "p") {
      createplayerSpell();
    }
  });
  const createplayerSpell = () => {
    if (playerSpellCounter >= 50) {
      const playerSpell = new PlayerSpell();
      arrayOfPlayerSpells.push(playerSpell);
      playerSpellCounter = 0;
      playerShotAudio.play();
    }
  };
  const drawPlayerSpell = () => {
    arrayOfPlayerSpells.forEach((spell) => {
      spell.drawSelf();
    });
  };
  const movePlayerSpell = () => {
    arrayOfPlayerSpells.forEach((spell) => {
      spell.moveSelf();
    });
  };
  const createEnemySpell = () => {
    arrayOfEnemies.forEach((enemy) => {
      if(round === 0)
      {if (enemySpellCounter >= Math.random() * 50 + (25-round*2)) {
        const enemySpell = new EnemySpell();
        enemySpell.x = enemy.x;
        enemySpell.y = enemy.y + enemy.height / 2;
        arrayOfEnemySpells.push(enemySpell);
        enemySpellCounter = 0;
      }}
      if(round === 1)
      {if (enemySpellCounter >= Math.random() * 50 + (25-round*1.5)) {
        const enemySpell2 = new EnemySpell2();
        enemySpell2.x = enemy.x;
        enemySpell2.y = enemy.y + enemy.height / 2;
        arrayOfEnemySpells.push(enemySpell2);
        enemySpellCounter = 0;
      }}
      if(round === 2)
      {if (enemySpellCounter >= Math.random() * 50 + (20-round*2)) {
        const enemySpell3 = new EnemySpell3();
        enemySpell3.x = enemy.x;
        enemySpell3.y = (Math.random()*(430-175)+175);
        arrayOfEnemySpells.push(enemySpell3);
        enemySpellCounter = 0;
      }}
    });
  };
  const drawEnemySpell = () => {
    arrayOfEnemySpells.forEach((spell) => {
      spell.drawSelf();
    });
  };
  const moveEnemySpell = () => {
    arrayOfEnemySpells.forEach((spell) => {
      spell.moveSelf();
    });
  };
  const checkForBoundaries = () => {
    if (player.y > 430) {
      player.y = 430;
    }
    if (player.y < 175) {
      player.y = 175;
    }
  };
  const muteMusic = () => {
    if (backgroundMusic.muted === false) {
      backgroundMusic.muted = true;
    } else {
      backgroundMusic.muted = false;
    }
  };
  const checkPlayerSpellCollision = () => {
    arrayOfPlayerSpells.forEach((spell) => {
      arrayOfEnemies.forEach((enemy, index) => {
        if (spell.x + spell.width === enemy.x) {
          if (
            (spell.y <= enemy.y + enemy.height && spell.y >= enemy.y) ||
            (spell.y + spell.height <= enemy.y + enemy.height &&
              spell.y + spell.height >= enemy.y)
          ) {
            enemyHitAudio.play();
            enemy.health -= 1
            if (round === 2){bossHealth--};
          }
        }
      });
    });
  };
  const checkEnemySpellCollision = () => {
    arrayOfEnemySpells.forEach((spell) => {
      if (spell.x === player.x + player.width) {
        if (
          (spell.y <= player.y + player.height && spell.y >= player.y) ||
          (spell.y + spell.height <= player.y + player.height &&
            spell.y + spell.height >= player.y)
        ) {
          playerHitAudio.play();
          player.health -= 1;
        }
      }
    });
  };
  const checkHealth = () => {
    if (player.health === 0) {
      gameOver = true;
    }
  };
  const checkEnemyHealth = ()=>{
    arrayOfEnemies.forEach((enemy,index)=>{
      if (enemy.health === 0){
        arrayOfEnemies.splice(index,1)
      }
    })
  }
  const checkEnemies = () => {
    if (arrayOfEnemies.length === 0) {
      round++
      enemySeparation = 0
    }
    if (round === 3){winner=true}
  };
  const changeButton = () => {
    document.getElementById("start").innerText = `Restart`;
    document.getElementById("start").classList.remove(`noHover`);
    document.getElementById("start").onclick = () => {
      location.reload();
    };
  };

  const gameLost = () => {
    backgroundMusic.pause();
    loserAudio.play();
    ctx.fillStyle = `rgba(0, 0, 0, 0.7)`;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = `white`;
    ctx.font = `5rem TitleFont`;
    ctx.textAlign = `center`;
    ctx.textBaseline = `middle`;
    ctx.fillText(`Game Over`, ctx.canvas.width / 2, ctx.canvas.height / 2);
    animationFrame = false;
    changeButton();
  };
  const gameWon = () => {
    backgroundMusic.pause();
    winnerAudio.play();
    ctx.fillStyle = `rgba(0, 0, 0, 0.7)`;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = `white`;
    ctx.font = `5rem TitleFont`;
    ctx.textAlign = `center`;
    ctx.textBaseline = `middle`;
    ctx.fillText(`You won!!`, ctx.canvas.width / 2, ctx.canvas.height / 2);
    animationFrame = false;
    changeButton();
  };

  const updateCanvas = () => {
    if (loadedAllImages) {
      if (!gameOver && !winner) {
        playerSpellCounter++;
        clearCanvas();
        drawPlayer();
        drawAvatar();
        checkHealth();
        healthBar.setHealth();
        drawHealthBar();
        createEnemies();
        drawEnemies();
        drawBossAvatar()
        drawBossHealthBar()
        checkEnemies();
        checkForBoundaries();
        drawPlayerSpell();
        movePlayerSpell();
        checkPlayerSpellCollision();
        enemySpellCounter++;
        createEnemySpell();
        drawEnemySpell();
        moveEnemySpell();
        checkEnemySpellCollision();
        checkEnemyHealth();
      } else if (gameOver) {
        gameLost();
      } else if (winner) {
        gameWon();
      }
    }
    if (animationFrame) {
      requestAnimationFrame(updateCanvas);
    }
  };
  
  function getScreenRefreshRate(callback, runIndefinitely){
    let requestId = null;
    let callbackTriggered = false;
    runIndefinitely = runIndefinitely || false;
    
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;
    }
    
    let DOMHighResTimeStampCollection = [];
    
    let triggerAnimation = function(DOMHighResTimeStamp){
      DOMHighResTimeStampCollection.unshift(DOMHighResTimeStamp);
      
      if (DOMHighResTimeStampCollection.length > 10) {
        let t0 = DOMHighResTimeStampCollection.pop();
        let fps = Math.floor(1000 * 10 / (DOMHighResTimeStamp - t0));
        
        if(!callbackTriggered){
          callback.call(undefined, fps, DOMHighResTimeStampCollection);
        }
        
        if(runIndefinitely){
          callbackTriggered = false;
        }else{
          callbackTriggered = true;
        }
      }
      
      requestId = window.requestAnimationFrame(triggerAnimation);
    };
  
  window.requestAnimationFrame(triggerAnimation);
  
  // Deténgase después de medio segundo si no debería ejecutarse indefinidamente
  if(!runIndefinitely){
    window.setTimeout(function(){
      window.cancelAnimationFrame(requestId);
      requestId = null;
    }, 500);
  }
}

getScreenRefreshRate(function(FPS){
  checkHz = FPS
console.log(`${checkHz} fps`)});
  
};