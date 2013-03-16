function resize() {

	console.log(eltMap.marginTop);
	
	if (document.documentElement.clientWidth > document.documentElement.clientHeight) {
		side = document.documentElement.clientHeight;
	} else {
		side = document.documentElement.clientWidth;
	}

	eltMap.width = side;
	eltMap.height = side;
	
	eltMap.style.top = "calc(55% - "+side/2+"px)";
	eltMap.style.left = "calc(55% - "+side/2+"px)";
	
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
		tmp[i].style.top = nbRow * (eltMap.height / 9) +"px";
		tmp[i].style.left = nbCol * (eltMap.width / 9) +"px";
		
		nbCol++;
	}
}

function handleClick(row, col) {
	
	if (oGame.selectedCase) {
	
		oGame.countTransitionEnd = 0;
		
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
		
			oGame.check();
			
			if (oGame.listFruitsDestroy.length > 0) {
			
				for (var i=0;i<oGame.listFruitsDestroy.length;i++) {
					fadeOut(document.getElementById(oGame.listFruitsDestroy[i].id),50);
				}
				
				oGame.fall();
			} else {
				oldFruit.id = oldId;
				newFruit.id = newId;
				
				oldFruit.setAttribute('OnClick', 'handleClick('+oldId.substring(5,6)+','+oldId.substring(7,8)+')');
				newFruit.setAttribute('OnClick', 'handleClick('+newId.substring(5,6)+','+newId.substring(7,8)+')');
				
				document.getElementById(oldId).style.MozAnimation = "";
			}
			
			oGame.posRow = "";
			oGame.posCol = "";
			oGame.selectedCase = false;
			
		} else if ((col == oGame.posCol) && (row == oGame.posRow)) {
			oGame.posRow = row;
			oGame.posCol = col;
			oGame.selectedCase = true;
		}
		else {
			if ((oGame.posRow != "") && (oGame.posCol != "")) {
				document.getElementById("fruit"+oGame.posRow+"_"+oGame.posCol).style.MozAnimation = "";
			}
		
			oGame.posRow = row;
			oGame.posCol = col;
			
			oGame.selectedCase = true;
			
			document.getElementById("fruit"+row+"_"+col).style.MozAnimation = "spin .8s infinite linear";
		}	
	} else {
		
		oGame.posRow = row;
		oGame.posCol = col;
		
		oGame.selectedCase = true;
		document.getElementById("fruit"+row+"_"+col).style.MozAnimation = "spin .8s infinite linear";
	}
}

function updateTransform(e) {
	if (oGame.listFruitsDestroy.length == 0) {
		this.style.transform = "translateX(0px)";
		this.style.transform = "translateY(0px)";
	} else {	
		if (oGame.countTransitionEnd == 0) {
			console.log(e.target);
			if (e.target.src.indexOf("destroy.png") == -1) {		
				var oldTop = document.getElementById(oGame.oldId).style.top;
				var oldLeft = document.getElementById(oGame.oldId).style.left;
				var oldSrc = document.getElementById(oGame.oldId).src;
				
				var newTop = document.getElementById(oGame.newId).style.top;
				var newLeft = document.getElementById(oGame.newId).style.left;
				var newSrc = document.getElementById(oGame.newId).src;
				
				eltMap.removeChild(document.getElementById(oGame.oldId));
				eltMap.removeChild(document.getElementById(oGame.newId));
				
				var eltFruit = document.createElement("img");
				eltFruit.className = "fruit";
				eltFruit.id = oGame.oldId;
				eltFruit.style.width = eltMap.width / 9 + "px";
				eltFruit.style.height = eltMap.height / 9 + "px";
				eltFruit.style.top = newTop;
				eltFruit.style.left = newLeft;
				eltFruit.style.opacity = 1;
				eltFruit.src = oldSrc;
				eltFruit.setAttribute('OnClick', 'handleClick('+eltFruit.id.substring(5,6)+','+eltFruit.id.substring(7,8)+')');
				eltFruit.addEventListener( 'webkitTransitionEnd', updateTransform, false );
				eltFruit.addEventListener( 'transitionend', updateTransform, false );
				eltFruit.addEventListener( 'oTransitionEnd', updateTransform, false );
				
				var eltFruit2 = document.createElement("img");
				eltFruit2.className = "fruit";
				eltFruit2.id = oGame.newId;
				eltFruit2.style.width = eltMap.width / 9 + "px";
				eltFruit2.style.height = eltMap.height / 9 + "px";
				eltFruit2.style.top = oldTop;
				eltFruit2.style.left = oldLeft;
				eltFruit2.style.opacity = 1;
				eltFruit2.src = listFruitImages[8];
				eltFruit2.setAttribute('OnClick', 'handleClick('+eltFruit2.id.substring(5,6)+','+eltFruit2.id.substring(7,8)+')');
				eltFruit2.addEventListener( 'webkitTransitionEnd', updateTransform, false );
				eltFruit2.addEventListener( 'transitionend', updateTransform, false );
				eltFruit2.addEventListener( 'oTransitionEnd', updateTransform, false );
				
				eltMap.appendChild(eltFruit);
				eltMap.appendChild(eltFruit2);
			} 
			else {
				var oldTop = document.getElementById(oGame.newId).style.top;
				var oldLeft = document.getElementById(oGame.newId).style.left;
				var oldSrc = document.getElementById(oGame.oldId).src;
				
				var newTop = document.getElementById(oGame.oldId).style.top;
				var newLeft = document.getElementById(oGame.oldId).style.left;
				var newSrc = document.getElementById(oGame.newId).src;
				
				eltMap.removeChild(document.getElementById(oGame.oldId));
				eltMap.removeChild(document.getElementById(oGame.newId));
				
				var eltFruit = document.createElement("img");
				eltFruit.className = "fruit";
				eltFruit.id = oGame.oldId;
				eltFruit.style.width = eltMap.width / 9 + "px";
				eltFruit.style.height = eltMap.height / 9 + "px";
				eltFruit.style.top = oldTop;
				eltFruit.style.left = oldLeft;
				eltFruit.style.opacity = 1;
				eltFruit.src = listFruitImages[8];
				eltFruit.setAttribute('OnClick', 'handleClick('+eltFruit.id.substring(5,6)+','+eltFruit.id.substring(7,8)+')');
				eltFruit.addEventListener( 'webkitTransitionEnd', updateTransform, false );
				eltFruit.addEventListener( 'transitionend', updateTransform, false );
				eltFruit.addEventListener( 'oTransitionEnd', updateTransform, false );
				
				var eltFruit2 = document.createElement("img");
				eltFruit2.className = "fruit";
				eltFruit2.id = oGame.newId;
				eltFruit2.style.width = eltMap.width / 9 + "px";
				eltFruit2.style.height = eltMap.height / 9 + "px";
				eltFruit2.style.top = newTop;
				eltFruit2.style.left = newLeft;
				eltFruit2.style.opacity = 1;
				eltFruit2.src = newSrc;
				eltFruit2.setAttribute('OnClick', 'handleClick('+eltFruit2.id.substring(5,6)+','+eltFruit2.id.substring(7,8)+')');
				eltFruit2.addEventListener( 'webkitTransitionEnd', updateTransform, false );
				eltFruit2.addEventListener( 'transitionend', updateTransform, false );
				eltFruit2.addEventListener( 'oTransitionEnd', updateTransform, false );
				
				eltMap.appendChild(eltFruit);
				eltMap.appendChild(eltFruit2);
			}

			oGame.countTransitionEnd++;
		}
	}	
}

function showPauseOverlay() {
	oTimer.pause();
	eltPauseOverlay.style.display = "block";
	eltPauseResumeButton.addEventListener("click", resume, false);
}

function resume() {
	oTimer.start();
	eltPauseOverlay.style.display = "none";
}