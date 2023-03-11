class Obstacle {
  constructor(ctx, canvas, spacing) {
    this.x = canvas.width;
    this.canvas = canvas;
    this.width = Math.floor(Math.random() * 30) + 30;
    this.height = Math.floor(Math.random() * 60) + 60;
    this.y = canvas.height - this.height;
    this.ctx = ctx;
    this.color = "black";
    this.x_velocity = 0;
    this.y_velocity = 0;
    this.spacing = spacing;
    this.scored = false;
  }
  draw() {
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  moveLeft() {
    this.x -= Math.floor(Math.random() * 10) + 2 * this.spacing;
  }

  mediumMode() {
    this.x -= Math.floor(Math.random() * 10) + 2 * this.spacing;
  }
}

export default Obstacle;

// Math.random() * canvas.height;
