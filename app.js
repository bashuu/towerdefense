var box = [];
var wall;
var ondor, urt;
var i = [2]; j = [0];

function startGame() {
    gameArea.start();
    wall = new component(20, urt, "green", urt + 30, 0);
}

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        ondor = 720;
        urt = 1280;
        this.canvas.width = urt;
        this.canvas.height = ondor;
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
        // ctx.moveTo(200, 350);
        // ctx.lineTo(200, 100);ctx.stroke();
        // ctx.moveTo(200, 100);
        // ctx.lineTo(1100, 100);ctx.stroke();
        // ctx.moveTo(1100, 100);
        // ctx.lineTo(1100, 250);ctx.stroke();
        // ctx.moveTo(1100, 250);
        // ctx.lineTo(350, 250);ctx.stroke();
        // ctx.moveTo(350, 250);
        // ctx.lineTo(350, 450);ctx.stroke();
        // ctx.moveTo(350, 450);
        // ctx.lineTo(10000, 450);
        // ctx.stroke();
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
        if (this.x == 200 && this.y == 360){
            i[k] = 0;
            j[k] = -2;
        }
        if (this.x == 200 && this.y == 100){
            i[k] = 2;
            j[k] = 0;
        }if (this.x == 1100 && this.y == 100){
            i[k] = 0;
            j[k] = 2;
        }if (this.x == 1100 && this.y == 250){
            i[k] = -2;
            j[k] = 0;
        }if (this.x == 350 && this.y == 250){
            i[k] = 0;
            j[k] = 2;
        }if (this.x == 350 && this.y == 450){
            i[k] = 2;
            j[k] = 0;
        }
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
        i.push(2);
        j.push(0);
    }

    for (var k = 0; k < box.length; k += 1) {
        box[k].nodeChek(k);
        box[k].x += i[k];
        box[k].y += j[k];
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

