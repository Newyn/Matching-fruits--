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
var oSettings = new Settings();

var evtLevelGoalBtnPlay;

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
var eltBgGame = document.getElementById("bg-game");
var eltMap = document.getElementById("map");
var eltLaunchScreen = document.getElementById("launch-screen");
var eltMenu = document.getElementById("menu");
var eltGame = document.getElementById("game");
var eltLevels = document.getElementById("levels");
var eltLevelGoal = document.getElementById("level-goal");
var eltLevelGoalId = document.getElementById("level-goal-id");
var eltLevelGoalScore = document.getElementById("level-goal-score");
var eltLevelGoalMove = document.getElementById("level-goal-move");
var eltLevelGoalTime = document.getElementById("level-goal-time");
var eltLevelGoalIdNum =  document.getElementById("level-goal-id-num");
var eltLevelGoalBtnPlay = document.getElementById("level-goal-btn-play");
var eltLevelScore = document.getElementById("level-score");
var eltLevelScoreId = document.getElementById("level-score-id");
var eltLevelScoreIdNum =  document.getElementById("level-score-id-num");
var eltLevelScoreScore = document.getElementById("level-score-score");
var eltLevelScoreTime = document.getElementById("level-score-time");
var eltLevelScoreMove = document.getElementById("level-score-move");
var eltAchievements = document.getElementById("achievements");
var eltOptions = document.getElementById("options");
var eltScores = document.getElementById("scores");
var eltBtnLevelScores = document.getElementById("btn-level-scores");
var eltBtnTimeTrialScores = document.getElementById("btn-time-trial-scores");
var eltScoresList = document.getElementById("scores-list");
var eltBtnLevel = document.getElementById("btn-level");
var eltBtnTimeTrial = document.getElementById("btn-time-trial");
var eltBtnPlay = document.getElementById("btn-play");
var eltBtnScores = document.getElementById("btn-scores");
var eltBtnAchievements = document.getElementById("btn-achievements");
var eltBtnLevelAchievements = document.getElementById("btn-level-achievements");
var eltBtnTimeTrialAchievements = document.getElementById("btn-time-trial-achievements");
var eltAchievementsList = document.getElementById("achievements-list");
var eltBtnOptions = document.getElementById("btn-options");
var eltBtnLang = document.getElementById("btn-lang");
var eltBtnMusic = document.getElementById("btn-music");
var eltBtnSound = document.getElementById("btn-sound");
var eltBtnPause = document.getElementById("btn-pause");
var eltBtnReload = document.getElementById("btn-reload");
var eltNoMoreMovement = document.getElementById("no-more-movement");
var eltPauseOverlay = document.getElementById("pause");
var eltPauseResumeButton = document.getElementById("pause-resume-button");
var eltEndOverlay = document.getElementById("end");
var eltEndScore = document.getElementById("end-score");
var eltEndLevel = document.getElementById("end-level");
var eltEndLevelScore = document.getElementById("end-level-score");
var eltEndLevelFailScore = document.getElementById("end-level-fail-score");
var eltEndLevelFailMove = document.getElementById("end-level-fail-move");
var eltEndScoreMsg = document.getElementById("end-score-msg");
var eltTimer = document.getElementById("timer");
var eltTimerMinutes = document.getElementById("timer-minutes");
var eltTimerSeconds = document.getElementById("timer-seconds");
var eltScore = document.getElementById("score");
var eltArrowPreviousPlayLevel = document.getElementById("arrow-previous-play-level");

window.addEventListener("resize", resize, false);

// Disable for the moment because it's annoying when we develop
//setTimeout("oMenu.initialize()", 1000);
oMenu.initialize();
//oGame.initialize();
