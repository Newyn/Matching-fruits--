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
	
	if (oGame.selectedCase == true) {
	
		if (((oGame.posColumnSelectedCase == oGame.posColumn + 1) && (oGame.posRowSelectedCase == oGame.posRow))
			|| ((oGame.posColumnSelectedCase == oGame.posColumn - 1) && (oGame.posRowSelectedCase == oGame.posRow))
			|| ((oGame.posColumnSelectedCase == oGame.posColumn) && (oGame.posRowSelectedCase == oGame.posRow + 1))
			|| ((oGame.posColumnSelectedCase == oGame.posColumn) && (oGame.posRowSelectedCase == oGame.posRow - 1))) {
			
			var oGemsImg = new Image();
			oGemsImg.src = oGame.map[oGame.posRow][oGame.posColumn].img.src;	
			var oGem = new Gem(oGemsImg, oGame.posColumnSelectedCase*oGame.gemWidth, oGame.posRowSelectedCase*oGame.gemWidth);
			
			var oGemsImg2 = new Image();
			oGemsImg2.src = oGame.map[oGame.posRowSelectedCase][oGame.posColumnSelectedCase].img.src;	
			var oGem2 = new Gem(oGemsImg2, oGame.posColumn*oGame.gemWidth, oGame.posRow*oGame.gemWidth);
			
			
			oGame.map[oGame.posRowSelectedCase][oGame.posColumnSelectedCase] = oGem;
			oGame.map[oGame.posRow][oGame.posColumn] = oGem2;
			
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