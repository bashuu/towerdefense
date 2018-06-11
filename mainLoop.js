var xDir = [], yDir = [];
var worldWidth = 20;
var worldHeight = 7;
var titleWidth = 64;
var titleHeigth = 64;
var map = [[]];
var enemy = [];
var check = true;
var tower = [];
var bullet = [];

for(i = 0; i < worldHeight; i++) {
    map[i] = [];
    for(j = 0; j < worldWidth; j++) {
        map[i][j] = 'e';
    }
}

for (var i = 0; i < 15; i++)
    map[1][i] = 'p';
for (var i = 1; i < 2; i++)
    map[i][16] = 'p';
for (var i = 2; i < 15; i++)
    map[3][i] = 'p';
for (var i = 3; i < 4; i++)
    map[i][2] = 'p';
for (var i = 2; i < worldWidth; i++)
    map[5][i] = 'p';

map[1][16] = 'd';
map[3][16] = 'l';
map[3][2] = 'd';
map[5][2] = 'r';

function startGame() {
    gameArea.start();
}
var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = worldWidth * titleWidth;
        this.canvas.height = worldHeight * titleHeigth;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.timeout = setTimeout(mainLoop, 1000 / fps);
        requestAnimationFrame(updateGA);
    },

    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },


    stop : function(){
        check = false;
        clearTimeout(this.timeout);
    }
  }

function mainLoop(){
    checkEnemy();
    enemySpawnTimer--;
    if (enemySpawnTimer == 0){
        addEnemy();
        var rand = Math.floor(Math.random() * 3);
        switch(rand){
            case 0:
                enemySpawnTimer = 15;
                break;
            case 1:
                enemySpawnTimer = 30;
                break;
            case 2:
                enemySpawnTimer = 45;
                break;
            default:
                console.log("ERROR");
                break;
        }
    }

    for (var i = 0; i < enemy.length; i++){
        checkEnemy();
        enemy[i].nodeChek(i)
        enemy[i].move(i);
    }

    for (var i = 0; i < tower.length; i++){
        tower[i].findTarget();
        tower[i].attack();
    }

    var bulletSize = bullet.length;
    for (var i = 0; i < bulletSize; i++){
        bullet[i].move();
        if(bullet[i].checkCollision()){
            bullet.splice(i, 1);
            i--;
            bulletSize--;
        }
    }  

  setTimeout(mainLoop, 1000 / fps);
}

function updateGA(){
    gameArea.clear();

    for (var k = 0; k < enemy.length; k += 1) 
        enemy[k].update();
    
    for (var i = 0; i < tower.length; i++)
        tower[i].update();

    for (var i = 0; i < bullet.length; i++)
        bullet[i].update();

    if(check)
        requestAnimationFrame(updateGA);
}

function gameOver(){
  var ctx = gameArea.context;
  ctx.font = "30px Comic Sans MS";
  // alert("Game Over");
  gameArea.stop();
  gameArea.clear()
  alert("GameOver");
}