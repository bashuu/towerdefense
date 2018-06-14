var xDir = [], yDir = [];
var map = [[]];
var enemy = [];
var check = true;
var tower = [];
var bullet = [];
var curMoney;
var enemySprites = [];
var towerSprites = [];
var curScore;
var tower1;
var tower2;
var deleteTower;
var myHealth = 10;
var curWave;
var curLife;

var worldWidth = 20;
var worldHeight = 7;
var titleWidth = 64;    
var titleHeigth = 64;

for(i = 0; i < worldHeight; i++) {
    map[i] = [];
    for(j = 0; j < worldWidth; j++) {
        map[i][j] = 'e';
    }
}

for (var i = 0; i < 16; i++)
    map[1][i] = 'p';
for (var i = 1; i < 3; i++)
    map[i][16] = 'p';
for (var i = 2; i < 16; i++)
    map[3][i] = 'p';
for (var i = 3; i < 5; i++)
    map[i][2] = 'p';
for (var i = 3; i < worldWidth; i++)
    map[5][i] = 'p';

map[1][16] = 'd';
map[3][16] = 'l';
map[3][1] = 'd';
map[5][1] = 'r';

function startGame() {
    gameArea.start();
    curMoney = new textFrom("15px Arial", 0,  worldHeight * titleHeigth + 30, "Money : ");
    curScore = new textFrom("15px Arial",  0,  worldHeight * titleHeigth + 45, "Score : ");
    curWave = new textFrom("15px Arial", 0,  worldHeight * titleHeigth + 60, "wave : ");
    curlife = new textFrom("15px Arial", 0, worldHeight * titleHeigth + 75, "life : ");

    upgradeDmg = new button (300, worldHeight * titleHeigth, 100, 100, "black");
    upgradeRange = new button (400, worldHeight * titleHeigth, 100, 100, "green");
    tower1 = new button(100, worldHeight * titleHeigth, 100, 100, "red");
    tower2 = new button(200, worldHeight * titleHeigth, 100, 100, "blue");
}
var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = worldWidth * titleWidth;
        this.canvas.height = worldHeight * titleHeigth + 100;
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
    warriorSpawnTime--;
    panthionSpawnTime--;
    wolfSpawnTime--;
    bossSpawnTime--;

    if (bossSpawnTime == 0 && bossCount > 0){
        addBoss();
        bossSpawnTime = spawnTimeSelector(40);
        bossCount--;
    }

    if (warriorSpawnTime <= 0 && warriorCount > 0){
        addWarrior();
        warriorSpawnTime = spawnTimeSelector(spawnWindow * 0.7);
        warriorCount--;
    }
    if (panthionSpawnTime <= 0 && panthionCount > 0){
        addPanthion();
        panthionSpawnTime = spawnTimeSelector(spawnWindow);
        panthionCount--;
    }
    
    if (wolfSpawnTime <= 0 && wolfCount > 0){
        addWolf();
        wolfSpawnTime = spawnTimeSelector(spawnWindow * 0.5);
        wolfCount--;
    }

    for (var i = 0; i < enemy.length; i++){
        checkEnemy();
        if (enemy[i]){
            enemy[i].nodeChek(i);
            enemy[i].move(i);
        }
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

    if (checkWave())
        newWave();

    setTimeout(mainLoop, 1000 / fps);
}

function updateGA(){
    gameArea.clear();
    for (var k = 0; k < enemy.length; k += 1) {
        enemySprites[k].update();
        enemySprites[k].draw(enemy[k].x, enemy[k].y);
    }

    for (var i = 0; i < tower.length; i++){
        towerSprites[i].update();
        towerSprites[i].draw(tower[i].x, tower[i].y);
    }

    for (var i = 0; i < bullet.length; i++)
        bullet[i].update();

    curMoney.update(money);
    curScore.update(score);
    curWave.update(waveCounter);
    curlife.update(life);

    tower1.update();
    tower2.update();
    upgradeDmg.update();
    upgradeRange.update();

    if(check)
        requestAnimationFrame(updateGA);
}

function gameOver(){
    var ctx = gameArea.context;
    ctx.font = "30px Comic Sans MS";
    gameArea.stop();
    gameArea.clear()
    // alert("game over");
}

function spawnTimeSelector(x){
    var rand = Math.floor(Math.random() * 3);
    switch(rand){
        case 0:
            enemySpawnTimer = x * 0.4;
            break;
        case 1:
            enemySpawnTimer = x;
            break;
        case 2:
            enemySpawnTimer = x * 1.4;
            break;
        default:
            console.log("ERROR");
            break;
    }
    return enemySpawnTimer * delayHarden;
}