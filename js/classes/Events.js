/**************************************************************************************************
Call on the onResize() event for resizing the map
**************************************************************************************************/
function resize() {
  eltBtnPlay.style.top = "40%";
  eltBtnScores.style.top = "45%";
  eltBtnOptions.style.top = "50%";

  eltMap.width = Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight);
  eltMap.height = Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight);
  eltMap.style.top = "calc(55% - "+eltMap.width / 2+"px)";
  eltMap.style.left = "calc(55% - "+eltMap.width / 2+"px)";

  var tmp = [];
  var nbCol = 0;
  var nbRow = 0;
  tmp = document.getElementsByClassName("fruit");

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

/**************************************************************************************************
Call when the user click on a fruit
This function enables the user to perform the movement of fruit
**************************************************************************************************/
function handleClick(row, col) {
  if (oGame.selectedCase) {
    oGame.countTransitionEnd = 0;

    var distance = Math.abs(col - oGame.posCol) + Math.abs(row - oGame.posRow);
    if (distance == 1) { // oldFruit and newFruit are adjacent
      var oldFruit = document.getElementById("fruit"+oGame.posRow+"_"+oGame.posCol);
      var newFruit = document.getElementById("fruit"+row+"_"+col);

      if (row == oGame.posRow) {
        var tx = (col - oGame.posCol) * eltMap.width / 9;
        oldFruit.style.transform = "translateX(" + tx + "px)";
        newFruit.style.transform = "translateX(" + (-tx) + "px)";
      } else {
        var ty = (row - oGame.posRow) * eltMap.height / 9;
        oldFruit.style.transform = "translateY(" + ty + "px)";
        newFruit.style.transform = "translateY(" + (-ty) + "px)";
      }

      var oldId = oldFruit.id;
      var newId = newFruit.id;

      oldFruit.id = newId;
      newFruit.id = oldId;

      oGame.oldId = oldId;
      oGame.newId = newId;

      oldFruit.setAttribute('onclick', 'handleClick('+newId.substring(5,6)+','+newId.substring(7,8)+')');
      newFruit.setAttribute('onclick', 'handleClick('+oldId.substring(5,6)+','+oldId.substring(7,8)+')');

      oGame.check();

      if (oGame.listFruitsDestroy.length > 0) {
        for (var i=0;i<oGame.listFruitsDestroy.length;i++) {
          fadeOut(document.getElementById(oGame.listFruitsDestroy[i].id),50);
        }
      } else {
        oldFruit.id = oldId;
        newFruit.id = newId;

        oldFruit.setAttribute('onclick', 'handleClick('+oldId.substring(5,6)+','+oldId.substring(7,8)+')');
        newFruit.setAttribute('onclick', 'handleClick('+newId.substring(5,6)+','+newId.substring(7,8)+')');

        document.getElementById(oldId).style.animation = "";
      }

      oGame.posRow = "";
      oGame.posCol = "";
      oGame.selectedCase = false;
    } else if (distance == 0) { // oldFruit and newFruit are the same
      oGame.posRow = row;
      oGame.posCol = col;
      oGame.selectedCase = true;
    } else {
      if ((oGame.posRow != "") && (oGame.posCol != "")) {
        document.getElementById("fruit"+oGame.posRow+"_"+oGame.posCol).style.animation = "";
      }
      oGame.posRow = row;
      oGame.posCol = col;
      oGame.selectedCase = true;
      document.getElementById("fruit"+row+"_"+col).style.animation = "spin .8s infinite linear";
    }
  } else {
    oGame.posRow = row;
    oGame.posCol = col;
    oGame.selectedCase = true;
    document.getElementById("fruit"+row+"_"+col).style.animation = "spin .8s infinite linear";
  }
}

/**************************************************************************************************
Call when a transition ends
Manages the replacement of the old by the new fruit fruit. (Position, Id, Img, ...)
**************************************************************************************************/
function updateTransform(e) {
  if (oGame.listFruitsDestroy.length == 0) {
    if (this.style.transform.indexOf("translateX") == -1) {
      this.style.transform = "translateY(0px)";
    } else {
      this.style.transform = "translateX(0px)";
    }
  } else {
    if (oGame.countTransitionEnd == 0) {
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
        eltFruit.setAttribute('onclick', 'handleClick('+eltFruit.id.substring(5,6)+','+eltFruit.id.substring(7,8)+')');
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
        eltFruit2.setAttribute('onclick', 'handleClick('+eltFruit2.id.substring(5,6)+','+eltFruit2.id.substring(7,8)+')');
        eltFruit2.addEventListener( 'webkitTransitionEnd', updateTransform, false );
        eltFruit2.addEventListener( 'transitionend', updateTransform, false );
        eltFruit2.addEventListener( 'oTransitionEnd', updateTransform, false );

        eltMap.appendChild(eltFruit);
        eltMap.appendChild(eltFruit2);
      } else {
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
        eltFruit.setAttribute('onclick', 'handleClick('+eltFruit.id.substring(5,6)+','+eltFruit.id.substring(7,8)+')');
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
        eltFruit2.setAttribute('onclick', 'handleClick('+eltFruit2.id.substring(5,6)+','+eltFruit2.id.substring(7,8)+')');
        eltFruit2.addEventListener( 'webkitTransitionEnd', updateTransform, false );
        eltFruit2.addEventListener( 'transitionend', updateTransform, false );
        eltFruit2.addEventListener( 'oTransitionEnd', updateTransform, false );

        eltMap.appendChild(eltFruit);
        eltMap.appendChild(eltFruit2);
      }
      oGame.countTransitionEnd++;
    } else if (oGame.state == "fall") {    
      var oldId = this.id;      
      var row = parseInt(oldId.substring(5,6)) + 1;
      var col = oldId.substring(7,8);
      var newId = "fruit"+row+"_"+col;

      var oldTop = this.style.top;
      var oldLeft = this.style.left;
      var oldSrc = this.src;

      var newTop = document.getElementById(newId).style.top;
      var newLeft = document.getElementById(newId).style.left;
      var newSrc = document.getElementById(newId).src;
      
      eltMap.removeChild(document.getElementById(this.id));
      eltMap.removeChild(document.getElementById(newId));
      
      var eltFruit = document.createElement("img");
      eltFruit.className = "fruit";
      eltFruit.id = newId;
      eltFruit.style.width = eltMap.width / 9 + "px";
      eltFruit.style.height = eltMap.height / 9 + "px";
      eltFruit.style.top = newTop;
      eltFruit.style.left = newLeft;
      eltFruit.style.opacity = 1;
      eltFruit.src = oldSrc;
      eltFruit.setAttribute('onclick', 'handleClick('+eltFruit.id.substring(5,6)+','+eltFruit.id.substring(7,8)+')');
      eltFruit.addEventListener( 'webkitTransitionEnd', updateTransform, false );
      eltFruit.addEventListener( 'transitionend', updateTransform, false );
      eltFruit.addEventListener( 'oTransitionEnd', updateTransform, false );

      var eltFruit2 = document.createElement("img");
      eltFruit2.className = "fruit";
      eltFruit2.id = oldId;
      eltFruit2.style.width = eltMap.width / 9 + "px";
      eltFruit2.style.height = eltMap.height / 9 + "px";
      eltFruit2.style.top = oldTop;
      eltFruit2.style.left = oldLeft;
      eltFruit2.style.opacity = 1;
      eltFruit2.src = newSrc;
      eltFruit2.setAttribute('onclick', 'handleClick('+eltFruit2.id.substring(5,6)+','+eltFruit2.id.substring(7,8)+')');
      eltFruit2.addEventListener( 'webkitTransitionEnd', updateTransform, false );
      eltFruit2.addEventListener( 'transitionend', updateTransform, false );
      eltFruit2.addEventListener( 'oTransitionEnd', updateTransform, false );

      eltMap.appendChild(eltFruit);
      eltMap.appendChild(eltFruit2);
    }
  }
}

/**************************************************************************************************
Shows the pause screen
**************************************************************************************************/
function showPauseOverlay() {
  oTimer.pause();
  eltPauseOverlay.style.display = "block";
  eltPauseResumeButton.addEventListener("click", resume, false);
}

/**************************************************************************************************
Resumes the game
**************************************************************************************************/
function resume() {
  oTimer.start();
  eltPauseOverlay.style.display = "none";
}
