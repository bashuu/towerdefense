function enemyForm(width, height, x, y, health, speed, color){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.image = new Image()
    this.image.src = color;
    this.speed = speed;
    this.health = health;
  
    this.update = function(){
      ctx = gameArea.context;
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  
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
                break;
            case 'd':    
                xDir[k] = 0;
                yDir[k] = enemy[k].speed;
                break;
            case 'l':
                xDir[k] = -1 * enemy[k].speed;
                yDir[k] = 0;
                break;
            default :
                break;
        }
    }
}

function addWarrior(){
    enemy.push(new enemyForm(50, 50, spawnLocX, spawnLocY, enemyHealth, speed, warriorSprite));
    xDir.push(speed);
    yDir.push(0);
}

function addPanthion(){
    enemy.push(new enemyForm(50, 50, spawnLocX, spawnLocY, enemyHealth * 2, speed * 0.7, panthionSprite));
    xDir.push(speed * 0.5);
    yDir.push(0);
}


function checkEnemy(){
    var size = enemy.length;
    for(var i = 0; i < size; i++){
        if (enemy[i].x > titleWidth * worldWidth + 40){
            gameOver();
            enemy.splice(i, 1);
            xDir.splice(i, 1);
            yDir.splice(i, 1);
            i--;
            size--;
        }
        if (enemy[i].health <= 0){
            money += drop;
            enemy.splice(i, 1);
            xDir.splice(i, 1);
            yDir.splice(i, 1);
            i--;
            size--;
        }
    }
}
