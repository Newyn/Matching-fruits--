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
  fadeOut(eltLaunchScreen, 1);
  fadeIn(eltMenu, 1);
  
  // Set the menu properties
  eltBtnPlay.style.top = "40%";
  eltBtnScores.style.top = "45%";
  eltBtnOptions.style.top = "50%";
  
  // Set event listener
  eltBtnPlay.addEventListener("click", oMenu.clickTabPlay, false);
  eltBtnScores.addEventListener("click", oMenu.clickTabScores, false);
  eltBtnOptions.addEventListener("click", oMenu.clickTabOptions, false);
  eltArrowPrevious.addEventListener("click", oMenu.previous, false);
  eltBtnLang.addEventListener("click", oMenu.setLanguage, false);
}

Menu.prototype.previous = function() {
  eltMenu.style.display = "block";
  eltOptions.style.display = "none";
}

Menu.prototype.setLanguage = function() {
  if (eltBtnLang.src.indexOf("btn-lang-fr") !== -1) {
    document.webL10n.setLanguage("en");
    eltBtnLang.src = "resources/images/btn-lang-en.png";
  } else if (eltBtnLang.src.indexOf("btn-lang-en") !== -1) {
    document.webL10n.setLanguage("fr");
    eltBtnLang.src ="resources/images/btn-lang-fr.png";
  }
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
  eltMenu.style.display = "none";
  eltOptions.style.display = "block";
}
