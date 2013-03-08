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
	this.map = [
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0]
	]; 
	
	this.fruitWidth = 50;
	this.fruitHeight = 50;
	this.posColumn = 0;
	this.posRow = 0;
	
	this.selectedCase = false;
	this.posColumnSelectedCase = "";
	this.posRowSelectedCase = "";
}

/**************************************************************************************************
Initializes the map randomly eight rows and eight columns
**************************************************************************************************/

Game.prototype.initMap = function() {

	var coordX = 0;
	var coordY = 0;
	var randomColor;
	
	for (var i = 0; i < 8; i++) {
		
		if (i > 0) {
			coordY = coordY + 50;
		}
		
		for (var j = 0; j < 8; j++) {
	 
            randomColor = Math.floor(Math.random()*7);
			
			this.map[i][j] = new Fruit(listFruitImages[randomColor], coordX, coordY);
			
			if (i<2) {
				if (j>1) {
					if (this.map[i][j - 2].img.src != this.map[i][j].img.src) {
						this.map[i][j].draw();
					}
					else {
						while (this.map[i][j - 2].img.src == this.map[i][j].img.src) {
							var tmpX = this.map[i][j].x;
							var tmpY = this.map[i][j].y;
							randomColor = Math.floor(Math.random()*6);
							this.map[i][j] = new Fruit(listFruitImages[randomColor], tmpX, tmpY);
						}

						this.map[i][j].draw();
					}
				}
				else {
					this.map[i][j].draw();
				}
			}
			else {
				if (j>1) {
					if ((this.map[i - 2][j].img.src != this.map[i][j].img.src) && (this.map[i][j - 2].img.src != this.map[i][j].img.src)){
						this.map[i][j].draw();
					}
					else {
						while ((this.map[i - 2][j].img.src == this.map[i][j].img.src) || (this.map[i][j - 2].img.src == this.map[i][j].img.src)) {
							var tmpX = this.map[i][j].x;
							var tmpY = this.map[i][j].y;
							randomColor = Math.floor(Math.random()*7);
							this.map[i][j] = new Fruit(listFruitImages[randomColor], tmpX, tmpY);
						}

						this.map[i][j].draw();
					}
				}
				else {
					if (this.map[i - 2][j].img.src != this.map[i][j].img.src) {
						this.map[i][j].draw();
					}
					else {
						while (this.map[i - 2][j].img.src == this.map[i][j].img.src) {
							var tmpX = this.map[i][j].x;
							var tmpY = this.map[i][j].y;
							randomColor = Math.floor(Math.random()*7);
							this.map[i][j] = new Fruit(listFruitImages[randomColor], tmpX, tmpY);
						}
						
						this.map[i][j].draw();
					}
				}
			}

			coordX = coordX + 50;
			
			if (j==7) {
				coordX = 0;
			}
		}	
	}
}

/**************************************************************************************************
Initialization of the borders of the maps
**************************************************************************************************/

Game.prototype.initBorders = function() {
	
	for (var i=0; i<8; i++) {
   
		for (var j=0; j<8; j++) {
		
			ctx.lineWidth = 2;
			ctx.strokeStyle = "white";
			ctx.strokeRect(i*this.fruitWidth, j*this.fruitWidth, this.fruitWidth, this.fruitWidth);	
		}
	  
	}
   
   if (this.selectedCase == true) {
		ctx.lineWidth = 2;
		ctx.strokeStyle = "red";
		ctx.strokeRect(oGame.map[oGame.posRow][oGame.posColumn].x, oGame.map[oGame.posRow][oGame.posColumn].y, oGame.map[oGame.posRow][oGame.posColumn].img.width, oGame.map[oGame.posRow][oGame.posColumn].img.height);
   }
}

/**************************************************************************************************
Checks whether adjacent fruits when swapping
**************************************************************************************************/

Game.prototype.check = function() {

        var listFruitsDestroy = [];
        var nbAdjacentHorizontal = 0;
		var nbAdjacentVertical = 0;
        var tmp;

        for (var i=0; i<8; i++) {

                for (var j=0; j<7; j++) {

                        if (this.map[i][j].img.src == this.map[i][j + 1].img.src) {
                                nbAdjacentHorizontal = nbAdjacentHorizontal + 1;
                        } else {
                                if (nbAdjacentHorizontal >= 2){
                                        for (var k=0;k<=nbAdjacentHorizontal;k++) {
                                            tmp = j - k;
                                            listFruitsDestroy.push(this.map[i][tmp]);
                                        }
                                }
                                nbAdjacentHorizontal = 0;
                        }
						
						if (this.map[j][i].img.src == this.map[j + 1][i].img.src) {
                                nbAdjacentVertical = nbAdjacentVertical + 1;
                        } else {
                                if (nbAdjacentVertical >= 2){
                                        for (var k=0;k<=nbAdjacentVertical;k++) {
                                            tmp = j - k;
                                            listFruitsDestroy.push(this.map[tmp][i]);
                                        }
                                }
                                nbAdjacentVertical = 0;
                        }
                }

                if (nbAdjacentHorizontal >= 2){
                        for (var k=0;k<=nbAdjacentHorizontal;k++) {
                                listFruitsDestroy.push(this.map[i][j-k]);
                        }
                }
				
				if (nbAdjacentVertical >= 2){
                        for (var k=0;k<=nbAdjacentVertical;k++) {
                                listFruitsDestroy.push(this.map[j-k][i]);
                        }
                }
				
				nbAdjacentVertical = 0;
                nbAdjacentHorizontal = 0;
        }

        for (var i=0;i<listFruitsDestroy.length;i++) {
            this.map[listFruitsDestroy[i].y / 50][listFruitsDestroy[i].x / 50].destroy = true;
        }
		
		this.destroy();
}

/**************************************************************************************************
Destroy adjacent fruits
**************************************************************************************************/

Game.prototype.destroy = function () {
	
	for (var i = 0; i < 8; i++) {
		
		for (var j = 0; j < 8; j++) {
		
			if (this.map[i][j].destroy == true) {
				var oFruit = new Fruit(listFruitImages[7], this.map[i][j].x, this.map[i][j].y);
				this.map[i][j] = oFruit;
			}
		}
		
	}
}

/**************************************************************************************************
Launch the game
**************************************************************************************************/

Game.prototype.start = function() {
	
	// In comments for the moment because it's annoying during the development
	//window.addEventListener("blur", showPauseOverlay);
	
	this.initMap();
	this.initBorders();
	mainGame();
}