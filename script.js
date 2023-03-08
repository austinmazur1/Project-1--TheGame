// import Player from "./classes/player.js";

const canvas = document.querySelector("#canvas");
const ctx = document.querySelector("canvas").getContext("2d");


const rectangle = {
  height: 32,
  jumping: true,
  width: 32,
  x: 10, 
  x_velocity: 0,
  y: 0,
  y_velocity: 0,
};

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
  if (movement.up && rectangle.jumping == false) {
    //controls jump height
    rectangle.y_velocity -= 30; 
    rectangle.jumping = true;
  }

  // controls the left speed
  if (movement.left) {
    rectangle.x_velocity -= 0.8;
  }
  // controls the right speed
  if (movement.right) {
    rectangle.x_velocity += 0.8;
  }

  rectangle.y_velocity += 1.5; // gravity
  rectangle.x += rectangle.x_velocity;
  rectangle.y += rectangle.y_velocity;
  rectangle.x_velocity *= 0.9; // friction illusion
  rectangle.y_velocity *= 0.96; // friction illusion

  // keeps obj from falling past canvas
  if (rectangle.y > 565) {
    rectangle.jumping = false;
    rectangle.y = 565;
    rectangle.y_velocity = 0;
  }

  // creating left and right border
  if (rectangle.x < 0) {
    rectangle.x = 0;
  } else if (rectangle.x > 765) {
    rectangle.x = 765;
  }


  // creating the square
  //the black background
  ctx.fillStyle = "#202020";
  ctx.fillRect(0, 0, 800, 600);

   // red square
  ctx.fillStyle = "#ff0000";
  ctx.beginPath();
  ctx.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  ctx.fill();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", movement.keyListener);
window.addEventListener("keyup", movement.keyListener);
window.requestAnimationFrame(loop);
