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
}

/**************************************************************************************************
Initialize the game
**************************************************************************************************/
Game.prototype.initialize = function() {

	for (i=0;i<8;i++) {
	
		for(j=0;j<8;j++) {
	
			do	{
                this.fruits[i][j] = Math.floor(Math.random()*7);
            }	while(this.isStreak(i,j));
			
			var eltFruit = document.createElement("img");
			eltFruit.className = "fruit";
			eltFruit.id = "fruit"+i+"_"+j;
			eltFruit.style.width = eltMap.width / 12 + "px";
			eltFruit.style.height = eltMap.height / 12 + "px";
			eltFruit.style.border = "1px solid white";
			eltFruit.style.marginRight = "1px";
			eltFruit.style.cursor = "pointer";
			eltFruit.src = listFruitImages[this.fruits[i][j]];
			eltFruit.setAttribute('OnClick', 'handleClick('+i+','+j+')');
			eltMap.appendChild(eltFruit);
		}
		
		var eltDiv = document.createElement("div");
		eltMap.appendChild(eltDiv);
	}
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
Checks whether adjacent fruits when swapping
**************************************************************************************************/
Game.prototype.check = function() {

        var listFruitsDestroy = [];
        var nbAdjacentHorizontal = 0;
		var nbAdjacentVertical = 0;
        var tmp;
		var tmp2;
		
        for (var i=0; i<8; i++) {

                for (var j=0; j<7; j++) {
						
						tmp2 = j + 1;
						
                        if (document.getElementById("fruit"+i+"_"+j).src == document.getElementById("fruit"+i+"_"+tmp2).src) {
                                nbAdjacentHorizontal = nbAdjacentHorizontal + 1;
                        } else {
                                if (nbAdjacentHorizontal >= 2){
                                        for (var k=0;k<=nbAdjacentHorizontal;k++) {
                                            tmp = j - k;
                                            listFruitsDestroy.push(document.getElementById("fruit"+i+"_"+tmp));
                                        }
                                }
                                nbAdjacentHorizontal = 0;
                        }
						
						if (document.getElementById("fruit"+j+"_"+i).src == document.getElementById("fruit"+tmp2+"_"+i).src) {
                                nbAdjacentVertical = nbAdjacentVertical + 1;
                        } else {
                                if (nbAdjacentVertical >= 2){
                                        for (var k=0;k<=nbAdjacentVertical;k++) {
                                            tmp = j - k;
                                            listFruitsDestroy.push(document.getElementById("fruit"+tmp+"_"+i));
                                        }
                                }
                                nbAdjacentVertical = 0;
                        }
                }

                if (nbAdjacentHorizontal >= 2){
                        for (var k=0;k<=nbAdjacentHorizontal;k++) {
							tmp = j - k;
							listFruitsDestroy.push(document.getElementById("fruit"+i+"_"+tmp));
                        }
                }
				
				if (nbAdjacentVertical >= 2){
                        for (var k=0;k<=nbAdjacentVertical;k++) {
                            tmp = j - k;
                            listFruitsDestroy.push(document.getElementById("fruit"+tmp+"_"+i));
                        }
                }
				
				nbAdjacentVertical = 0;
                nbAdjacentHorizontal = 0;
        }

        for (var i=0;i<listFruitsDestroy.length;i++) {
			listFruitsDestroy[i].src = listFruitImages[7];
        }
}

