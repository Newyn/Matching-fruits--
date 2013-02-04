/**************************************************************************************************
Constructor
**************************************************************************************************/
function Game() {
	
	// Array of gems color name
	this.aListGemsColor = ["blue", "green", "orange", "purple", "red", "white", "yellow"];
	
	// Array of gems image object
	this.aListGemsImg = [];

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
	
	this.gemWidth = 50;
	this.gemHeight = 50;
	this.posColumn = "";
	this.posRow = "";
	
	this.selectedCase = false;
	this.posColumnSelectedCase = "";
	this.posRowSelectedCase = "";
}

/**************************************************************************************************
Initialization of the the array images gems
**************************************************************************************************/

Game.prototype.initListGemsImg = function() {

	for (var i=0; i<this.aListGemsColor.length;i++) {

		var oGemsImg = new Image();
		oGemsImg.src = "resources/gems/"+this.aListGemsColor[i]+".png";
		
		this.aListGemsImg.push(oGemsImg);
	}
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
			
			this.map[i][j] = new Gem(this.aListGemsImg[randomColor], coordX, coordY);
			
			if (i<2) {
				if (j>1) {
					if (this.map[i][j - 2].img.src != this.map[i][j].img.src) {
						this.map[i][j].draw();
					}
					else {
						while (this.map[i][j - 2].img.src == this.map[i][j].img.src) {
							var tmpX = this.map[i][j].x;
							var tmpY = this.map[i][j].y;
							randomColor = Math.floor(Math.random()*7);
							this.map[i][j] = new Gem(this.aListGemsImg[randomColor], tmpX, tmpY);
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
							this.map[i][j] = new Gem(this.aListGemsImg[randomColor], tmpX, tmpY);
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
							this.map[i][j] = new Gem(this.aListGemsImg[randomColor], tmpX, tmpY);
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
			ctx.strokeRect(i*this.gemWidth, j*this.gemWidth, this.gemWidth, this.gemWidth);	
		}
	  
	}
   
   if (this.selectedCase == true) {
		ctx.lineWidth = 2;
		ctx.strokeStyle = "red";
		ctx.strokeRect(oGame.map[oGame.posRow][oGame.posColumn].x, oGame.map[oGame.posRow][oGame.posColumn].y, oGame.map[oGame.posRow][oGame.posColumn].img.width, oGame.map[oGame.posRow][oGame.posColumn].img.height);
   }
}

/**************************************************************************************************
Launch the game
**************************************************************************************************/

Game.prototype.start = function() {
	this.initListGemsImg();
	this.initMap();
	this.initBorders();
	mainGame();
}