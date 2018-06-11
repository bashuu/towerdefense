function bulletFrom(x, y, target, hit){
    this.x = x;
    this.y = y;
    this.target = target;
    this.hit = hit;


    this.r = 10;
    this.speed = speed * 2;

    this.move = function() {
        var xDist = this.target.x + titleWidth / 2 - this.x;
        var yDist = this.target.y + titleWidth/2-this.y;
        var dist = Math.sqrt(xDist * xDist + yDist * yDist);
        this.x = this.x + this.speed * xDist / dist;
        this.y = this.y + this.speed * yDist / dist;
    }

    this.update = function() {
        gameArea.context.beginPath();
        gameArea.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        gameArea.context.fillStyle = 'blue';
        gameArea.context.fill();
    };
    
    this.checkCollision = function() {
        if(this.x < this.target.x + titleWidth &&
            this.x + this.r > this.target.x &&
            this.y < this.target.y + titleWidth &&
            this.y + this.r > this.target.y) {
            this.target.health -= this.hit;
            return true;
            }
        return false;
    }
}