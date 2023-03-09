class Player {
    constructor(ctx, canvas) {
        this.x = 10;
        this.width = 50;
        this.height = 50;
        this.y = canvas.height - this.height;
        this.ctx = ctx;
        // this.draw = this.draw.bind(this)
        //this.img = new Image();
        //this.img.src = image;
        this.x_velocity = 0;
        this.y_velocity = 0;
        this.jumping = false;
        this.left = false;
        this.right = false;
        this.up = false
        this.type = "keydown"
        this.keyListener = function arrow(event) {
            const keyState = event.type === "keydown" ? true : false;
          
            switch (event.key) {
              case "ArrowLeft": // left key
                this.left = keyState;
                break;
              case "ArrowUp": // up key
                this.up = keyState;
                break;
              case "ArrowRight": // right key
                this.right = keyState;
                break;
            }
          }.bind(this); //bind 'this' to the function
    }

    draw() {
         this.ctx.fillStyle = "black"
         this.ctx.fillRect(this.x, this.y, this.width, this.height)
       // this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // arrow(event) {
    //     const keyState = event.type === "keydown" ? true : false;
      
    //     switch (event.key) {
    //       case "ArrowLeft": // left key
    //         movement.left = keyState;
    //         break;
    //       case "ArrowUp": // up key
    //         movement.up = keyState;
    //         break;
    //       case "ArrowRight": // right key
    //         movement.right = keyState;
    //         break;
    //     }
    //   }
}

export default Player;








// function (event) {
//     const keyState = event.type === "keydown" ? true : false;

//     switch (event.key) {
//       case "ArrowLeft": // left key
//         movement.left = keyState;
//         break;
//       case "ArrowUp": // up key
//         movement.up = keyState;
//         break;
//       case "ArrowRight": // right key
//         movement.right = keyState;
//         break;
//     }
//   },



 // if (movement.up && rectangle.jumping == false) {
  //   //controls jump height
  //   rectangle.y_velocity -= 30;
  //   rectangle.jumping = true;
  // }

  // // controls the left speed
  // if (movement.left) {
  //   rectangle.x_velocity -= 0.8;
  // }
  // controls the right speed
  // if (movement.right) {
  //   rectangle.x_velocity += 0.8;
  // }

//   document.addEventListener("keyup", (e) => {
//     delete keys[e.key];
//     if (e.key === "ArrowUp") {
//       isJumping = false;
//     }
//     if (e.key === "ArrowLeft") {
//       movement.left = false;
//       rectangle.x_velocity = 0;
//     }
//     if (e.key === "ArrowRight") {
//       movement.right = false;
//       rectangle.x_velocity = 0;
//     }
//   });



// if (e.key === "ArrowUp" && !isJumping) {
//     isJumping = true;
//     movement.up = true;
//     rectangle.y_velocity -= 30;
//     rectangle.jumping = false;
//     // console.log("up");
//   }

//   if (e.key === "ArrowLeft") {
//     movement.left = true;
//     rectangle.x_velocity -= 0.8;
//   }

//   if (e.key === "ArrowRight") {
//     movement.right = true;
//     rectangle.x_velocity += 0.8;
//   }