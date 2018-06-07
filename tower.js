this.erase = function(k){
    var b = this[this.length - 1];
    this[this.length - 1] = this[k];
    this[k] = b;
    this.pop();
}
this.inTowerRange = function(k){
    var x1 = this.x;
    var y1 = this.y;

    var x2 = tower[k].x;
    var y2 = tower[k].y;

    var range = tower[k].health;
    var tarHealth = this.health;

    var curDis = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) + (y1 - y2));

    if (curDis <= range){
        box[k].clear();
        box.erase(k);
        xDir.erase(k);
        yDir.erase(k); 
    }
}