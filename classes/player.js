class Player {
  constructor(ctx, canvas) {
    this.x = 10;
    this.width = 60;
    this.height = 60;
    this.y = canvas.height - this.height;
    this.ctx = ctx;
    this.x_velocity = 0;
    this.y_velocity = 0;
    this.lives = 3;
    this.img = new Image();
    this.img.src = './assets/Owlet_Monster.png'
  }
  draw() {
    // this.ctx.fillStyle = "cyan";
    // this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}



////////////



export default Player;
