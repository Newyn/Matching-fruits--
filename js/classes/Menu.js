/**************************************************************************************************
Constructor
**************************************************************************************************/
function Menu() {
  // Menu music
  this.music = new Audio("resources/music/menu.ogg");
  this.music.loop = true;
  this.music.volume = 0.5;
  this.music.load();
  this.music.play();
}

/**************************************************************************************************
Initializes the menu
**************************************************************************************************/
Menu.prototype.initialize = function() {
  // Disable for the moment because it's annoying when we develop
  //fadeOut(eltLaunchScreen, 1000);
  //fadeIn(eltMenu, 1000);
  
  // Set the menu properties
  eltBtnPlay.style.top = "40%";
  eltBtnScores.style.top = "45%";
  eltBtnOptions.style.top = "50%";
  
  // Set event listener
  eltBtnPlay.addEventListener("click", oMenu.clickTabPlay, false);
  eltBtnScores.addEventListener("click", oMenu.clickTabScores, false);
  eltBtnOptions.addEventListener("click", oMenu.clickTabOptions, false);
}

/**************************************************************************************************
Handles click on the tab "Jouer" / "Play"
**************************************************************************************************/
Menu.prototype.clickTabPlay = function() {
  oGame.initialize();
}

/**************************************************************************************************
Handles click on the tab "Scores
**************************************************************************************************/
Menu.prototype.clickTabScores = function() {
  alert("scores");
}

/**************************************************************************************************
Handles click on the tab "Options"
**************************************************************************************************/
Menu.prototype.clickTabOptions = function() {
  alert("options");
}
