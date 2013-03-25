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
var oTimer = new Timer();
var oMenu = new Menu();
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
var eltLaunchScreen = document.getElementById("launch-screen");
var eltMenu = document.getElementById("menu");
var eltGame = document.getElementById("game");
var eltOptions = document.getElementById("options");
var eltScores = document.getElementById("scores");
var eltBtnLevel = document.getElementById("btn-level");
var eltBtnTimeTrial = document.getElementById("btn-time-trial");
var eltBtnPlay = document.getElementById("btn-play");
var eltBtnScores = document.getElementById("btn-scores");
var eltBtnOptions = document.getElementById("btn-options");
var eltBtnLang = document.getElementById("btn-lang");
var eltBtnPause = document.getElementById("btn-pause");
var eltBtnReload = document.getElementById("btn-reload");
var eltPauseOverlay = document.getElementById("pause");
var eltPauseResumeButton = document.getElementById("pause-resume-button");
var eltPauseBackButton = document.getElementById("pause-back-button");
var eltTimer = document.getElementById("timer");
var eltTimerMinutes = document.getElementById("timer-minutes");
var eltTimerSeconds = document.getElementById("timer-seconds");
var eltScore = document.getElementById("score");

window.addEventListener("resize", resize, false);

// Disable for the moment because it's annoying when we develop
//setTimeout("oMenu.initialize()", 1000);
oMenu.initialize();
//oGame.initialize();
