/**************************************************************************************************
Initialization of the requestAnimationFrame
**************************************************************************************************/

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
							window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/**************************************************************************************************
Initialization of the canvas andthe  context
**************************************************************************************************/	
				
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.id = "game";
canvas.width = 400;
canvas.height = 400;

document.body.appendChild(canvas);

ctx.fillStyle = "rgb(0,0,0)";
ctx.fillRect (0, 0, canvas.width, canvas.height);

/**************************************************************************************************
Global variables
**************************************************************************************************/

// Array of gems color name
var aListGemsColor = ["blue", "green", "orange", "purple", "red", "white", "yellow"]
// Array of gems image object
var aListGemsImg = [];
// Map set to 8 rows and 8 columns
var map = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

/**************************************************************************************************
Main game
**************************************************************************************************/

var mainGame = function() {

	step();
	requestAnimationFrame(mainGame);
}

/**************************************************************************************************
Step
**************************************************************************************************/

var step = function() {
	
}

/**************************************************************************************************
InitListGemsImg
**************************************************************************************************/

var initListGemsImg = function() {

	for (var i=0; i<aListGemsColor.length;i++) {

		var oGemsImg = new Image();
		oGemsImg.src = "resources/gems/"+aListGemsColor[i]+".png";
		
		aListGemsImg.push(oGemsImg);
	}
}

/**************************************************************************************************
InitMap
**************************************************************************************************/

var initMap = function() {
	
	var coordX = 0;
	var coordY = 0;
	var randomColor;
	
	for (var i = 0; i < 8; i++) {
		
		if (i > 0) {
			coordY = coordY + 50;
		}
		
		for (var j = 0; j < 8; j++) {
	 
            randomColor = Math.floor(Math.random()*7);
			
			map[i][j] = new Gem(aListGemsImg[randomColor], coordX, coordY);
			
			if (i<2) {
				if (j>1) {
					if (map[i][j - 2].img.src != map[i][j].img.src) {
						map[i][j].draw();
					}
					else {
						while (map[i][j - 2].img.src == map[i][j].img.src) {
							var tmpX = map[i][j].x;
							var tmpY = map[i][j].y;
							randomColor = Math.floor(Math.random()*7);
							map[i][j] = new Gem(aListGemsImg[randomColor], tmpX, tmpY);
						}

						map[i][j].draw();
					}
				}
				else {
					map[i][j].draw();
				}
			}
			else {
				if (j>1) {
					if ((map[i - 2][j].img.src != map[i][j].img.src) && (map[i][j - 2].img.src != map[i][j].img.src)){
						map[i][j].draw();
					}
					else {
						while ((map[i - 2][j].img.src == map[i][j].img.src) || (map[i][j - 2].img.src == map[i][j].img.src)) {
							var tmpX = map[i][j].x;
							var tmpY = map[i][j].y;
							randomColor = Math.floor(Math.random()*7);
							map[i][j] = new Gem(aListGemsImg[randomColor], tmpX, tmpY);
						}

						map[i][j].draw();
					}
				}
				else {
					if (map[i - 2][j].img.src != map[i][j].img.src) {
						map[i][j].draw();
					}
					else {
						while (map[i - 2][j].img.src == map[i][j].img.src) {
							var tmpX = map[i][j].x;
							var tmpY = map[i][j].y;
							randomColor = Math.floor(Math.random()*7);
							map[i][j] = new Gem(aListGemsImg[randomColor], tmpX, tmpY);
						}
						
						map[i][j].draw();
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

initListGemsImg();
initMap();
mainGame();