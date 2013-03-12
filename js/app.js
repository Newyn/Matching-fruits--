/**************************************************************************************************
Initialization of JavaScript Performance Monitor

FPS Frames rendered in the last second. The higher the number the better.
MS Milliseconds needed to render a frame. The lower the number the better.
**************************************************************************************************/

/*var stats = new Stats();
stats.setMode(1); // 0: fps, 1: ms

// Align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild(stats.domElement);*/

/**************************************************************************************************
Global variables
**************************************************************************************************/

var oGame = new Game();

// Load fruit images
var listFruitImages = [];
listFruitImages[0] = "";
listFruitImages[1] = "resources/fruits/blue.png";
listFruitImages[2] = "resources/fruits/green.png";
listFruitImages[3] = "resources/fruits/orange.png";
listFruitImages[4] = "resources/fruits/purple.png";
listFruitImages[5] = "resources/fruits/red.png";
listFruitImages[6] = "resources/fruits/white.png";
listFruitImages[7] = "resources/fruits/yellow.png";
listFruitImages[8] = "resources/fruits/destroy.png";

/**************************************************************************************************
Get DOM Elements
**************************************************************************************************/

var eltMap = document.getElementById("map");
var eltPauseOverlay = document.getElementById("pause");
var eltPauseResumeButton = document.getElementById("pause-resume-button");
var tmpHeight = (document.documentElement.clientHeight / 2) - (document.documentElement.clientHeight);

eltMap.width = document.documentElement.clientWidth;
eltMap.height = document.documentElement.clientHeight;

window.addEventListener("resize", resize, false);

// Disable for the moment because it's annoying when we develop
//window.addEventListener("blur", showPauseOverlay);

oGame.initialize();