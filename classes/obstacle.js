class Obstacle {
  constructor(ctx, canvas) {
    this.x = 800;

    this.width = 30;
    this.height = 30;
    this.y = canvas.height - this.height;
    this.ctx = ctx;
    this.color = "black";
    this.x_velocity = 0;
    this.y_velocity = 0;
  }
  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  moveLeft() {
    this.x -= 1;
  }
}

export default Obstacle;

// Math.random() * canvas.height;
