var box = [];
var wall;
var ondor, urt;
var i = [2]; j = [0];
var worldWidth = 20;
var worldHeight = 7;
var titleWidth = 64;
var titleHeigth = 90;

var map = [];
for(i = 0; i < worldHeight; i++) {
    map[i] = [];
    for(j = 0; j < worldWidth; j++) {
        map[i][j] = 0;
    }
}

function startGame() {
    gameArea.start();
    wall = new component(20, urt, "green", urt + 30, 0);
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

    this.nodeChek = function(k){
    }
}

function updateGA(){
    for (var k = 0; k < box.length; k += 1) {
        if (box[k].crashWith(wall)) {
            gameArea.stop();
            return;
        } 
    }
    gameArea.clear();
    gameArea.frameNo +=3;

    if (gameArea.frameNo == 1 || everyinterval(150)) {
        box.push(new component(30, 30, "red", 10, ondor / 2));
    }

    for (var k = 0; k < box.length; k += 1) {
        // box[k].nodeChek(k);
        box[k].x += 1;
        box[k].y += 0;
        box[k].update();
    }

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

