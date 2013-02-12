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
	
	oGame.posColumn = Math.floor(x / oGame.fruitWidth); 
    oGame.posRow = Math.floor(y / oGame.fruitHeight); 
	
	ctx.lineWidth = 2;
	ctx.strokeStyle = 'red';
	ctx.strokeRect(oGame.map[oGame.posRow][oGame.posColumn].x, oGame.map[oGame.posRow][oGame.posColumn].y, oGame.map[oGame.posRow][oGame.posColumn].img.width, oGame.map[oGame.posRow][oGame.posColumn].img.height);	
	
	if (oGame.selectedCase == true) {
	
		if (((oGame.posColumnSelectedCase == oGame.posColumn + 1) && (oGame.posRowSelectedCase == oGame.posRow))
			|| ((oGame.posColumnSelectedCase == oGame.posColumn - 1) && (oGame.posRowSelectedCase == oGame.posRow))
			|| ((oGame.posColumnSelectedCase == oGame.posColumn) && (oGame.posRowSelectedCase == oGame.posRow + 1))
			|| ((oGame.posColumnSelectedCase == oGame.posColumn) && (oGame.posRowSelectedCase == oGame.posRow - 1))) {
			
			var oFruitsImg = new Image();
			oFruitsImg.src = oGame.map[oGame.posRow][oGame.posColumn].img.src;	
			var oFruit = new Fruit(oFruitsImg, oGame.posColumnSelectedCase*oGame.fruitWidth, oGame.posRowSelectedCase*oGame.fruitWidth);
			
			var oFruitsImg2 = new Image();
			oFruitsImg2.src = oGame.map[oGame.posRowSelectedCase][oGame.posColumnSelectedCase].img.src;	
			var oFruit2 = new Fruit(oFruitsImg2, oGame.posColumn*oGame.fruitWidth, oGame.posRow*oGame.fruitWidth);
			
			
			oGame.map[oGame.posRowSelectedCase][oGame.posColumnSelectedCase] = oFruit;
			oGame.map[oGame.posRow][oGame.posColumn] = oFruit2;
			
			oGame.check();
			
			oGame.selectedCase = false;
			oGame.posColumnSelectedCase = "";
			oGame.posRowSelectedCase = "";
			
			
		}
		else {
			oGame.selectedCase = true;
			oGame.posColumnSelectedCase = oGame.posColumn;
			oGame.posRowSelectedCase = oGame.posRow;
		}
	}
	else {
		oGame.selectedCase = true;
		oGame.posColumnSelectedCase = oGame.posColumn;
		oGame.posRowSelectedCase = oGame.posRow;
	}	
}