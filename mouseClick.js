var curType = 0;

function button(x, y, width, height, color){
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.color = color;

	this.update = function(){
		ctx = gameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

var rect1 = {
	x : 100,
	y : worldHeight * titleHeigth,
	width : 100,
	height : 100
}

var rect2 = {
	x : 200,
	y : worldHeight * titleHeigth,
	width : 100,
	height : 100
}

var rect3 = {
	x : 300,
	y : worldHeight * titleHeigth,
	width : 100,
	height : 100
}

var rect4 = {
	x : 400,
	y : worldHeight * titleHeigth,
	width : 100,
	height : 100
}

function isInside(posX, posY, rect){
	return posX > rect.x && posX < rect.x + rect.width && 
			posY < rect.y + rect.height && posY > rect.y
}


gameArea.canvas.addEventListener('click', function() {
	var i  = Math.floor(i = mouse.y / titleHeigth),
	j = Math.floor(mouse.x / titleWidth);
	if (isInside(mouse.x, mouse.y, rect1))
		curType = 1;
	else if (isInside(mouse.x, mouse.y, rect2))
		curType = 2;
	else if (isInside(mouse.x, mouse.y, rect3))
		curType = 3;
	else if (isInside(mouse.x, mouse.y, rect4))
		curType = 4
	else
		switch (curType){
			case 1:
				if (towerAllowed(i, j))
					addDemonicTower(i, j);
				break;	
			case 2:
				if (towerAllowed(i, j))
					addWaterTower(i, j);
				break;
			case 3:
				upgradeTowerDmg();
				break;
			case 4:
				upgradeTowerRange();
			default:
				break;
			
		}
		
}, false);

function getMousePos(evt) {
	var rect = gameArea.canvas.getBoundingClientRect();
	mouse = {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
} 

window.addEventListener('mousemove', getMousePos, false);

function towerAllowed(i, j){
	if (map[i][j] == 'e' && towerPrice <= money){
		return true;
	}
	return false;
}
