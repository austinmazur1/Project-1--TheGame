import Player from "./classes/player.js";
import Obstacle from "./classes/obstacle.js";

const canvas = document.querySelector("#canvas");
const ctx = document.querySelector("canvas").getContext("2d");
const gameScore = document.querySelector(".score");


const player = new Player(ctx, canvas);

const obstacles = [];
let counter = 0;
let score = 0;

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
        break;
      case "ArrowRight": // right key
        movement.right = keyState;
        break;
    }
  },
};



const loop = function () {
  counter++;
  clearCanv();

  //Draw background
  ctx.fillStyle = "grey";
  ctx.fillRect(0, 0, 800, 600);
  //Draw the player
  player.draw();
  /////Draw obstacles
  //speed of obstacles
  if (counter % 200 === 0) {
    const obst = new Obstacle(ctx, canvas);
    obstacles.push(obst);
    obst.draw();
  }
  //loop to create obstacles
  obstacles.forEach((el) => {
    el.draw();
    el.moveLeft();
    if (el.x > canvas.width) {
      obstacles.shift();
    }

    //collision algorithim
    if (
      player.lives > 0 &&
      el.x < player.x + player.width &&
      el.x + el.width > player.x &&
      el.y < player.y + player.height &&
      el.height + el.y > player.y
    ) {
      player.x = 10;
      player.lives -= 1;
      console.log(player.lives);
    } 
    //game over if player runs out of lives
    else if (player.lives === 0) {
      GameOver();
    }
    //'TODO'work on point system 
    if (player.x > canvas.width - player.width - 10) {
      console.log("yes");
      score++;
    }
  });

  if (movement.up && player.jumping == false) {
    //controls jump height
    player.y_velocity -= 25;
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
  if (player.y > 565) {
    player.jumping = false;
    player.y = 565;
    player.y_velocity = 0;
  }

  // creating left and right border
  if (player.x < 0) {
    player.x = 0;
  } else if (player.x > 765) {
    player.x = 765;
  }

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", movement.keyListener);
window.addEventListener("keyup", movement.keyListener);
window.requestAnimationFrame(loop);


///////////functions

function GameOver() {
  window.cancelAnimationFrame(loop);
  clearCanv(loop);
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "60px Arial";
  ctx.fillStyle = "white"
  ctx.textAlign = "center";
  ctx.strokeText("Oh no! Game Over", 100, 100)
  // gameScore.innerHTML = `${score}`
}

//clears canvas
function clearCanv() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
}

//reset to default
function resetGame() {
  counter = 0;
  score = 0;
  player.x = 10;
  player.y = canvas.height - player.height;
  player.x_velocity = 0;
  player.y_velocity = 0;
  player.lives = 3;
  obstacles.length = 0;
}

//button click to reset game and play again
document.querySelector(".again").addEventListener("click", function () {
  resetGame();
});