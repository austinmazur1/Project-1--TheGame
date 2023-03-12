class Animation {
    constructor(imageUrls, frameWidth, frameHeight, frameDuration) {
      this.frames = [];
      this.frameWidth = frameWidth;
      this.frameHeight = frameHeight;
      this.frameDuration = frameDuration;
      this.totalFrames = imageUrls.length;
      this.currentFrame = 0;
      this.elapsedTime = 0;
  
      for (let i = 0; i < imageUrls.length; i++) {
        const img = new Image();
        img.src = imageUrls[i];
        this.frames.push(img);
      }
    }
  
    update(dt) {
      this.elapsedTime += dt;
      if (this.elapsedTime >= this.frameDuration) {
        this.currentFrame++;
        if (this.currentFrame === this.totalFrames) {
          this.currentFrame = 0;
        }
        this.elapsedTime = 0;
      }
    }
  
    render(ctx, x, y) {
      ctx.drawImage(
        this.frames[this.currentFrame],
        x,
        y,
        this.frameWidth,
        this.frameHeight
      );
    }
  }
  
  class Player {
    constructor(x, y, width, height, speed) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = speed;
      this.animation = new Animation(
        ["assets/Owlet_Monster_Run_6.png"],
        32,
        32,
        100 // milliseconds per frame
      );
    }
  
    update(dt) {
      this.animation.update(dt);
      // other update logic for player movement, collision detection, etc.
    }
  
    render(ctx) {
      this.animation.render(ctx, this.x, this.y);
      // other rendering logic for player's other properties like color, text, etc.
    }
  }
  
  
  export default PlayerTest;
  