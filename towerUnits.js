function towerFrom(width, height, x, y, range, attackDmg, fireRate, color, target, time){
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
    this.time = time;

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
                return;
            }
        }
    }

    this.attack = function(){
        this.time--;
        if(this.target && this.time <= 0){
            bullet.push(new bulletFrom  (this.x + titleHeigth / 2, this.y + 10, this.target, this.attackDmg));
            this.time = this.fireRate;
        }
    }
}

function addDemonicTower(i, j){
    tower.push(new towerFrom(50, 50, j * titleHeigth, i * titleWidth, towerRange, towerDmg, demonnicTowerROF, demonicTowerSprite, null, demonnicTowerROF));
    map[i][j] = tower.length;
    money -= towerPrice;
    towerSprites.push(new SpriteSheet(demonicTowerSprite, 64, 64, 10, 5, 3, 0));
}
function addWaterTower(i, j){
    tower.push(new towerFrom(50, 50, j * titleHeigth, i * titleWidth, towerRange * 2, towerDmg / 2, waterTowerROF, waterTowerSprite, null, waterTowerROF));
    map[i][j] = tower.length - 1;
    money -= towerPrice;
    towerSprites.push(new SpriteSheet(waterTowerSprite, 64, 64, 10, 5, 3, 0));
}

function upgradeTowerDmg(){
    if (money >= damageUpgradeCost){
        for (var i = 0; i < tower.length; i++)
            tower[i].attackDmg += 40;
        money -= damageUpgradeCost;
    }
}

function upgradeTowerRange(){
    if (money >= rangeUpgradeCost){
        for (var i = 0; i < tower.length; i++)
            tower[i].range += 40;
        money -= rangeUpgradeCost;
    }
}