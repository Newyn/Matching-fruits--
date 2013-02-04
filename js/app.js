/**************************************************************************************************
Initialization of the requestAnimationFrame
**************************************************************************************************/

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
							window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/**************************************************************************************************
Initialization of the canvas and the  context
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

var oGame = new Game();

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
	
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	/*for (var i = 0; i < 8; i++) {
		
		for (var j = 0; j < 8; j++) {
		
			oGame.map[i][j].draw();
			
		}
		
	}*/
}

canvas.addEventListener("mousedown", handleMouseDown, false);

oGame.start();