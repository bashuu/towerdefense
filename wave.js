var warriorCount = 30;
var panthionCount = 20;
var wolfCount = 30;
var waveBreakTime = 2000;

function textFrom(font, x, y, type){
    this.x = x;
    this.y = y;
    this.font = font;
    this.type = type;

    this.update = function(Curmoney){
        ctx = gameArea.context;
        ctx.fillStyle = "#fff";
        ctx.font = this.font;
        ctx.strokeText(this.type + Curmoney, x, y);
    }
}

function checkWave(){
    if (warriorSpawnTime <= 0 && wolfSpawnTime <= 0 && panthionSpawnTime <= 0)
        return true;
    return false;
}

function newWave(){
    warriorSpawnTime = waveBreakTime;
    wolfSpawnTime = waveBreakTime + 40;
    panthionSpawnTime = waveBreakTime + 20;

    warriorCount = Math.floor(enemyCount * countHarden);
    wolfCount = Math.floor(enemyCount * countHarden * 1.5);
    panthionCount = Math.floor(enemyCount * countHarden * 0.7);
    enemyHealth *= healthHarden;
    waveCounter++;
    if (waveCounter % 5 == 0){
        bossCount = waveCounter / 5;
        bossSpawnTime = waveBreakTime + 200;
    }
    else{
        bossCount = -1;
        bossSpawnTime = -1;
    }
    money += score  % 100;
}
