function handleMouseDown(e) {

	oGame.initBorders();
	
	if(e.offsetX || e.offsetY) {
        x = e.offsetX;
		y = e.offsetY;
    }
    else if(e.layerX || e.layerY){
        x = e.layerX;
		y = e.layerY;
    } 
	
	oGame.posColumn = Math.floor(x / oGame.gemWidth); 
    oGame.posRow = Math.floor(y / oGame.gemHeight); 
	
	ctx.lineWidth = 2;
	ctx.strokeStyle = 'red';
	ctx.strokeRect(oGame.map[oGame.posRow][oGame.posColumn].x, oGame.map[oGame.posRow][oGame.posColumn].y, oGame.map[oGame.posRow][oGame.posColumn].img.width, oGame.map[oGame.posRow][oGame.posColumn].img.height);	
	
	//var tmp = new Gem(map[posRow][posColumn].img, posColumn*50, posRow*50);
	//map[posRow][posColumn] = new Gem(map[posRow + 1][posColumn].img, posColumn*50, posRow*50);
	//map[posRow + 1][posColumn] = tmp;
}