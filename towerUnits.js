function towerFrom(width, height, x, y, range, attackDmg, fireRate, color, target){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = color;
    this.range = range;
    this.attackDmg = attackDmg;
    this.fireRate = fireRate;
    this.color = color;
    this.target = target;

    this.update = function(){
        ctx = gameArea.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    this.findTarget = function(){
        if(enemy.length === 0) {
            this.target = null;
            return;
        }
        if(this.target && this.target.health <= 0) {
            this.target = null;
        }

        for (var i = 0; i < enemy.length; i++) {
            var dist = (enemy[i].x - this.x) * (enemy[i].x - this.x + titleWidth) + (enemy[i].y - this.y) * (enemy[i].y - this.y + titleWidth); 
            if (dist < (this.range * this.range)) {
                this.target = enemy[i];
                console.log(i);
                return;
            }
        }
    }

    this.attack = function(){
        this.fireRate--;
        if(this.target && this.fireRate <= 0){
            this.target.health -= attackDmg;
            console.log(this.target.health);
            this.fireRate = rateofFire;
        }
    }
}

function addTower(i, j){
    tower.push(new towerFrom(50, 50, j * titleHeigth, i * titleWidth, towerRange, towerDmg, rateofFire, towerSprite, null));
    map[i][j] = 't';
}
