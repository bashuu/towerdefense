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
    wall = new component(20, urt, "green", urt + 30, 0);
    tower1 = new component(titleWidth, titleHeigth, "black", 5 * titleWidth, 0 * titleHeigth);
    tower2 = new component(titleWidth, titleHeigth, "black", 5 * titleWidth, 2 * titleHeigth);
    tower3 = new component(titleWidth, titleHeigth, "black", 5 * titleWidth, 4 * titleHeigth);
    tower4 = new component(titleWidth, titleHeigth, "black", 5 * titleWidth, 6 * titleHeigth);

    tower5 = new component(titleWidth, titleHeigth, "black", 9 * titleWidth, 0 * titleHeigth);
    tower6 = new component(titleWidth, titleHeigth, "black", 9 * titleWidth, 2 * titleHeigth);
    tower7 = new component(titleWidth, titleHeigth, "black", 9 * titleWidth, 4 * titleHeigth);
    tower8 = new component(titleWidth, titleHeigth, "black", 9 * titleWidth, 6 * titleHeigth);

    tower9 = new component(titleWidth, titleHeigth, "black", 13 * titleWidth, 0 * titleHeigth);
    tower10 = new component(titleWidth, titleHeigth, "black", 13 * titleWidth, 2 * titleHeigth);
    tower11 = new component(titleWidth, titleHeigth, "black", 13 * titleWidth, 4 * titleHeigth);
    tower12 = new component(titleWidth, titleHeigth, "black", 13 * titleWidth, 6 * titleHeigth);
    
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
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    

    this.update = function(){
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
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
}
// updating Screen

function updateGA(){
    // checking box entered the base
    for (var k = 0; k < box.length; k += 1) {
        if (box[k].crashWith(wall)) {
            gameArea.stop();
            return;
        } 
    }
    gameArea.clear();
    gameArea.frameNo += 3;

    //creating box every 40 frame
    if (gameArea.frameNo == 1 || everyinterval(40)) {
        box.push(new component(30, 30, "red", 10, 1 * titleHeigth))
        xDir.push(xSpeed);
        yDir.push(0);
    }
    // checking where is box is and updating them
    for (var k = 0; k < box.length; k += 1) {
        box[k].nodeChek(k);
        box[k].x += xDir[k];
        box[k].y += yDir[k];
        box[k].update();
    }
    
    tower1.update();
    tower2.update();
    tower3.update();
    tower4.update();
    tower5.update();
    tower6.update();
    tower7.update();
    tower8.update();
    tower9.update();
    tower10.update();
    tower11.update();
    tower12.update();

    wall.update();
 
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

