function moneyFrom(font, x, y){
    this.x = x;
    this.y = y;
    this.font = font;

    this.update = function(Curmoney){
        ctx = gameArea.context;
        ctx.fillStyle = "#fff";
        ctx.font = this.font;
        ctx.strokeText("money : " + Curmoney, x, y);
    }
}
