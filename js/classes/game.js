/**************************************************************************************************
Constructor of the Game class
**************************************************************************************************/
var Game = function Game() {
  // Game music
  this.music = new Audio("resources/audio/game.ogg");
  this.music.loop = true;
  this.music.volume = 0.5;
  this.music.load();

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

  this.selectedCase = false;
  this.posRow = "";
  this.posCol = "";
  this.listFruitsDestroy = [];
  this.countTransitionEnd = 0;
  this.oldId = "";
  this.newId = "";
  this.state = "";
  this.currentScore = 0;
  this.mode = "";
  
  this.idLevel = "";
  this.objScore = "";
  this.objMove = "";
  this.objTime = "";
  
  this.nbMove = 0;
};

/**************************************************************************************************
Prototype of the Game class
**************************************************************************************************/
Game.prototype = {
  // Initializes the game
  initialize: function initialize() {
    eltMap.width = Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight);
    eltMap.height = Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight);
    eltMap.style.top = "calc(60% - " + eltMap.width / 2 + "px)";
    eltMap.style.left = "calc(56% - " + eltMap.width / 2 + "px)";
   
    eltTimer.style.left = "calc(92% - " + document.documentElement.clientWidth / 2 + "px)";
    eltTimer.style.top = "calc(53% - " + document.documentElement.clientHeight / 2 + "px)";
    eltScore.style.left = "calc(87% - " + document.documentElement.clientWidth / 2 + "px)";
    eltScore.style.top = "calc(57% - " + document.documentElement.clientHeight / 2 + "px)";
    
    eltBtnPause.style.width = eltMap.width / 10 + "px";
    eltBtnPause.style.height = eltMap.height / 9 + "px";
    eltBtnPause.addEventListener("click", this.pause, false);

    eltBtnReload.style.width = eltMap.width / 10 + "px";
    eltBtnReload.style.height = eltMap.height / 9 + "px";
    eltBtnReload.addEventListener("click", this.reload, false);
    
    eltPauseResumeButton.addEventListener("click", oGame.resume, false);

    eltArrowPreviousPlayLevel.addEventListener("click", oGame.previousLevel, false);
    
    var listArrowPreviousPlay = document.getElementsByClassName("arrow-previous-play");

    for (var i = 0; i < listArrowPreviousPlay.length; i++) {
      listArrowPreviousPlay[i].addEventListener("click", this.previous, false);
    }

    // Disable for the moment because it's annoying when we develop
    //window.addEventListener("blur", showPauseOverlay);

    this.buildMap();

    eltLevels.style.display = "none";
    eltLevelGoal.style.display = "none";
    eltGame.style.display = "none";
    eltMap.style.display = "block";
    eltBtnPause.style.display = "block";
    eltBtnReload.style.display = "block";
    eltTimer.style.display = "block";
    eltScore.style.display = "block";
    eltBgGame.style.display = "block";
    
    oMenu.music.pause();
    this.music.play();
    oTimer.start();
  },
  // Builds the map
  buildMap: function buildMap() {
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
        eltFruit.setAttribute('mousedown', 'handleClick('+i+','+j+')');
        eltFruit.addEventListener( 'webkitTransitionEnd', updateTransform, false );
        eltFruit.addEventListener( 'oTransitionEnd', updateTransform, false );
        eltFruit.addEventListener( 'transitionend', updateTransform, false );
		addSwipeEvent(eltFruit,i,j);
		eltMap.appendChild(eltFruit);
		
      }
    }
  },
  // Use for initialization of the game.
  // Check for vertical streak.
  isVerticalStreak: function isVerticalStreak(row, col) {
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
  },
  // Use for initialization of the game.
  // Check for horizontal streak.
  isHorizontalStreak: function isHorizontalStreak(row, col) {
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
  },
  // Use for initialization of the game.
  // Check if there is a vertical or an horizontal streak.
  isStreak: function isStreak(row, col) {
    return this.isVerticalStreak(row,col) || this.isHorizontalStreak(row,col);
  },
  // Checks whether adjacent fruits when swapping
  check: function check() {
    this.state = "";
    this.listFruitsDestroy = new Array();
    var nbAdjacentHorizontal = 0;
    var nbAdjacentVertical = 0;
    var tmp, k, fruit;

    for (var i=0; i<8; i++) {
      for (var j=0; j<7; j++) {

        fruit = getFruit(i, j);
        if ((fruit.src == getFruit(i, j+1).src) && !isDestroyed(fruit)) {
          nbAdjacentHorizontal = nbAdjacentHorizontal + 1;
        } else {
          if (nbAdjacentHorizontal >= 2) {
            for (k = 0; k <= nbAdjacentHorizontal; k++) {
              this.listFruitsDestroy.push(getFruit(i, j-k));
            }
          }
          nbAdjacentHorizontal = 0;
        }

        fruit = getFruit(j, i);
        if ((fruit.src == getFruit(j+1, i).src) && !isDestroyed(fruit)) {
          nbAdjacentVertical = nbAdjacentVertical + 1;
        } else {
          if (nbAdjacentVertical >= 2) {
            for (k = 0; k <= nbAdjacentVertical; k++) {
              this.listFruitsDestroy.push(getFruit(j-k, i));
            }
          }
          nbAdjacentVertical = 0;
        }
      }

      if (nbAdjacentHorizontal >= 2) {
        for (k = 0; k <= nbAdjacentHorizontal; k++) {
          this.listFruitsDestroy.push(getFruit(i, j-k));
        }
      }

      if (nbAdjacentVertical >= 2) {
        for (k = 0; k <= nbAdjacentVertical; k++) {
          this.listFruitsDestroy.push(getFruit(j-k, i));
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
  },
  // Checks alignment
  checkAlignment: function checkAlignment(array) {
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
        if (i < 7 && array[i][j] == array[i+1][j]) {
            horizontalMap[i][j]++;
            horizontalMap[i+1][j]++;
        }
        if (j < 7 && array[i][j] == array[i][j+1]) {
            verticalMap[i][j]++;
            verticalMap[i][j+1]++;
        }

        if (horizontalMap[i][j] >= 2 || verticalMap[i][j] >= 2) {
            succeed = true;
        }
      }
    }

    return succeed;
  },
  // Checks for possible movement
  checkMovement: function checkMovement() {
    var tmp;
    var tmap = [];

    for (var i = 0; i < 8; i++) {
      tmap[i] = [];
      for (var j = 0; j < 8; j++) {
         tmap[i][j] = getFruit(i, j).src;
      }
    }

    for (var j = 0; j < 8; j++) {
      for (var i = 0; i < 8; i++) {
        if (i > 0) {
          tmp = tmap[i - 1][j];
          tmap[i - 1][j] = tmap[i][j];
          tmap[i][j] = tmp;
          if (this.checkAlignment(tmap)) {
            //this.setFruitActive(i, j);
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
            //this.setFruitActive(i, j);
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
            //this.setFruitActive(i, j);
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
            //this.setFruitActive(i, j);
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
  },
  // Destroys all the fruits contains by listFruitsDestroy and reset it
  destroy: function destroy() {
    for (var i = 0; i < oGame.listFruitsDestroy.length; i++) {
      fadeOut(document.getElementById(oGame.listFruitsDestroy[i].id), 50);
      oGame.updateScore(1000);
    }

    setTimeout(oGame.checkRelapse, 600);
    
    oGame.listFruitsDestroy = [];
  },
  // Sends down the fruit if there are empty once there was destruction
  fall: function fall() {
    // return;
    var i = 7;

    for (var j = 0; j < 8; j++) {
      while ((i > 0) && !isDestroyed(getFruit(i, j))) {
        i--;
      }

      var oldFruit = getFruit(i, j);

      i--;

      while (i >= 0) {
        var tmp = i + 1;

        getFruit(i, j).id = "fruit" + tmp + "_" + j;
        getFruit(tmp, j).style.opacity = 1;
        getFruit(tmp, j).setAttribute('onclick', 'handleClick(' + tmp + ',' + j + ')');
        getFruit(tmp, j).setAttribute('mousedown', 'handleClick(' + tmp + ',' + j + ')');
        i--;
      }
      
      oldFruit.id = "fruit0_" + j;
      getFruit(0, j).style.opacity = 1;
      getFruit(0, j).setAttribute('onclick', 'handleClick(0,' + j + ')');
      getFruit(0, j).setAttribute('mousedown', 'handleClick(0,' + j + ')');
      
      i = 7;
    }

    var tmp = document.getElementsByClassName("fruit");

    for (var i = 0; i < tmp.length; i++) {
      var row = tmp[i].id.substring(5,6);
      var col = tmp[i].id.substring(7,8);
      tmp[i].setAttribute('onclick', 'handleClick(' + row + ',' + col + ')');
      tmp[i].setAttribute('mousedown', 'handleClick(' + row + ',' + col + ')');
      translate(getFruit(row, col), 10, 400);
    }
  },
  // Add new fruits to the map once it has been destroyed
  regenerate: function regenerate() {
    var tmp = document.getElementsByClassName("fruit");

    for (var i = 0; i < tmp.length; i++) {
      var fruit = document.getElementById(tmp[i].id);

      if (isDestroyed(fruit)) {
        fruit.style.top = "-400px";
        fruit.style.opacity = "1";

        var rand = 0;
        while (rand == 0) {
          rand = Math.floor(Math.random()*8);
        }

        fruit.src = listFruitImages[rand];
        translate(fruit, 10, 400);
      }
    }
    
    // Checks if there are possible destructions after falling
    if (oGame.check() == true) {
      setTimeout(oGame.destroy, 800);
    }

    if (oGame.mode == "level") {
      if (parseInt(oGame.nbMove) >= oGame.objMove) {
        setTimeout(oGame.endLevel, 1000);
      } else if (oGame.checkMovement() == false) {
        oGame.remixMap();
      }
    }
  },
  // Checks if the fruit can relapse and fall them where applicable
  checkRelapse: function checkRelapse() {
    for (var i = 1; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        if (isDestroyed(getFruit(i, j))) {
          var tmp = i - 1;
          if (!isDestroyed(getFruit(tmp, j))) {
            oGame.fall();
          }
        }
      }
    }

    setTimeout(oGame.regenerate, 400);
  },
  // Updates the score
  updateScore: function updateScore(update) {
    this.currentScore += update;

    if (this.currentScore > 0) {
      var tmpScore = "" + this.currentScore + "";
      while (tmpScore.length != 8) {
        tmpScore = "0" + tmpScore;
      }
      document.getElementById("score").innerHTML = tmpScore;
    } else {
      this.currentScore = 0;
      document.getElementById("score").innerHTML = "00000000";
    }
  },
  // Leaves the game
  leave: function leave() {
    eltMenu.style.display = "none";
    eltBtnReload.style.display = "none";
    eltGame.style.display = "none";
    eltOptions.style.display = "none";
    eltPauseOverlay.style.display = "none";
    eltEndOverlay.style.display = "none";
    eltEndScoreMsg.style.display = "none";
    eltScore.innerHTML = "00000000";
    oTimer.pause();
    oTimer.reset();
    while (eltMap.firstChild) {
      eltMap.removeChild(eltMap.firstChild);
    }
    oMenu.music.play();
    this.music.pause();
  },
  // Sets mode to time trial
  setTimeTrial: function setTimeTrial() {
    this.mode = "time-trial";
    oTimer.pause();
    oTimer.reset();
    oTimer.state = "neg";
    oTimer.tSecondsElapsed = 0;
    oTimer.secondsElapsed = 0;
    oTimer.minutesElapsed = 1;
    oTimer.start();
  },
  // Sets mode to level
  setLevelMode: function setLevelMode(id) {
    oTimer.state = "pos";
    this.mode = "level";
    this.idLevel = id;
    this.objScore = parseInt(oSettings.levels.list[parseInt(id - 1)].score);
    this.objMove = parseInt(oSettings.levels.list[parseInt(id - 1)].move);
    this.objTime = parseInt(oSettings.levels.list[parseInt(id - 1)].time);
    this.nbMove = 0;
    this.currentScore = 0;
  },
  // Ends the game
  end: function end() {
    eltScore.style.display = "none";
    eltTimer.style.display = "none";
    eltEndOverlay.style.display = "block";
    eltEndScore.style.display = "block";
    eltEndScore.innerHTML = eltScore.innerHTML;
    checkBestScore(eltEndScore.innerHTML);
    oGame.currentScore = 0;
  },
  endLevel: function endLevel() {
    oTimer.pause();
    oGame.checkObjectives();
    oTimer.reset();
    this.currentScore = 0;
    eltScore.style.display = "none";
    eltTimer.style.display = "none";
    eltEndLevel.style.display = "block";
    eltEndLevelScore.style.display = "block";
  },
  checkObjectives: function checkObjectives() {
    eltEndLevelScoreLbl.innerHTML = eltScore.innerHTML;
    
    if ((this.nbMove > this.objMove) && (eltEndScore.innerHTML < this.objScore)) {
      setBgEltEndLevelFail();
      eltEndLevelFailScore.style.display = "block";
      eltEndLevelFailMove.style.display = "block";
      eltEndLevelScoreLbl.style.display = "none";
    } 
    else if ((this.nbMove > this.objMove) && (this.currentScore > this.objScore)) {
      setBgEltEndLevelFail();
      eltEndLevelFailMove.style.display = "block";
      eltEndLevelScoreLbl.style.display = "none";
    }
    else if (this.currentScore < this.objScore) {
      setBgEltEndLevelFail();
      eltEndLevelFailScore.style.display = "block";
      eltEndLevelScoreLbl.style.display = "none";
    }
    else {
      eltEndLevelFailScore.style.display = "none";
      eltEndLevelFailMove.style.display = "none";
      eltEndLevelScoreLbl.style.display = "block";
      setBgEltEndLevel();
      checkBestLevel(""+oGame.idLevel+"", eltEndLevelScoreLbl.innerHTML, oGame.nbMove, oTimer.convertTimerToSeconds());
    }
  },
  // Pauses of the game
  pause: function pause() {
    oTimer.pause();
    eltScore.style.display = "none";
    eltTimer.style.display = "none";
    eltBtnReload.style.display = "none";
    eltPauseOverlay.style.display = "block";
  },
  // Resumes of the game
  resume: function resume() {
    oTimer.start();
    eltNoMoreMovement.style.display = "none";
    eltPauseOverlay.style.display = "none";
    eltScore.style.display = "block";
    eltTimer.style.display = "block";
    eltBtnReload.style.display = "block";
  },
  // Reloads the game
  reload: function reload() {
    eltPauseOverlay.style.display = "none";
    eltEndOverlay.style.display = "none";
    eltScore.style.display = "block";
    eltTimer.style.display = "block";
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

    if (oGame.mode == "time-trial") {
      oTimer.pause();
      oTimer.tSecondsElapsed = 0;
      oTimer.secondsElapsed = 0;
      oTimer.minutesElapsed = 1;
      oTimer.start();
    } else {
      oTimer.reset();
    }

    oGame.resetMap();
  },
  // Remix the map if there are no more movements possibles
  remixMap: function remixMap() {
    oTimer.pause();
    eltNoMoreMovement.style.display = "block";
    setTimeout(oGame.resetMap, 1000);
    setTimeout(oGame.resume, 1500);  
  },
  // Reset the map
  resetMap: function resetMap() {
    while (eltMap.firstChild) {
      eltMap.removeChild(eltMap.firstChild);
    }

    oGame.buildMap();
  },
  // Go to previous screen
  previous: function previous() {
    oGame.leave();
    eltGame.style.display = "block";
  },
  previousLevel: function previousLevel() {
    oGame.leave();
    eltEndLevel.style.display = "none";
    eltLevels.style.display = "block";
  },
  // Sets a fruit active ie. as the selected case
  setFruitActive: function(row, col) {
    oGame.posRow = row;
    oGame.posCol = col;
    oGame.selectedCase = true;
    getFruit(row,col).style.animation = "spin .8s infinite linear";
  }
};
