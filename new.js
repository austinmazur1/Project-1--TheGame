import Player from "./classes/player.js";
import Obstacle from "./classes/obstacle.js";

//DOM Elements
const canvas = document.querySelector("#canvas");
const ctx = document.querySelector("canvas").getContext("2d");
const gameScore = document.querySelector(".score");
const highScoreEl = document.querySelector(".highscore");
const lives = document.querySelector(".life-count");
const lostLife = document.querySelector('.life-less');
const points = document.querySelector('.points');
const easy = document.querySelector('#easy');
const medium = document.querySelector('#medium');
const hard = document.querySelector('#hard');
const instructions = document.querySelector('#how-to-play');
const splashScreen = document.querySelector('splash-screen');
const playAgain = document.querySelector(".again");
const buttons = document.querySelector(".btn-wrap");
const home = document.querySelector('.home-screen');



let playEasy = false;
let playMedium = false;
let playHard = false;


//Sounds
const backgroundMusic = new Audio('assets/bgm_0.wav')
const jumpSound = new Audio('assets/SFX_Jump_07.wav')
const lifeDeduction = new Audio('assets/Retro12.wav');
const background = new Image();
background.src = 'assets/Background.png'

//player, and obstacle array
const player = new Player(ctx, canvas);
const obstacles = [];

// Background position
let bgX = 0;

//randomize obstacles coming out
let minDelay = 100;
let maxDelay = 200;
function getRAndomObstacleDelay(){
  if(playEasy) {
   minDelay = 300;
    maxDelay = 400;
    console.log(playEasy);
  } else if (playMedium) {
    minDelay = 200;
    maxDelay = 300;
    console.log(playMedium);
  } else if (playHard) {
    minDelay = 100;
    maxDelay = 200;
  }
  return Math.floor(Math.random() * (maxDelay - minDelay + 1) + minDelay);
  
}
let obstacleDelay = getRAndomObstacleDelay();

//variables for moving obstacle and score feature
let counter = 0;
let score = 0;
let highScore = 0;
let isGameOver = false;

//logic for the movement of the player
//"TODO" figure out how to implement this into the player class, or a function
const movement = {
  left: false,
  right: false,
  up: false,
  keyListener: function (event) {
    const keyState = event.type === "keydown" ? true : false;

    switch (event.key) {
      case "ArrowLeft": // left key
        movement.left = keyState;
        break;
      case "ArrowUp": // up key
        movement.up = keyState;
        // jumpSound.play();
        break;
      case "ArrowRight": // right key
        movement.right = keyState;
        break;
    }
  },
};

//GAME LOOP
const loop = function () {

  //counter increments as loop runs
  counter++;
  clearCanv();
  // backgroundMusic.play();
  lostLife.classList.remove('life-less');
  points.classList.remove('points');

  //Draw background
  // ctx.fillStyle = "grey";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, bgX, 0, canvas.width, canvas.height);
  ctx.drawImage(background, bgX + canvas.width, 0, canvas.width, canvas.height)
  
  // Move background
  bgX -= 1;
  bgX %= canvas.width;

  //easyMode
  // if(playEasy) {
  //   minDelay = 300;
  //   maxDelay = 400;
  //   console.log("hi");
  // }

  //Draw the player
  player.draw();
  
  /////Draw obstacles
  //speed of obstacles
  if (counter % obstacleDelay === 0) {
    const obst = new Obstacle(ctx, canvas, 2);
    obstacles.push(obst);

    obstacleDelay = getRAndomObstacleDelay();
  } 

  //loop to create obstacles
  obstacles.forEach((el) => {
    el.draw();
    el.moveLeft();

    //points if player jumps over obstacle, 10 points awarded
    if (el.x < player.x && !el.scored && !isGameOver) {
      el.scored = true;
      points.classList.add('points')
      score += 10;
      gameScore.innerHTML = score;
      //nested if to change difficulty "TODO"
      // if (score > 50) {
      //   console.log("medium");
      // }
    } 
    //if player runs out of lives the game over function runs
    else if (player.lives <= 0) {
      GameOver();
    }

    //Keeps track of highscore
    if (score > highScore) {
      highScore = score;
      highScoreEl.innerHTML = `${highScore}`;
    }
    //gets rid of the obstacles that leave the canvas
    if (el.x > canvas.width) {
      obstacles.shift();
    }

    /////////collision algorithim
    //"TODO" put into a function maybe?
    //"TODO" look into a better collision restart
    if (
      player.lives > 0 &&
      el.x < player.x + player.width &&
      el.x + el.width > player.x &&
      el.y < player.y + player.height &&
      el.height + el.y > player.y
    ) {
      // clearCanv();
      lifeDeduction.play();
      player.x = 10;
      player.lives--;
      obstacles.length = 1;
      lives.innerHTML = `${player.lives}`
      lostLife.classList.add('life-less')
      console.log(player.lives);
    }
  });

  ////Logic to move the player
  //"TODO" put into function maybe
  if (movement.up && player.jumping == false) {
    //controls jump height
    player.y_velocity -= 30;
    player.jumping = true;
    
  }

  // controls the left speed
  if (movement.left) {
    player.x_velocity -= 0.8;
  }
  // controls the right speed
  if (movement.right) {
    player.x_velocity += 0.8;
  }

  player.y_velocity += 1.5; // gravity
  player.x += player.x_velocity;
  player.y += player.y_velocity;
  player.x_velocity *= 0.9; // friction illusion
  player.y_velocity *= 0.96; // friction illusion

  // keeps obj from falling past canvas
  if (player.y > canvas.height - player.height) {
    player.jumping = false;
    player.y = canvas.height - player.height;
    player.y_velocity = 0;
  }

  // creating left and right border
  if (player.x < 0) {
    player.x = 0;
  } else if (player.x > canvas.width - 35) {
    player.x = canvas.width - 35;
  }

  
  
  

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", movement.keyListener);
window.addEventListener("keyup", movement.keyListener);
// window.requestAnimationFrame(loop);

easy.addEventListener('click', function(){
  // clearCanv();
  // window.cancelAnimationFrame(loop);
  window.requestAnimationFrame(loop);
  playEasy = true;
  //displays canvas back in original postion
  canvas.style.display = 'block';
  buttons.classList.remove('hide')
  buttons.style.display = 'block'
  console.log(home);
  console.log("easy mode");
  console.log(playEasy);
})

medium.addEventListener('click', function(){
  window.requestAnimationFrame(loop);
  playMedium = true;
  //displays canvas back in original postion
  canvas.style.display = 'block';
  console.log(playMedium);
  console.log("medium mode");
})

hard.addEventListener('click', function(){
  window.requestAnimationFrame(loop);
  playHard = true;
  //displays canvas back in original postion
  canvas.style.display = 'block';
  console.log(playMedium);
  console.log("hard mode");
  // splashScreen.style.display = 'none'
})
home.addEventListener('click', function(){
  clearCanv();
  counter = 0;
  canvas.style.display = "none"
  window.cancelAnimationFrame(loop);
  playEasy = false;
  playMedium = false;
  playHard = false;
  console.log(playEasy);
  console.log(playHard);
  console.log(playMedium);
  resetGame();
  //displays canvas back in original postion
  // canvas.style.display = 'none';
  
  console.log("home");
  // splashScreen.style.display = 'none'
})




///////////functions

function GameOver() {
  window.cancelAnimationFrame(loop);
  clearCanv();
  isGameOver = true;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "60px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Oh no! Game Over", canvas.width / 2, canvas.height / 2);
  gameScore.innerHTML = `${score}`;
  lostLife.classList.add('life-less')
}

//clears canvas
function clearCanv() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
}

//reset to default
function resetGame() {
  counter = 0;
  score = 0;
  gameScore.innerHTML = `${score}`;
  player.x = 10;
  // player.y = canvas.height - player.height;
  player.y = 0;
  player.x_velocity = 0;
  player.y_velocity = 0;
  player.lives = 3;
  lives.innerHTML = `${player.lives}`
  obstacles.length = 0;
  isGameOver = false;
}



//button click to reset game and play again
playAgain.addEventListener("click", function (e) {
  resetGame();
  const boop = new Audio('assets/Modern7.wav');
  boop.play();
});


/////////////////////


// function animate() {
//   requestAnimationFrame(animate);
  
//   // clear the canvas
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
  
//   // calculate the position of the background image based on the player's position
//   const bgX = player.x * .2;
  
//   // draw the background image at the calculated position
// //   ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
// }
