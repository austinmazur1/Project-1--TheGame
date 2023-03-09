import Player from "./classes/player.js";

const canvas = document.querySelector("#canvas");
const ctx = document.querySelector("canvas").getContext("2d");

const player = new Player(ctx, canvas);

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

  // creating the square
  //the black background
  ctx.fillStyle = "grey";
  ctx.fillRect(0, 0, 800, 600);

  player.draw();

  // red square
  // ctx.fillStyle = "#ff0000";
  // // ctx.beginPath();
  // ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  // // ctx.fill();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", movement.keyListener);
window.addEventListener("keyup", movement.keyListener);
window.requestAnimationFrame(loop);
