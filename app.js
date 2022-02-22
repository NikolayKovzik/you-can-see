const CANVAS = document.getElementById('canvas');
const CANVAS_CONTEXT = canvas.getContext('2d');

CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight;

const SCALE_COEF = 30; //24
const VELOCITY_COEF_X = 150; //273
const VELOCITY_COEF_Y = 150; //450
const ROTATION_COEF = 0.3;
const ENEMY_SPAWN_SPEED = 800; //800
const IMMORTALITY_TIME = 2000;
const ENEMY_FIRE_SPEED_MAX = 6500;
const ENEMY_FIRE_SPEED_MIN = 7500;
let allowBulletCreation = true;
let allowEnemyCreation = true;
let isImmortal = false;
let isGamePaused = false;
let isGameFinished = false;
const heartImage = new Image();
const diamondImage = new Image();
heartImage.src = './assets/img/heart.png';
diamondImage.src = './assets/img/diamond.png';
const keyMonitor = {
  'a': { pressed: false },
  'd': { pressed: false },
  'w': { pressed: false },
  's': { pressed: false },
  'ArrowLeft': { pressed: false },
  'ArrowRight': { pressed: false },
  'ArrowUp': { pressed: false },
  'ArrowDown': { pressed: false },
  ' ': { pressed: false },
}

function random(min, max) {
  return min + Math.random() * (max - min);
}

function clearCanvas(){
  invaders.splice(0,invaders.length);
  playerBullets.splice(0,playerBullets.length);
  invaderBullets.splice(0,invaderBullets.length);
  allowBulletCreation = true;
  allowEnemyCreation = true;
  isImmortal = false;
  isGamePaused = false;
  isGameFinished = false;
  player = null;
  player = new Player();
}

function updateDashboard() {
  CANVAS_CONTEXT.drawImage(heartImage, CANVAS.width / (SCALE_COEF * 4), CANVAS.width / (SCALE_COEF * 4), CANVAS.width / SCALE_COEF, CANVAS.width / SCALE_COEF);
  CANVAS_CONTEXT.drawImage(diamondImage, (CANVAS.width * 3) / SCALE_COEF, CANVAS.width / (SCALE_COEF * 4), CANVAS.width / SCALE_COEF, CANVAS.width / SCALE_COEF);
  CANVAS_CONTEXT.font = "2.78vw Black Ops One";
  CANVAS_CONTEXT.fillStyle = "#fff";
  CANVAS_CONTEXT.fillText(`${(player.lives >= 0) ? player.lives : 0}`, (CANVAS.width * 1.5) / SCALE_COEF, CANVAS.width / SCALE_COEF);
  CANVAS_CONTEXT.fillText(`${player.points}`, (CANVAS.width * 4.3) / SCALE_COEF, CANVAS.width / SCALE_COEF);
  if(isGameFinished){
     CANVAS_CONTEXT.font = "4.78vw Black Ops One";
     CANVAS_CONTEXT.fillText(`GAME OVER`, CANVAS.width/2-CANVAS.width/6, CANVAS.height/2);
     CANVAS_CONTEXT.fillText(`Your Score: ${player.points}`, CANVAS.width/2-CANVAS.width/6, CANVAS.height/1.5);
  } 
}

class Player {
  constructor() {
    const playerImage = new Image();
    playerImage.src = './assets/img/spaceship.png';
    this.image = playerImage;
    this.lives = 5;
    this.points = 0;
    this.width = CANVAS.width / SCALE_COEF;
    this.height = CANVAS.width / SCALE_COEF;
    this.rotation = 0;
    this.cooldownTimer = 300;
    this.position = {
      x: window.innerWidth / 2 - this.width / 2,
      y: window.innerHeight - this.height - 20,
    };
    this.velocity = {
      x: CANVAS.width / VELOCITY_COEF_X,
      y: CANVAS.height / VELOCITY_COEF_Y,
    };
  }

  draw() {
    CANVAS_CONTEXT.save(); //need for ship rotation
    CANVAS_CONTEXT.translate(player.position.x + player.width / 2, player.position.y + player.height / 2); //ship rotation
    CANVAS_CONTEXT.rotate(this.rotation); //ship rotation
    CANVAS_CONTEXT.translate(-player.position.x - player.width / 2, -player.position.y - player.height / 2); //ship rotation back


    // CANVAS_CONTEXT.fillStyle = 'red';
    // CANVAS_CONTEXT.fillRect(this.position.x, this.position.y, this.width, this.height);
    CANVAS_CONTEXT.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    // console.log('PlayerWidth:' + this.width)
    // console.log('WindowInnerWidth:' +window.innerWidth)
    CANVAS_CONTEXT.restore(); //need for ship rotation
  }

  update() {
    if ((keyMonitor['a'].pressed || keyMonitor['ArrowLeft'].pressed) && player.position.x >= 0) {
      this.position.x -= this.velocity.x;
      this.rotation = -ROTATION_COEF;
    }
    if ((keyMonitor['d'].pressed || keyMonitor['ArrowRight'].pressed) && this.position.x <= CANVAS.width - this.width) {
      this.position.x += this.velocity.x;
      this.rotation = ROTATION_COEF;
    }
    if ((keyMonitor['w'].pressed || keyMonitor['ArrowUp'].pressed) && this.position.y >= 0) {
      this.position.y -= this.velocity.y;
    }
    if ((keyMonitor['s'].pressed || keyMonitor['ArrowDown'].pressed) && this.position.y <= CANVAS.height - this.height) {
      this.position.y += this.velocity.y;
    }
    this.draw();
    //  this.position.x += this.velocity.x;
  }
}



class Invader {
  constructor({ position }) {
    const invaderImage = new Image();
    invaderImage.src = './assets/img/invader.png';
    this.image = invaderImage;
    this.width = CANVAS.width / SCALE_COEF;
    this.height = CANVAS.width / SCALE_COEF;
    this.allowFire = true;
    this.cooldownTimer = 100;
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.velocity = {
      x: CANVAS.width / VELOCITY_COEF_X,
      y: CANVAS.height / (VELOCITY_COEF_Y * 4),
    };
  }

  draw() {
    CANVAS_CONTEXT.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    // console.log('InvaderWidth:' + this.width)
  }

  update() {
    if (true) {
      this.position.y += this.velocity.y;
    }
    this.draw();
  }

  shoot(invBullets) {
    invBullets.push(new InvaderBullet({
      position: {
        x: this.position.x + this.width / 7,
        y: this.position.y + this.height,
      },
      velocity: {
        x: 0,
        y: CANVAS.height/125,  //5
      }
    }));
  }
}




class PlayerBullet {
  constructor({ position, velocity }) {
    const bulletImage = new Image();
    bulletImage.src = './assets/img/player-bullet.png';
    this.image = bulletImage;
    this.width = CANVAS.width / (SCALE_COEF * 2.5);
    this.height = CANVAS.width / (SCALE_COEF * 2.5);

    this.position = {
      x: position.x,
      y: position.y,
    };
    this.velocity = velocity;
  }

  draw() {
    CANVAS_CONTEXT.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    // CANVAS_CONTEXT.beginPath();
    // CANVAS_CONTEXT.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2);
    // CANVAS_CONTEXT.fillStyle = 'red';
    // CANVAS_CONTEXT.fill();
    // CANVAS_CONTEXT.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}



class InvaderBullet {
  constructor({ position, velocity }) {
    const bulletImage = new Image();
    bulletImage.src = './assets/img/invader-bullet.png';
    this.image = bulletImage;
    this.width = CANVAS.width / (SCALE_COEF * 1.5);
    this.height = CANVAS.width / (SCALE_COEF * 1.5);

    this.position = {
      x: position.x,
      y: position.y,
    };
    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };
  }

  draw() {
    CANVAS_CONTEXT.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}


let idAnimationFrame;

function animate() {
  // if(!isGamePaused && !isGameFinished){
  //   CANVAS_CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
  // }
  idAnimationFrame = requestAnimationFrame(animate);
  if (player && (player.lives <= 0)) {
    if(!isGamePaused && !isGameFinished){
      isGamePaused = true;
      isGameFinished = true; 
      CANVAS_CONTEXT.clearRect(0, 0, 100, 100);
      updateDashboard();
      setTimeout(()=>{isGamePaused = false}, 5000); 
    }

    if (!isGamePaused) {
      CANVAS_CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
      menu.classList.remove('invisible');
      clearCanvas();
      cancelAnimationFrame(idAnimationFrame);
      return;
    }

  } else if (!isGamePaused) {
    CANVAS_CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
    updateDashboard();
    player.update();
    if (keyMonitor[' '].pressed && allowBulletCreation == true) {
      allowBulletCreation = false;
      playerBullets.push(new PlayerBullet({
        position: {
          x: (player.position.x + player.width / 3),
          y: (player.position.y - 5)
        },
        velocity: {
          x: 0,
          y: -CANVAS.height/40,
        }
      }))
      setTimeout(() => { allowBulletCreation = true }, player.cooldownTimer)
    }


    invaderBullets.forEach((invaderBullet, index) => {
      if (invaderBullet.position.y >= CANVAS.height) {
        setTimeout(() => { invaderBullets.splice(index, 1) }, 0); // ST - prevent projectiles flashing (not nessesary?.. need to check)
      } else {
        invaderBullet.update();
      }

      if ((invaderBullet.position.y + invaderBullet.height >= player.position.y) &&
        (invaderBullet.position.x + invaderBullet.width / 2 >= player.position.x) &&
        (invaderBullet.position.y + invaderBullet.height <= player.position.y + player.height) &&
        (invaderBullet.position.x <= player.position.x + player.width / 2) && !isImmortal) {
        isImmortal = true;
        --player.lives;
        setTimeout(() => { isImmortal = false }, IMMORTALITY_TIME);
        setTimeout(() => { invaderBullets.splice(index, 1) }, 0);
      }
    });


    playerBullets.forEach((bullet, index) => {
      if (bullet.position.y <= 0) {
        setTimeout(() => { playerBullets.splice(index, 1) }, 0); // ST - prevent projectiles flashing (not nessesary?.. need to check)
      } else {
        bullet.update();
      }
    })


    invaders.forEach((invader, indexInv) => {
      if (invader.position.y >= CANVAS.height) {
        invaders.splice(indexInv, 1);
        player.points-=2;
      } else {
        playerBullets.forEach((bullet, indexBul) => {
          if ((bullet.position.y <= invader.position.y + invader.height) &&
            (bullet.position.x + bullet.width / 2 >= invader.position.x) &&
            (bullet.position.x - bullet.width / 2 <= invader.position.x + invader.width) &&
            (bullet.position.y + bullet.height / 2) >= invader.position.y) {
            // const invaderFound = invaders.find((invader2)=>invader2===invader);  // may be it unuseful, maybe not. need check on grid of invaders
            // const bulletFound = playerBullets.find((bullet2)=>bullet2===bullet); // may be it unuseful, maybe not. need check on grid of invaders
            // if(invaderFound && bulletFound) {                                    // may be it unuseful, maybe not. need check on grid of invaders
            player.points += 5;
            setTimeout(() => { invaders.splice(indexInv, 1) }, 0); // ST - prevent invaders flashing (not nessesary?.. need to check)
            setTimeout(() => { playerBullets.splice(indexBul, 1) }, 0); // ST - prevent projectiles flashing (not nessesary?.. need to check)
            // }

          }
        })
        invader.update();
      }

      if (invader.allowFire == true) {
        invader.allowFire = false;
        invader.shoot(invaderBullets);
        setTimeout(() => { invader.allowFire = true }, random(ENEMY_FIRE_SPEED_MIN, ENEMY_FIRE_SPEED_MAX))
      }



      if ((player.position.y <= invader.position.y + invader.height) &&
        (player.position.x + player.width / 2 >= invader.position.x) &&
        (player.position.x - player.width / 2 <= invader.position.x + invader.width) &&
        (player.position.y + player.height / 2 >= invader.position.y)) {
        --player.lives;
        setTimeout(() => { invaders.splice(indexInv, 1) }, 0);
      }

      invader.update();

    })





    if (allowEnemyCreation == true) {
      allowEnemyCreation = false;
      invaders.push(new Invader({
        position: {
          x: random(0, CANVAS.width - player.width),
          y: 0
        }
      }))
      setTimeout(() => { allowEnemyCreation = true }, ENEMY_SPAWN_SPEED)
    }
  }
}




window.addEventListener('keydown', (event) => {
  switch (event.key) {
    // case 'Control':  console.log(event); break;
    case 'a': keyMonitor['a'].pressed = true; break;
    case 'd': keyMonitor['d'].pressed = true; break;
    case 'w': keyMonitor['w'].pressed = true; break;
    case 's': keyMonitor['s'].pressed = true; break;
    case 'ArrowLeft': keyMonitor['ArrowLeft'].pressed = true; break;
    case 'ArrowRight': keyMonitor['ArrowRight'].pressed = true; break;
    case 'ArrowUp': keyMonitor['ArrowUp'].pressed = true; break;
    case 'ArrowDown': keyMonitor['ArrowDown'].pressed = true; break;
    case ' ': keyMonitor[' '].pressed = true; break;
    case 'Escape': (isGameFinished)? isGamePaused : (isGamePaused) ? isGamePaused = false : isGamePaused = true; break;
  }
  // console.log(event);

})


window.addEventListener('keyup', (event) => {
  switch (event.key) {
    // case 'Control':  console.log(event); break;
    case 'a': keyMonitor['a'].pressed = false; player.rotation = 0; break;
    case 'd': keyMonitor['d'].pressed = false; player.rotation = 0; break;
    case 'w': keyMonitor['w'].pressed = false; break;
    case 's': keyMonitor['s'].pressed = false; break;
    case 'ArrowLeft': keyMonitor['ArrowLeft'].pressed = false; player.rotation = 0; break;
    case 'ArrowRight': keyMonitor['ArrowRight'].pressed = false; player.rotation = 0; break;
    case 'ArrowUp': keyMonitor['ArrowUp'].pressed = false; break;
    case 'ArrowDown': keyMonitor['ArrowDown'].pressed = false; break;
    case ' ': keyMonitor[' '].pressed = false; break;
  }
  // console.log(event);

})



let player;
let invaders = [];
let playerBullets = [];
let invaderBullets = [];









let audio = new Audio('./assets/Assalm-Britannicus.mp3');
let isAudioPlayed = false;
const musicButton = document.querySelector('.music');
const startButton = document.querySelector('.start');
const menu = document.querySelector('.menu');


musicButton.addEventListener('click', () => {
  if (!isAudioPlayed) {
    isAudioPlayed = true;
    audio.play();
    musicButton.innerHTML = 'ON';
  } else {
    isAudioPlayed = false;
    audio.pause();
    musicButton.innerHTML = 'OFF';
  }
})


startButton.addEventListener('click', () => {
  menu.classList.add('invisible');
  clearCanvas();
  animate();
})

