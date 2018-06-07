function updateGA(){
    // checking box entered the base
    for (var k = 0; k < box.length; k += 1) {
        if (box[k].crashWith(wall)) {
            alert("Game over");
            gameArea.stop();
            return;
        } 
    }
    gameArea.clear();
    gameArea.frameNo += 3;

    //creating box every 40 frame
    if (gameArea.frameNo == 1 || everyinterval(10)) {
        box.push(new component(30, 50, "sprite.PNG", 10, 1 * titleHeigth, 5, "image"))
        xDir.push(xSpeed);
        yDir.push(0);
    }
    // checking where is box is and updating them
    for (var k = 0; k < box.length; k += 1) {
        box[k].nodeChek(k)
        box[k].x += xDir[k];
        box[k].y += yDir[k];
        box[k].update();
    }
    
    // tower1.update();
    // tower2.update();
    // tower3.update();
    // tower4.update();
    // tower5.update();
    // tower6.update();
    // tower7.update();
    // tower8.update();
    // tower9.update();
    // tower10.update();
    // tower11.update();
    // tower12.update();

    wall.update();
    // if (box[k].crashWith(tower1)){
    //     if(everyinterval(30))
    //         box[k].health -= 1;
    // }

}