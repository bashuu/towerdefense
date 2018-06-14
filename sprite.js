function SpriteSheet(path, frameWidth, frameHeight, frameSpeed, endFrame) {
    var image = new Image();
    var framesPerRow;

    var self = this;
    image.onload = function() {
        framesPerRow = Math.floor(image.width / frameWidth);
    };

    var currentFrame = 0;  
    var counter = 0;       
    image.src = path;

    this.update = function() {
        if (counter == (frameSpeed - 1))
            currentFrame = (currentFrame + 1) % endFrame;
        counter = (counter + 1) % frameSpeed;
    }

    this.draw = function(x, y) {
        ctx = gameArea.context
        var row = Math.floor(currentFrame / framesPerRow);
        var col = Math.floor(currentFrame % framesPerRow);

        ctx.drawImage(
            image,
            col * frameWidth, row * frameHeight,
            frameWidth, frameHeight,
            x, y,
            frameWidth, frameHeight);
    }
}