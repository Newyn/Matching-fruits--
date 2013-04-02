/**************************************************************************************************
Call on the onResize() event for resizing the map
**************************************************************************************************/
function resize() {
  eltBtnPlay.style.top = "34%";
  eltBtnScores.style.top = "39%";
  eltBtnAchievements.style.top = "44%";
  eltBtnOptions.style.top = "49%";

  eltMap.width = Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight);
  eltMap.height = Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight);
  eltMap.style.top = "calc(55% - "+eltMap.width / 2+"px)";
  eltMap.style.left = "calc(55% - "+eltMap.width / 2+"px)";

  eltBtnPause.style.width = eltMap.width / 10 + "px";
  eltBtnPause.style.height = eltMap.height / 9 + "px";
  eltBtnPause.style.width = eltMap.width / 10 + "px";
  eltBtnPause.style.height = eltMap.height / 9 + "px";

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
function attachClickEvent(fruit) {
  var row = fruit.id.substring(5, 6);
  var col = fruit.id.substring(7, 8);
  fruit.setAttribute('onclick', 'handleClick(' + row + ',' + col + ')');
}

function handleClick(row, col) {
  if (oGame.selectedCase) {
    oGame.countTransitionEnd = 0;

    var distance = Math.abs(col - oGame.posCol) + Math.abs(row - oGame.posRow);

    if (distance == 1) { // oldFruit and newFruit are adjacent
      var oldFruit = getFruit(oGame.posRow, oGame.posCol);
      var newFruit = getFruit(row, col);
      if (row == oGame.posRow) {
        var tx = (col - oGame.posCol) * eltMap.width / 9;
        oldFruit.style.transform = "translateX(" + tx + "px)";
        newFruit.style.transform = "translateX(" + (-tx) + "px)";
        oldFruit.style.webkitTransform = "translateX(" + tx + "px)";
        newFruit.style.webkitTransform = "translateX(" + (-tx) + "px)";
      } else {
        var ty = (row - oGame.posRow) * eltMap.height / 9;
        oldFruit.style.transform = "translateY(" + ty + "px)";
        newFruit.style.transform = "translateY(" + (-ty) + "px)";
        oldFruit.style.webkitTransform = "translateY(" + ty + "px)";
        newFruit.style.webkitTransform = "translateY(" + (-ty) + "px)";
      }

      var oldId = oldFruit.id;
      var newId = newFruit.id;

      oldFruit.id = newId;
      newFruit.id = oldId;

      oGame.oldId = oldId;
      oGame.newId = newId;

      attachClickEvent(oldFruit);
      attachClickEvent(newFruit);

      oGame.check();

      if (oGame.listFruitsDestroy.length > 0) {
        for (var i=0;i<oGame.listFruitsDestroy.length;i++) {
          fadeOut(document.getElementById(oGame.listFruitsDestroy[i].id), 50);
          oGame.updateScore(1000);
        }
      } else {
        console.log("Fruits destroy == 0");
        oldFruit.id = oldId;
        newFruit.id = newId;

        attachClickEvent(oldFruit);
        attachClickEvent(newFruit);

        document.getElementById(oldId).classList.remove('spinning');
      }

      oGame.posRow = "";
      oGame.posCol = "";
      oGame.selectedCase = false;
    } else if (distance == 0) { // oldFruit and newFruit are the same
      console.log("Distance == 0");
      oGame.posRow = row;
      oGame.posCol = col;
      oGame.selectedCase = true;
    } else {
      console.log("Distance > 1");
      if ((oGame.posRow !== "") && (oGame.posCol !== "")) {
        getFruit(oGame.posRow, oGame.posCol).classList.remove('spinning');
      }
      oGame.posRow = row;
      oGame.posCol = col;
      oGame.selectedCase = true;
      getFruit(row, col).classList.add('spinning');
    }
  } else {
    console.log("Select case");
    oGame.posRow = row;
    oGame.posCol = col;
    oGame.selectedCase = true;
    getFruit(row, col).classList.add('spinning');
  }
}

/**************************************************************************************************
Call when a transition ends
Manages the replacement of the old by the new fruit fruit. (Position, Id, Img, ...)
**************************************************************************************************/
function updateTransform(e) {
  if (oGame.listFruitsDestroy.length == 0) {
    this.style.transform = "translate(0,0)";
    this.style.webkitTransform = "translate(0,0)";
  } else {
    if (oGame.countTransitionEnd == 0) {
      var oldFruit = document.getElementById(oGame.oldId);
      var newFruit = document.getElementById(oGame.newId);

      var oldTop  = oldFruit.style.top;
      var oldLeft = oldFruit.style.left;
      var oldSrc  = oldFruit.src;

      var newTop  = newFruit.style.top;
      var newLeft = newFruit.style.left;
      var newSrc  = newFruit.src;

      eltMap.removeChild(oldFruit);
      eltMap.removeChild(newFruit);

      var fruit1, fruit2;
      if (!isDestroyed(e.target)) {
        fruit1 = createFruit(oGame.oldId, newTop, newLeft, oldSrc);
        fruit2 = createFruit(oGame.newId, oldTop, oldLeft, listFruitImages[8]);
      } else {
        fruit1 = createFruit(oGame.oldId, newTop, newLeft, listFruitImages[8]);
        fruit2 = createFruit(oGame.newId, oldTop, oldLeft, newSrc);
      }

      eltMap.appendChild(fruit1);
      eltMap.appendChild(fruit2);

      oGame.listFruitsDestroy = [];
      oGame.fall();
      oGame.checkRelapse();
      oGame.countTransitionEnd++;
    } else if (oGame.state == "fall") {
      oGame.listFruitsDestroy = [];
      oGame.fall();
      oGame.checkRelapse();
    }
  }
}
