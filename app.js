const CANVAS = document.getElementById('canvas');
const CANVAS_CONTEXT = canvas.getContext('2d');
CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight;
const SCALE_COEF = 30; //24
const VELOCITY_COEF_X = 200; //273
const VELOCITY_COEF_Y = 450;
const ROTATION_COEF = 0.3;
const ENEMY_SPAWN_SPEED = 1000;
let allowBulletCreation = true;
let allowEnemyCreation = true;
const keyMonitor = {
  'a': {pressed: false},
  'd': {pressed: false},
  'w': {pressed: false},
  's': {pressed: false},
  'ArrowLeft': {pressed: false},
  'ArrowRight': {pressed: false},
  'ArrowUp': {pressed: false},
  'ArrowDown': {pressed: false},
  ' ': {pressed:false},
}

function random(min, max) {
  return min + Math.random() * (max - min);
}

class Player {
  constructor() {
      const playerImage = new Image();
      playerImage.src = './assets/img/spaceship.png';
      this.image = playerImage;
      
      this.width = CANVAS.width/SCALE_COEF;
      this.height = CANVAS.width/SCALE_COEF;
      this.rotation = 0;
      this.cooldownTimer = 100;
      this.position = {
        x: window.innerWidth/2 - this.width/2,
        y: window.innerHeight - this.height - 20,
      };
      this.velocity= {
        x: CANVAS.width/VELOCITY_COEF_X,
        y: CANVAS.height/VELOCITY_COEF_Y,
      };
    }

    draw(){
      CANVAS_CONTEXT.save(); //need for ship rotation
      CANVAS_CONTEXT.translate(player.position.x + player.width/2, player.position.y + player.height/2); //ship rotation
      CANVAS_CONTEXT.rotate(this.rotation); //ship rotation
      CANVAS_CONTEXT.translate(-player.position.x - player.width/2, -player.position.y - player.height/2); //ship rotation back
    

      // CANVAS_CONTEXT.fillStyle = 'red';
      // CANVAS_CONTEXT.fillRect(this.position.x, this.position.y, this.width, this.height);
      CANVAS_CONTEXT.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
      // console.log('PlayerWidth:' + this.width)
      // console.log('WindowInnerWidth:' +window.innerWidth)
      CANVAS_CONTEXT.restore(); //need for ship rotation
    }

    update() {
          if((keyMonitor['a'].pressed || keyMonitor['ArrowLeft'].pressed) && player.position.x >= 0){
            this.position.x -= this.velocity.x;
            this.rotation = -ROTATION_COEF;
          }
          if((keyMonitor['d'].pressed || keyMonitor['ArrowRight'].pressed) &&  this.position.x <= CANVAS.width - this.width) {
            this.position.x += this.velocity.x;
            this.rotation = ROTATION_COEF;
          }
          if((keyMonitor['w'].pressed || keyMonitor['ArrowUp'].pressed)  && this.position.y >= 0){
            this.position.y -= this.velocity.y;
          }
          if((keyMonitor['s'].pressed || keyMonitor['ArrowDown'].pressed) && this.position.y <= CANVAS.height - this.height) {
            this.position.y += this.velocity.y;
          }
         this.draw();
        //  this.position.x += this.velocity.x;
    }
}



class Invader {
  constructor({position}) {
      const invaderImage = new Image();
      invaderImage.src = './assets/img/invader.png';
      this.image = invaderImage;
      this.width = CANVAS.width/SCALE_COEF;
      this.height = CANVAS.width/SCALE_COEF;
      this.cooldownTimer = 100;
      this.position = {
        x: position.x,
        y: position.y,
      };
      this.velocity= {
        x: CANVAS.width/VELOCITY_COEF_X,
        y: CANVAS.height/VELOCITY_COEF_Y,
      };
    }

    draw(){
      CANVAS_CONTEXT.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
      // console.log('InvaderWidth:' + this.width)
    }

    update(){
      if(true){
        this.position.y += this.velocity.y;
      }
      this.draw();
    }
}




class PlayerBullet {
    constructor({position, velocity}){
      const bulletImage = new Image();
      bulletImage.src = './assets/img/player-bullet.png';
      this.image = bulletImage;
      this.width = CANVAS.width/(SCALE_COEF*2.5);
      this.height = CANVAS.width/(SCALE_COEF*2.5);

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




function animate() {
  requestAnimationFrame(animate);
  CANVAS_CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
  player.update();
  if(keyMonitor[' '].pressed && allowBulletCreation == true) {
    allowBulletCreation = false;
    playerBullets.push(new PlayerBullet({
      position: {
        x: (player.position.x + player.width/3), 
        y: (player.position.y - 5)
      }, 
      velocity: { 
        x: 0, 
        y: -5
      } 
    }))
     setTimeout(() => {allowBulletCreation = true}, player.cooldownTimer)
    }


    
  playerBullets.forEach((bullet,index)=> {
    if(bullet.position.y <=0) {
      setTimeout(() => {playerBullets.splice(index, 1)},0); // ST - prevent projectiles flashing (not nessesary?.. need to check)
    } else {
      bullet.update();
    }
  })



  invaders.forEach((invader,index)=> {
    if(invader.position.y >= CANVAS.height) {
      invaders.splice(index, 1);
    } else {
      invader.update();
    }
  })


  
  if( allowEnemyCreation == true) {
    allowEnemyCreation = false;
    invaders.push(new Invader({
      position: {
        x: random(0, CANVAS.width - player.width), 
        y: 0
      }
    }))
     setTimeout(() => {allowEnemyCreation = true}, ENEMY_SPAWN_SPEED)
    }
}




window.addEventListener('keydown', (event)=>{
  switch (event.key){
      // case 'Control':  console.log(event); break;
      case 'a':  keyMonitor['a'].pressed = true; break;
      case 'd':  keyMonitor['d'].pressed = true; break;
      case 'w':  keyMonitor['w'].pressed = true; break;
      case 's':  keyMonitor['s'].pressed = true; break;
      case 'ArrowLeft':  keyMonitor['ArrowLeft'].pressed = true; break;
      case 'ArrowRight':  keyMonitor['ArrowRight'].pressed = true; break;
      case 'ArrowUp':  keyMonitor['ArrowUp'].pressed = true; break;
      case 'ArrowDown':  keyMonitor['ArrowDown'].pressed = true; break;
      case ' ': keyMonitor[' '].pressed = true; break;
  }
  // console.log(event);
 
})


window.addEventListener('keyup', (event)=>{
  switch (event.key){
      // case 'Control':  console.log(event); break;
      case 'a':  keyMonitor['a'].pressed = false;  player.rotation = 0; break;
      case 'd':  keyMonitor['d'].pressed = false;  player.rotation = 0; break;
      case 'w':  keyMonitor['w'].pressed = false; break;
      case 's':  keyMonitor['s'].pressed = false; break;
      case 'ArrowLeft':  keyMonitor['ArrowLeft'].pressed = false; player.rotation = 0; break;
      case 'ArrowRight':  keyMonitor['ArrowRight'].pressed = false; player.rotation = 0; break;
      case 'ArrowUp':  keyMonitor['ArrowUp'].pressed = false; break;
      case 'ArrowDown':  keyMonitor['ArrowDown'].pressed = false; break;
      case ' ':  keyMonitor[' '].pressed = false; break;
  }
  // console.log(event);
 
})



const player = new Player();
const invaders = [];
const playerBullets = [];
animate();