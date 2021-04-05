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
      this.x += 5;
    }
  }
  //enemySpellClass
  class EnemySpell {
    constructor() {
      this.img = ``;
      this.width = 15;
      this.height = 15;
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
      this.x -= 5;
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
  //Variables
  let animationFrame = true;
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let gameOver = false;
  let winner = false;
  let loadedAllImages = false;
  const loadedImages = {};
  const listOfUrls = {
    player: "/images/Playerfixed.png",
    enemy: "/images/Enemy2fixed.png",
    playerSpell: `/images/playerSpell.png`,
    enemySpell: `/images/enemySpell.png`,
    avatar: `/images/avatar.png`,
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
  const player = new Player();
  const avatar = new Avatar();
  const healthBar = new HealthBar();
  let counter = 0;
  let playerSpellCounter = 0;
  let enemySpellCounter = 0;
  let score = 0;

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
    backgroundMusic = new Audio("/sounds/BackgroundMusic.mp3");
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.2;
    backgroundMusic.muted = false;

    playerHitAudio = new Audio("/sounds/PlayerHit.mp3");
    enemyHitAudio = new Audio("/sounds/EnemyHit.mp3");
    playerShotAudio = new Audio("/sounds/PlayerShot.mp3");
    playerShotAudio.volume = 0.2;
    winnerAudio = new Audio("/sounds/Winner.mp3");
    loserAudio = new Audio("/sounds/Loser.mp3");
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
  const createEnemies = () => {
    if (counter !== 5) {
      const enemy = new Enemy();
      arrayOfEnemies.push(enemy);
      counter++;
      enemySeparation += 260 / 5;
    }
  };
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
      if (enemySpellCounter >= Math.random() * 50 + 20) {
        const enemySpell = new EnemySpell();
        enemySpell.x = enemy.x;
        enemySpell.y = enemy.y + enemy.height / 2;
        arrayOfEnemySpells.push(enemySpell);
        enemySpellCounter = 0;
      }
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
            arrayOfEnemies.splice(index, 1);
            score++;
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
  const checkEnemies = () => {
    if (arrayOfEnemies.length === 0) {
      winner = true;
    }
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
        checkForBoundaries();
        drawPlayerSpell();
        movePlayerSpell();
        checkPlayerSpellCollision();
        enemySpellCounter++;
        createEnemySpell();
        drawEnemySpell();
        moveEnemySpell();
        checkEnemySpellCollision();
        checkEnemies();
        /*  renderScore() */
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
};
