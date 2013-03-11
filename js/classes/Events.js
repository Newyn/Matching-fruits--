function resize() {

	eltMap.width = document.documentElement.clientWidth;
	eltMap.height = document.documentElement.clientHeight;
	
	var tmp = [];
	tmp = document.getElementsByClassName("fruit");
	
	for (var i=0; i<tmp.length; i++) {
		tmp[i].style.width = eltMap.width / 12 + "px";
		tmp[i].style.height = eltMap.height / 12 + "px";
	}
}

function handleClick(row, col) {

	if (oGame.selectedCase) {
	
		if (((col == oGame.posCol + 1) && (row == oGame.posRow))
			|| ((col == oGame.posCol - 1) && (row == oGame.posRow))
			|| ((col == oGame.posCol) && (row == oGame.posRow + 1))
			|| ((col == oGame.posCol) && (row == oGame.posRow - 1))) {

			var oldFruit = document.getElementById("fruit"+oGame.posRow+"_"+oGame.posCol);
			var newFruit = document.getElementById("fruit"+row+"_"+col);
			
			var oldSrc = oldFruit.src;
			var newSrc = newFruit.src;
			
			oldFruit.src = newSrc;
			newFruit.src = oldSrc;		

			document.getElementById("fruit"+oGame.posRow+"_"+oGame.posCol).style.border = "1px solid white";
		
			oGame.posRow = "";
			oGame.posCol = "";
			oGame.selectedCase = false;
			
			oGame.check();

			if (oGame.listFruitsDestroy.length > 0) {
				for (var i=0;i<oGame.listFruitsDestroy.length;i++) {
					document.getElementById(oGame.listFruitsDestroy[i].id).src = listFruitImages[7];
				}	
			} else {
				oldFruit.src = oldSrc;
				newFruit.src = newSrc;
			}
			
		} else {
		
			document.getElementById("fruit"+oGame.posRow+"_"+oGame.posCol).style.border = "1px solid white";
			
			oGame.posRow = row;
			oGame.posCol = col;
			
			oGame.selectedCase = true;

			document.getElementById("fruit"+row+"_"+col).style.border = "1px solid red";
		}
		
		
	} else {

		oGame.posRow = row;
		oGame.posCol = col;
		
		oGame.selectedCase = true;

		document.getElementById("fruit"+row+"_"+col).style.border = "1px solid red";
	}
}

function showPauseOverlay() {
	eltPauseOverlay.style.display = "block";
	eltPauseResumeButton.addEventListener("click", resume, false);
}

function resume() {
	eltPauseOverlay.style.display = "none";
}