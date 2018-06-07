var box = [];
var wall;
var ondor, urt;
var xSpeed = 4.2, ySpeed = 4.2;
var xDir = [], yDir = [];
var worldWidth = 20;
var worldHeight = 7;
var titleWidth = 64;
var titleHeigth = 64;
var map = [[]];
var tower = [];

for(i = 0; i < worldHeight; i++) {
    map[i] = [];
    for(j = 0; j < worldWidth; j++) {
        map[i][j] = 'e';
    }
}


map[1][16] = 'd';
map[3][16] = 'l';
map[3][2] = 'd';
map[5][2] = 'r';

map[0][5] = 't';
map[2][5] = 't';
map[4][5] = 't';
map[6][5] = 't';
map[0][9] = 't';
map[2][9] = 't';
map[4][9] = 't';
map[6][9] = 't';
map[0][13] = 't';
map[2][13] = 't';
map[4][13] = 't';
map[6][13] = 't';

function startGame() {
    gameArea.start();
    // creating other canvas
    wall = new component(20, urt, "green", urt + 30, 0, 0, "wall");
    // tower = new component(titleWidth, titleHeigth, "black", 0 * titleWidth, 5 * titleHeigth, 200, tower);
    for (var i = 0; i < 12; i++){
        var x = 5, y = 0;
        tower.push(new component(titleWidth, titleHeigth, "black", x * titleWidth, y * titleHeigth, 200, tower));
        y += 2;
        if (y > 6){
            y = 0;
            x += 4;
        }
    }
}

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        ondor = 720;
        urt = 1280;
        this.canvas.width = worldWidth* titleWidth;
        this.canvas.height = worldHeight * titleHeigth;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGA, 20);
    },
    // clearing screen
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },


    stop : function(){
        clearInterval(this.interval);
    }
}

function everyinterval(n) {
    if ((gameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}
// creating boxes
function component(width, height, color, x, y, health, type) {
    
    this.type = type;
    if (this.type == "image"){
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.health = health

    this.update = function(){

        ctx = gameArea.context;
        if(type == "image"){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }else{
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    // checking crashed with otherbj
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);

        var mytop = this.y;
        var mybottom = this.y + (this.height);

        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);

        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);

        var crash = true;
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
           crash = false;
        }

        return crash;
    }
// checking point
    this.nodeChek = function(k){
        var i = Math.floor(this.y / titleHeigth);
        var j = Math.floor(this.x / titleWidth);
        switch(map[i][j]){
            case 'u':
                xDir[k] = 0;
                yDir[k] = -1 * ySpeed;
                break;
            case 'r':   
                xDir[k] = xSpeed;
                yDir[k] = 0;
                break;
            case 'd':    
                xDir[k] = 0;
                yDir[k] = ySpeed;
                break;
            case 'l':
                xDir[k] = -1 * xSpeed;
                yDir[k] = 0;
                break;
            default :
                break;
        }
    }
    this.erase = function(k){
        var b = this[this.length - 1];
        this[this.length - 1] = this[k];
        this[k] = b;
        this.pop();
    }
// tower 
    this.inTowerRange = function(k){
        var x1 = this.x;
        var y1 = this.y;

        var x2 = tower[k].x;
        var y2 = tower[k].y;

        var range = tower[k].health;
        var tarHealth = this.health;

        var curDis = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) + (y1 - y2));

        if (curDis <= range){
            var size = box.length - 1;
            // box[k].clear();
            // box[k].erase(k);
            var b = box[size];
            box[size] = box[k];
            box[k] = b;
            box.pop();
            var b = xDir[size];
            xDir[size] = xDir[k];
            XDir[k] = b;
            XDir.pop();
            var b = yDir[size];
            yDir[size] = yDir[k];
            yDir[k] = b;
            yDir.pop();
        }
    }
    this.erase = function(k){
        var b = this[this.length - 1];
        this[this.length - 1] = this[k];
        this[k] = b;
        this.pop();
    }
}

// function writeMessage(canvas, message){
// var context = canvas.getContext('2d');
// context.clearRect(0, 0, canvas.width, canvas.height);
// context.font = '18pt Calibri';
// context.fillStyle = 'black';
// context.fillText(message, 10, 25);
// }

// function getMousePos(canvas, evt) {
// var rect = canvas.getBoundingClientRect();
// return {
//   x: evt.clientX - rect.left,
//   y: evt.clientY - rect.top
// };
// }
// var canvas = document.getElementById('myCanvas');
// var context = canvas.getContext('2d');

// canvas.addEventListener('mousemove', function(evt) {
// var mousePos = getMousePos(canvas, evt);
// var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
// writeMessage(canvas, message);
// }, false);

