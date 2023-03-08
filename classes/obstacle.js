class Obstacle {
    constructor(ctx, canvas) {
        this.x = canvas.width;
        this.y = 10;
        this.width = 30;
        this.heigth = 30;
        this.ctx = ctx;
        this.color = "orange";
    }
    draw() {
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    moveLeft() {
        this.x -= 1;
    }
}