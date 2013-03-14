function resize() {

	console.log(eltMap.marginTop);
	
	if (document.documentElement.clientWidth > document.documentElement.clientHeight) {
		side = document.documentElement.clientHeight;
	} else {
		side = document.documentElement.clientWidth;
	}

	eltMap.width = side;
	eltMap.height = side;
	
	var tmp = [];
	tmp = document.getElementsByClassName("fruit");
	
	var nbCol = 0;
	var nbRow = 0;
	
	for (var i=0; i<tmp.length; i++) {
		
		if (nbCol == 8) {
			nbRow++;
			nbCol = 0;
		}
		
		tmp[i].style.width = eltMap.width / 9 + "px";
		tmp[i].style.height = eltMap.height / 9 + "px";
		tmp[i].style.top = nbRow*(eltMap.height / 9) +"px";
		tmp[i].style.left = nbCol*(eltMap.width / 9) +"px";
		
		nbCol++;
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
			
			var tmp;
			
			if ((col == oGame.posCol + 1) && (row == oGame.posRow)) {
				tmp = newFruit.x - oldFruit.x + 1
				oldFruit.style.transform = "translateX("+tmp+"px)";
				newFruit.style.transform = "translateX(-"+tmp+"px)";
			} else if ((col == oGame.posCol - 1) && (row == oGame.posRow)) {
				tmp = oldFruit.x - newFruit.x - 1;	
				oldFruit.style.transform = "translateX(-"+tmp+"px)";
				newFruit.style.transform = "translateX("+tmp+"px)";
				
			} else if ((col == oGame.posCol) && (row == oGame.posRow + 1)) {
				tmp = newFruit.y - oldFruit.y + 1;	
				oldFruit.style.transform = "translateY("+tmp+"px)";
				newFruit.style.transform = "translateY(-"+tmp+"px)";
			} else if ((col == oGame.posCol) && (row == oGame.posRow - 1)) {
				tmp = oldFruit.y - newFruit.y - 1;	
				oldFruit.style.transform = "translateY(-"+tmp+"px)";
				newFruit.style.transform = "translateY("+tmp+"px)";
			}
			
			var oldId = oldFruit.id;
			var newId = newFruit.id;
			
			oldFruit.id = newId;
			newFruit.id = oldId;
			
			oGame.oldId = oldId;
			oGame.newId = newId;
			
			oldFruit.setAttribute('OnClick', 'handleClick('+newId.substring(5,6)+','+newId.substring(7,8)+')');
			newFruit.setAttribute('OnClick', 'handleClick('+oldId.substring(5,6)+','+oldId.substring(7,8)+')');
	
			document.getElementById(oldId).style.border = "1px solid white";
			document.getElementById(newId).style.border = "1px solid white";
		
			oGame.check();
			
			if (oGame.listFruitsDestroy.length > 0) {
				for (var i=0;i<oGame.listFruitsDestroy.length;i++) {
					fadeOut(document.getElementById(oGame.listFruitsDestroy[i].id), 500);
				}
			} else {
				oldFruit.id = oldId;
				newFruit.id = newId;
				
				oldFruit.setAttribute('OnClick', 'handleClick('+oldId.substring(5,6)+','+oldId.substring(7,8)+')');
				newFruit.setAttribute('OnClick', 'handleClick('+newId.substring(5,6)+','+newId.substring(7,8)+')');
			}
			
			oGame.posRow = "";
			oGame.posCol = "";
			oGame.selectedCase = false;
			
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

function updateTransform(e) {
	if (oGame.listFruitsDestroy.length == 0) {
		this.style.transform = "translateX(0px)";
		this.style.transform = "translateY(0px)";
	} else {
		if (document.getElementById(oGame.oldId).style.transform != "translateY(0px)") {

			document.getElementById(oGame.oldId).style.transform  = "translateX(0px)";
			document.getElementById(oGame.oldId).style.transform  = "translateY(0px)";
			
			document.getElementById(oGame.newId).style.transform  = "translateX(0px)";
			document.getElementById(oGame.newId).style.transform  = "translateY(0px)";
			
			var old_src = document.getElementById(oGame.oldId).src;
			
			document.getElementById(oGame.oldId).src = document.getElementById(oGame.newId).src;
			document.getElementById(oGame.oldId).style.opacity = 0;
			
			document.getElementById(oGame.newId).src = old_src;
			document.getElementById(oGame.newId).style.opacity = 1;
		} else {
			
		}
	}	
}

function showPauseOverlay() {
	eltPauseOverlay.style.display = "block";
	eltPauseResumeButton.addEventListener("click", resume, false);
}

function resume() {
	eltPauseOverlay.style.display = "none";
}