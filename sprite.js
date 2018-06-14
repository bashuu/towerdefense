function SpriteSheet(path, frameWidth, frameHeight, frameSpeed, endFrame, framesPerRow, dir) {    
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.dir = dir;
    this.path = path;

    var self = this;

    var currentFrame = 0;  
    var counter = 0;  
   

    this.update = function() {
        if (counter == (frameSpeed - 1))
            currentFrame = (currentFrame + 1) % endFrame;
        counter = (counter + 1) % frameSpeed;
    }

    this.draw = function(x, y) {
        ctx = gameArea.context
        this.image = new Image;
        this.image.src = this.path[this.dir];
        var row = Math.floor(currentFrame / framesPerRow);
        var col = Math.floor(currentFrame % framesPerRow);

        ctx.drawImage(
            this.image,
            col * frameWidth, row * frameHeight,
            frameWidth, frameHeight,
            x, y,
            frameWidth, frameHeight);
    }
    

}