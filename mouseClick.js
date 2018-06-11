
gameArea.canvas.addEventListener('mousedown', function() {
	var i  = Math.floor(i = mouse.y / titleHeigth),
	j = Math.floor(mouse.x / titleWidth);
	if(towerAllowed(i, j)) {
		addTower(i, j);
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
	if (map[i][j] == 'e')
		return true;
	return false;
}
