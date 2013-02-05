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
	this.posColumn = 0;
	this.posRow = 0;
	
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
Checks whether adjacent gems when swapping
**************************************************************************************************/

Game.prototype.check = function () {
	
	// posRow = new
	// posSelect = old
	
	var countLeft = 0;
	var countRight = 0;
	var countUp = 0;
	var countDown = 0;
	
	var err = false;
	
	if ((this.posRow >= 0) && (this.posColumn >= 0) && (this.posRow < 8) && (this.posColumn < 8)) {
		
		for (var i=this.posColumn - 1; i>=0; i--) {
			if ((this.map[this.posRow][this.posColumn].img.src == this.map[this.posRow][i].img.src) && (err == false)) {
				countLeft++;
			}
			else {
				
				err = true;
				
				if (countLeft < 1) {
					countLeft = 0;
				}
			}
		}

		err = false;
		
		for (var i=this.posColumn + 1; i<8 ; i++) {
			if ((this.map[this.posRow][this.posColumn].img.src == this.map[this.posRow][i].img.src) && (err == false)) {
				countRight++;
			}
			else {
			
				err = true;
				
				if (countRight < 1) {
					countRight = 0;
				}
			}
		}
		
		err = false;
		
		for (var i=this.posRow - 1; i>=0 ; i--) {
			if ((this.map[this.posRow][this.posColumn].img.src == this.map[i][this.posColumn].img.src) && (err == false)) {
				countUp++;
			}
			else {
				
				err = true;
				
				if (countUp < 1) {
					countUp = 0;
				}
			}
		}
		
		err = false;
		
		for (var i=this.posRow + 1; i<8 ; i++) {
			if ((this.map[this.posRow][this.posColumn].img.src == this.map[i][this.posColumn].img.src) && (err == false)) {
				countDown++;
			}
			else {	
				
				err = true;
				
				if (countDown < 1) {
					countDown = 0;
				}
			}
		}
		
		if (this.posColumn > 0) {
			if (this.map[this.posRow][this.posColumn].img.src != this.map[this.posRow][this.posColumn - 1].img.src) {
				countLeft = 0;
			}
		}
		
		if (this.posColumn < 7) {
			if (this.map[this.posRow][this.posColumn].img.src != this.map[this.posRow][this.posColumn + 1].img.src) {
				countRight = 0;
			}
		}
		
		if (this.posRow > 0) {
			if (this.map[this.posRow][this.posColumn].img.src != this.map[this.posRow - 1][this.posColumn].img.src) {
				countUp = 0;
			}
		}
		
		if (this.posRow < 7) {
			if (this.map[this.posRow][this.posColumn].img.src != this.map[this.posRow + 1][this.posColumn].img.src) {
				countDown = 0;
			}
		}	
	}
	
	console.log("countUp="+countUp+"countDown="+countDown+"countLeft="+countLeft+"countRight="+countRight);
	
	if ((countUp > 0) && (countDown > 0)) {
	
		console.log("OK");
		
		for (var i=0; i<=countUp; i++) {
			this.map[this.posRow - i][this.posColumn].destroy = true;
		}
		
		for (var i=0; i<=countDown; i++) {
			this.map[this.posRow + i][this.posColumn].destroy = true;
		}
		
		this.destroy();
	}
	else if ((countLeft > 0) && (countRight > 0)) {
	
		console.log("OK");
		
		for (var i=0; i<=countLeft; i++) {
				this.map[this.posRow][this.posColumn - i].destroy = true;
		}
		
		for (var i=0; i<=countRight; i++) {
				this.map[this.posRow][this.posColumn + i].destroy = true;
		}
		
		this.destroy();
	}
	else if ((countUp > 1) || (countDown > 1) || (countLeft > 1) || (countRight > 1)) {
		
		console.log("OK");
		
		if (countUp > 1) {
			for (var i=0; i<=countUp; i++) {
				this.map[this.posRow - i][this.posColumn].destroy = true;
			}
		}
		else if (countDown > 1) {
			for (var i=0; i<=countDown; i++) {
				this.map[this.posRow + i][this.posColumn].destroy = true;
			}
		}
		else if (countLeft > 1) {
			for (var i=0; i<=countLeft; i++) {
				this.map[this.posRow][this.posColumn - i].destroy = true;
			}
		}
		else if (countRight > 1) {
			for (var i=0; i<=countRight; i++) {
				this.map[this.posRow][this.posColumn + i].destroy = true;
			}
		}
		
		this.destroy();
	}	
}

/**************************************************************************************************
Destroy adjacent gems
**************************************************************************************************/

Game.prototype.destroy = function () {

	this.map[this.posRow][this.posColumn].destroy = true;
	
	for (var i = 0; i < 8; i++) {
		
		for (var j = 0; j < 8; j++) {
		
			if (this.map[i][j].destroy == true) {
				var oGemsImg = new Image();
				oGemsImg.src = "resources/gems/destroy.png";	
				var oGem = new Gem(oGemsImg, this.map[i][j].x, this.map[i][j].y);
				this.map[i][j] = oGem;
			}
		}
		
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