class Player {
    constructor(ctx, image) {
        this.x = 10;
        this.y = 600;
        this.width = 50;
        this.height = 50;
        this.ctx = ctx;
        this.img = new Image();
        this.img.src = image;
        this.grav = 0; //"TODO" look up how to make gravity effect
    }

    draw() {
        // this.ctx.drawImage(this.x, this.y, this.width, this.height);
        // this.ctx.fillStyle = "black"
        // this.ctx.fillRect(this.x, this.y, this.width, this.height)
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    moveUp() {

    }
}

// export default Player;