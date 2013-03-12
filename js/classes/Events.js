function resize() {

	console.log(eltMap.marginTop);
	
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
/*		if (this.style.opacity == 1) {
		
			var nbPix = 0;
			var typeTransform = "";
			
			if (this.style.transform.length == 17) {
				nbPix = this.style.transform.substring(11, 14);
			} else if (this.style.transform.length == 16) {
				nbPix = this.style.transform.substring(11, 13);
			}
		
			if (this.style.transform.indexOf("Y") == -1) {
				typeTransform = "X";
			} else {
				typeTransform = "Y";
			}
			//this.style.transform = "translateX(-60px)";
			//this.style.transform = "translateY(0px)";

			if (typeTransform == "X") {
				document.getElementById(this.id).x = document.getElementById(this.id).x + nbPix;
			} else {
				document.getElementById(this.id).y = document.getElementById(this.id).y + nbPix;
			}

		}
*/
	}	
}

function showPauseOverlay() {
	eltPauseOverlay.style.display = "block";
	eltPauseResumeButton.addEventListener("click", resume, false);
}

function resume() {
	eltPauseOverlay.style.display = "none";
}