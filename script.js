import Player from "./classes/player.js";

const canvas = document.querySelector("#canvas");
const ctx = document.querySelector("canvas").getContext("2d");

const myPlayer = new Player(ctx, canvas);

//listening for keydown & the keylistener function in the player class
document.addEventListener(myPlayer.type, myPlayer.keyListener);

function gameLoop() {
  //background
  ctx.fillStyle = "grey";
  ctx.fillRect(0, 0, 800, 600);

  //draw player
  myPlayer.draw();

  if (myPlayer.up && myPlayer.jumping == false) {
    //controls jump height
    myPlayer.y_velocity -= 30;
    myPlayer.jumping = true;
  }

  // controls the left speed
  if (myPlayer.left) {
    myPlayer.x_velocity -= 0.8;
  }
  // controls the right speed
  if (myPlayer.right) {
    myPlayer.x_velocity += 0.8;
  }

  myPlayer.y_velocity += 1.5; // gravity
  myPlayer.x += myPlayer.x_velocity;
  myPlayer.y += myPlayer.y_velocity;
  myPlayer.x_velocity *= 0.9; // friction illusion
  myPlayer.y_velocity *= 0.96; // friction illusion

  // keeps obj from falling past canvas
  if (myPlayer.y > 565) {
    myPlayer.jumping = false;
    myPlayer.y = 565;
    myPlayer.y_velocity = 0;
  }

  // creating left and right border
  if (myPlayer.x < 0) {
    myPlayer.x = 0;
  } else if (myPlayer.x > 765) {
    myPlayer.x = 765;
  }

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(gameLoop);
}

// window.addEventListener("keydown", movement.keyListener);
// window.addEventListener("keyup", movement.keyListener);
window.requestAnimationFrame(gameLoop);

