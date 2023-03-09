class Player {
  constructor(ctx, canvas) {
    this.x = 10;
    this.width = 32;
    this.height = 32;
    this.y = canvas.height - this.height;
    this.ctx = ctx;
    this.x_velocity = 0;
    this.y_velocity = 0;
    // this.jumping = false;
    // this.left = false;
    // this.right = false;
    // this.up = false;
//     this.type = "keydown";
//     this.keyListener = function arrow(event) {
//       const keyState = event.type === "keydown" ? true : false;

//       switch (event.key) {
//         case "ArrowLeft": // left key
//           this.left = keyState;
//           break;
//         case "ArrowUp": // up key
//           this.up = keyState;
//           break;
//         case "ArrowRight": // right key
//           this.right = keyState;
//           break;
//       }
//     }.bind(this); //bind 'this' to the function
  }

  draw() {
    this.ctx.fillStyle = "cyan";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    // this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

export default Player;
