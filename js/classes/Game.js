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
}

/**************************************************************************************************
Initializes the game
**************************************************************************************************/
Game.prototype.initialize = function() {
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
  oTimer.start();
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
}

Game.prototype.fall = function() {
  this.state = "fall";
  var tmp = document.getElementsByClassName("fruit");
  tmp.reverse();

  for (var i=0; i < tmp.length; i++) {
    if (tmp[i].src.indexOf("destroy.png") !== -1) {
      if (this.isEmptyCol(tmp[i].id.substring(5,6),tmp[i].id.substring(7,8))) {
        var row = parseInt(tmp[i].id.substring(5,6)) - 1;
        console.log(row);
        var ty = (row - tmp[i].id.substring(5,6)) * eltMap.height / 9;
        document.getElementById("fruit"+row+"_"+tmp[i].id.substring(7,8)).style.transform = "translateY(" + (-ty) + "px)";
        console.log(tmp[i].id);
      }
    }
  }
}
