/**************************************************************************************************
Constructor
**************************************************************************************************/
function Game() {

  // Game music
  this.music = new Audio("resources/music/GameMusic.ogg");
  this.music.loop = true;
  this.music.volume = 0.5;
  this.music.load();
  this.music.play();

  // Map set to 8 rows and 8 columns
  this.fruits = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ]; 
   
  this.posRow = "";
  this.posCol = "";
  this.selectedCase = false;
  this.listFruitsDestroy = [];
  this.countTransitionEnd = 0;
  
  this.oldId = "";
  this.newId = "";
  
  this.state = "";
  
  this.currentScore = 0;
  
  this.mode = "";
}

/**************************************************************************************************
Initializes the game
**************************************************************************************************/
Game.prototype.initialize = function() {
  eltMap.width = Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight);
  eltMap.height = Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight);
  eltMap.style.top = "calc(55% - "+eltMap.width / 2+"px)";
  eltMap.style.left = "calc(55% - "+eltMap.width / 2+"px)";
  
  eltBtnPause.style.width = eltMap.width / 10 + "px";
  eltBtnPause.style.height = eltMap.height / 9 + "px";
  eltBtnPause.addEventListener("click", showPauseOverlay, false);
  
  eltBtnReload.style.width = eltMap.width / 10 + "px";
  eltBtnReload.style.height = eltMap.height / 9 + "px";
  eltBtnReload.addEventListener("click", this.reload, false);
  
  // Disable for the moment because it's annoying when we develop
  //window.addEventListener("blur", showPauseOverlay);

  this.buildMap();
  
  eltGame.style.display = "none";
  eltMap.style.display = "block";
  eltBtnPause.style.display = "block";
  eltBtnReload.style.display = "block";
  eltTimer.style.display = "block";
  eltScore.style.display = "block";
  document.body.style.backgroundColor = "#80D5FE";
  
  oTimer.start();
}

/**************************************************************************************************
Builds the map
**************************************************************************************************/
Game.prototype.buildMap = function() {
  for (i=0;i<8;i++) {  
    for(j=0;j<8;j++) {
      do  {
        this.fruits[i][j] = Math.floor(Math.random()*8);
        while (this.fruits[i][j] == 0) {
          this.fruits[i][j] = Math.floor(Math.random()*8);
        }
      }  while(this.isStreak(i,j));
      
      var eltFruit = document.createElement("img");
      eltFruit.className = "fruit";
      eltFruit.id = "fruit"+i+"_"+j;
      eltFruit.style.width = eltMap.width / 9 + "px";
      eltFruit.style.height = eltMap.height / 9 + "px";
      eltFruit.style.top = i * (eltMap.height / 9) +"px";
      eltFruit.style.left = j * (eltMap.width / 9) +"px";
      eltFruit.style.opacity = 1;
      eltFruit.src = listFruitImages[this.fruits[i][j]];
      eltFruit.setAttribute('onclick', 'handleClick('+i+','+j+')');
      eltFruit.addEventListener( 'webkitTransitionEnd', updateTransform, false );
      eltFruit.addEventListener( 'oTransitionEnd', updateTransform, false );
      eltFruit.addEventListener( 'transitionend', updateTransform, false );
      eltMap.appendChild(eltFruit);
    }
  }
}

/**************************************************************************************************
Reloads the game
**************************************************************************************************/
Game.prototype.reload = function() {
  
  oGame.posRow = "";
  oGame.posCol = "";
  oGame.selectedCase = false;
  oGame.listFruitsDestroy = [];
  oGame.countTransitionEnd = 0;
  oGame.oldId = "";
  oGame.newId = ""; 
  oGame.state = ""; 
  oGame.currentScore = 0;
  oGame.updateScore(0);
  oTimer.reset();
  
  while (eltMap.firstChild) {
    eltMap.removeChild(eltMap.firstChild);
  }
  
  oGame.buildMap();
}

/**************************************************************************************************
Use for initialization of the game.
Check for vertical streak.
**************************************************************************************************/
Game.prototype.isVerticalStreak = function(row,col) {
  var fruitValue = this.fruits[row][col];
  var streak = 0;
  var tmp = row;
  
  while(tmp > 0 && this.fruits[tmp-1][col] == fruitValue) {
    streak++;
    tmp--;
  }
   
  tmp = row;
  
  while(tmp < 7 && this.fruits[tmp+1][col] == fruitValue) {
    streak++;
    tmp++;
  }
  
  if (streak > 1) {
    return true;
  } else {
    return false;
  }
}

/**************************************************************************************************
Use for initialization of the game.
Check for horizontal streak.
**************************************************************************************************/
Game.prototype.isHorizontalStreak = function(row,col) {
  var fruitValue = this.fruits[row][col];
  var streak = 0;
  var tmp = col
  
  while (tmp > 0 && this.fruits[row][tmp-1] == fruitValue) {
    streak++;
    tmp--;
  }
  
  tmp = col;
  
  while(tmp < 7 && this.fruits[row][tmp+1] == fruitValue){
    streak++;
    tmp++;
  }
  
  if (streak > 1) {
    return true;
  } else {
    return false;
  }
}

/**************************************************************************************************
Use for initialization of the game.
Check if there is a vertical or an horizontal streak
**************************************************************************************************/
Game.prototype.isStreak = function(row,col) {
  return this.isVerticalStreak(row,col) || this.isHorizontalStreak(row,col);
}    

/**************************************************************************************************
Check if a column is empty
**************************************************************************************************/
Game.prototype.isEmptyCol = function(row,col) {
  var empty = 0;
  var tmp = row;
  
  while((tmp >= 0) && (empty == 0)) {
    if (document.getElementById("fruit"+tmp+"_"+col).src.indexOf("destroy.png") == -1) {
      empty++;
    }
    tmp--;
  }
  
  if (empty > 0) {
    return true;
  } else {
    return false;
  }
}

/**************************************************************************************************
Checks whether adjacent fruits when swapping
**************************************************************************************************/
Game.prototype.check = function() {
  this.state = "";
  this.listFruitsDestroy = new Array();
  var nbAdjacentHorizontal = 0;
  var nbAdjacentVertical = 0;
  var tmp;
    
  for (var i=0; i<8; i++) {
    for (var j=0; j<7; j++) {
          
      if ((document.getElementById("fruit"+i+"_"+j).src == document.getElementById("fruit"+i+"_"+(j+1)).src) && (document.getElementById("fruit"+i+"_"+j).src.indexOf("destroy.png") == -1)) {
        nbAdjacentHorizontal = nbAdjacentHorizontal + 1;
      } else {
        if (nbAdjacentHorizontal >= 2) {
          for (var k=0;k<=nbAdjacentHorizontal;k++) {
            this.listFruitsDestroy.push(document.getElementById("fruit"+i+"_"+(j-k)));
          }
        }
        nbAdjacentHorizontal = 0;
      }
      
      if ((document.getElementById("fruit"+j+"_"+i).src == document.getElementById("fruit"+(j+1)+"_"+i).src) && (document.getElementById("fruit"+j+"_"+i).src.indexOf("destroy.png") == -1)) {
        nbAdjacentVertical = nbAdjacentVertical + 1;
      } else {
        if (nbAdjacentVertical >= 2) {
          for (var k=0;k<=nbAdjacentVertical;k++) {
            this.listFruitsDestroy.push(document.getElementById("fruit"+(j-k)+"_"+i));
          }
        }
        nbAdjacentVertical = 0;
      }
    }

    if (nbAdjacentHorizontal >= 2){
      for (var k=0;k<=nbAdjacentHorizontal;k++) {
        this.listFruitsDestroy.push(document.getElementById("fruit"+i+"_"+(j-k)));
      }
    }
    
    if (nbAdjacentVertical >= 2){
      for (var k=0;k<=nbAdjacentVertical;k++) {
        this.listFruitsDestroy.push(document.getElementById("fruit"+(j-k)+"_"+i));
      }
    }
    
    nbAdjacentVertical = 0;
    nbAdjacentHorizontal = 0;  
  }
  
  if (this.listFruitsDestroy.length > 0) {
    return true;
  } else {
    return false;
  }
}

/**************************************************************************************************
Checks the horizontal & vertical alignment of the map
**************************************************************************************************/
Game.prototype.checkAlignment = function(arr) {
  var succeed = false;
  var verticalMap = [];
  var horizontalMap = [];

  for (var i = 0; i < 8; i++) {
    verticalMap[i] = [];
    horizontalMap[i] = [];
    for (var j = 0; j < 8; j++) {
      verticalMap[i][j] = 0;
      horizontalMap[i][j] = 0;
    }
  }

  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (i < 7 && arr[i][j] == arr[i+1][j]) {
          horizontalMap[i][j]++;
          horizontalMap[i+1][j]++;
      }
      if (j < 7 && arr[i][j] == arr[i][j+1]) {
          verticalMap[i][j]++; 
          verticalMap[i][j+1]++; 
      }

      if (horizontalMap[i][j] >= 2 || verticalMap[i][j] >= 2) {
          succeed = true;
      }
    }
  }

  return succeed;
}

/**************************************************************************************************
Checks for possible movement
**************************************************************************************************/
Game.prototype.checkMovement = function() {
  var tmp;
  var tmap = [];

  for (var i = 0; i < 8; i++) {
    tmap[i] = [];
    for (var j = 0; j < 8; j++) {
       tmap[i][j] = document.getElementById("fruit"+i+"_"+j).src;
    }
  }

  for (var j = 0; j < 8; j++) {
    for (var i = 0; i < 8; i++) {
      if (i > 0) {
        tmp = tmap[i - 1][j];
        tmap[i - 1][j] = tmap[i][j];
        tmap[i][j] = tmp;
        if (this.checkAlignment(tmap)) {
            return true;
        } else {
            tmp = tmap[i - 1][j];
            tmap[i - 1][j] = tmap[i][j];
            tmap[i][j] = tmp;
        }
      }
      if (i < 7) {
        tmp = tmap[i + 1][j];
        tmap[i + 1][j] = tmap[i][j];
        tmap[i][j] = tmp;
        if (this.checkAlignment(tmap)) {
            return true;
        } else {
            tmp = tmap[i + 1][j];
            tmap[i + 1][j] = tmap[i][j];
            tmap[i][j] = tmp;
        }
      }
      if (j > 0) {
        tmp = tmap[i][j - 1];
        tmap[i][j - 1] = tmap[i][j];
        tmap[i][j] = tmp;
        if (this.checkAlignment(tmap)) {
            return true;
        } else {
            tmp = tmap[i][j - 1];
            tmap[i][j - 1] = tmap[i][j];
            tmap[i][j] = tmp;
        }
      }
      if (j < 7) {
        tmp = tmap[i][j + 1];
        tmap[i][j + 1] = tmap[i][j];
        tmap[i][j] = tmp;
        if (this.checkAlignment(tmap)) {
            return true;
        } else {
            tmp = tmap[i][j + 1];
            tmap[i][j + 1] = tmap[i][j];
            tmap[i][j] = tmp;
        }
      }
    }
  }
  return false;
}

/**************************************************************************************************
Sends down the fruit if there are empty once there was destruction
**************************************************************************************************/
Game.prototype.fall = function() {

  var j = 7;
  
  for (var i=0; i < 8; i++) {
    while ((j > 0) &&  (document.getElementById("fruit"+j+"_"+i).src.indexOf("destroy.png") == -1)) {
      j--;
    }

    document.getElementById("fruit"+j+"_"+i).id = "fruit0_"+i;
    document.getElementById("fruit0_"+i).setAttribute('onclick', 'handleClick(0,'+i+')');
    
    j--;
    
    if (j != 0) {
      while (j >= 0) {
        var tmp = j + 1;
        document.getElementById("fruit"+j+"_"+i).id = "fruit"+tmp+"_"+i;
        document.getElementById("fruit"+tmp+"_"+i).setAttribute('onclick', 'handleClick('+tmp+','+i+')');
        j--;
      }
    }
    
    j = 7;
  }

  var tmp = document.getElementsByClassName("fruit");
  tmp.reverse();
 
  for (var i=0; i < tmp.length; i++) {
    tmp[i].setAttribute('onclick', 'handleClick('+tmp[i].id.substring(5,6)+','+tmp[i].id.substring(7,8)+')');
    translate(document.getElementById("fruit"+tmp[i].id.substring(5,6)+"_"+tmp[i].id.substring(7,8)), 10, 400);
  }
  
  for (var i = 1; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (document.getElementById("fruit"+i+"_"+j).src.indexOf("destroy.png") !== -1) {
        var tmp = i - 1;
        if (document.getElementById("fruit"+tmp+"_"+j).src.indexOf("destroy.png") == -1) {
          this.fall();
        }
      }
    }
  }
  
  setTimeout("oGame.regenerate()",350);
}

/**************************************************************************************************
Add new fruits to the map once it has been destroyed
**************************************************************************************************/
Game.prototype.regenerate = function() {
  
  var tmp = document.getElementsByClassName("fruit");
  tmp.reverse();
  
  for (var i=0; i < tmp.length; i++) {
    if (document.getElementById(tmp[i].id).src.indexOf("destroy.png") !== -1) {
      document.getElementById(tmp[i].id).style.top = "-200px";
      document.getElementById(tmp[i].id).style.opacity = "1";
      
      var rand = 0;
      
      while (rand == 0) {
        rand = Math.floor(Math.random()*8);
      }
      
      document.getElementById(tmp[i].id).src = listFruitImages[rand];
      
      while (this.checkMovement() == false) {
        rand = 0;
      
        while (rand == 0) {
          rand = Math.floor(Math.random()*8);
        }
      
        document.getElementById(tmp[i].id).src = listFruitImages[rand];
        this.checkMovement();
      }
      
      translate(document.getElementById(tmp[i].id), 10, 400);
    }
  }
}

/**************************************************************************************************
Updates the score
**************************************************************************************************/
Game.prototype.updateScore = function(update) {
  this.currentScore += update;
	
	if (this.currentScore > 0) {
		var tmpScore = ""+this.currentScore+"";
		
		while (tmpScore.length != 8) {
			tmpScore = "0"+tmpScore;
		}
		
		document.getElementById("score").innerHTML = tmpScore;
	}
	else {
		this.currentScore = 0;
		document.getElementById("score").innerHTML = "00000000";
	}
}

/**************************************************************************************************
Leaves the game
**************************************************************************************************/
Game.prototype.leave = function() {
  eltMenu.style.display = "block";
  eltGame.style.display = "none";
  eltOptions.style.display = "none";
  eltPauseOverlay.style.display = "none";
  oTimer.reset();
  while (eltMap.firstChild) {
    eltMap.removeChild(eltMap.firstChild);
  }
  // TODO scores etc...
}

/**************************************************************************************************
Sets mode to time trial
**************************************************************************************************/
Game.prototype.setTimeTrial = function() {
  this.mode = "time-trial";
  oTimer.pause();
  oTimer.reset();
  oTimer.state = "neg";
  oTimer.tSecondsElapsed = 0;
  oTimer.secondsElapsed = 10;
  oTimer.minutesElapsed = 0;
  oTimer.start();
}

/**************************************************************************************************
End of the game
**************************************************************************************************/
Game.prototype.end = function() {
  eltEndOverlay.style.display = "block";
}
