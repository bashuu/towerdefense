function enemyForm(x, y, health, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.health = health;
  
    this.move = function(k){
      this.x += xDir[k];
      this.y += yDir[k];
    }   

    this.nodeChek = function(k){
        var i = Math.floor(this.y / titleHeigth);
        var j = Math.floor(this.x / titleWidth);
        switch(map[i][j]){
            case 'u':
                xDir[k] = 0;
                yDir[k] = -1 * enemy[k].speed;
                break;
            case 'r':   
                xDir[k] = enemy[k].speed;
                yDir[k] = 0;
                enemySprites[k].dir = 0;
                break;
            case 'd':    
                xDir[k] = 0;
                yDir[k] = enemy[k].speed;
                break;
            case 'l':
                xDir[k] = -1 * enemy[k].speed;
                yDir[k] = 0;
                enemySprites[k].dir = 1;
                break;
            default :
                break;
        }
    }
}

function addWarrior(){
    enemy.push(new enemyForm(spawnLocX, spawnLocY, enemyHealth, speed));
    xDir.push(speed);
    yDir.push(0)
    enemySprites.push(new SpriteSheet(warriorSprite, 50, 50, 8, 6, 3, 0));
}

function addPanthion(){
    enemy.push(new enemyForm(spawnLocX, spawnLocY, enemyHealth * 2, speed * 0.8));
    xDir.push(speed * 0.8);
    yDir.push(0);
    enemySprites.push(new SpriteSheet(panthionSprite, 50, 50, 10, 6, 3, 0));
}

function addWolf(){
    enemy.push(new enemyForm(spawnLocX, spawnLocY, enemyHealth * 0.3, speed * 1.7));
    xDir.push(speed * 1.7);
    yDir.push(0)
    enemySprites.push(new SpriteSheet(wolfSprite, 70, 50, 6, 4, 2, 0));
}

function addBoss(){
    enemy.push(new enemyForm(spawnLocX, spawnLocY, enemyHealth * 10, speed * 0.3));
    xDir.push(speed * 0.3);
    yDir.push(0);
    enemySprites.push(new SpriteSheet(bossSprite, 113, 130, 4, 4, 4, 0));
}


function checkEnemy(){
    var size = enemy.length;
    for(var i = 0; i < size; i++){
        if (enemy[i].x > titleWidth * worldWidth + 40){
            if (life < 0)
                gameOver();
            else{
                life--;
                enemy.splice(i, 1);
                xDir.splice(i, 1);
                yDir.splice(i, 1);
                enemySprites.splice(i, 1);
                i--;
                size--;
            }
        }
        else if (enemy[i].health <= 0){
            money += drop;
            score += Math.floor(enemy[i].speed);
            enemy.splice(i, 1);
            xDir.splice(i, 1);
            yDir.splice(i, 1);
            enemySprites.splice(i, 1);
            i--;
            size--;
        }
    }
}
