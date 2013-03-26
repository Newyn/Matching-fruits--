/**************************************************************************************************
Constructor of the Menu class
**************************************************************************************************/
var Menu = function Menu() {
  this.music = new Audio("resources/music/menu.ogg");
  this.music.loop = true;
  this.music.volume = 0.5;
  this.music.load();
  this.music.play();
}

/**************************************************************************************************
Prototype of the Menu class
**************************************************************************************************/
Menu.prototype = {
  // Initilializes the menu
  initialize: function initialize() {
    // Disable for the moment because it's annoying when we develop
    //fadeOut(eltLaunchScreen, 1000);
    //fadeIn(eltMenu, 1000);
    fadeIn(eltMenu, 1);
    
    // Set the menu properties
    eltBtnPlay.style.top = "40%";
    eltBtnScores.style.top = "45%";
    eltBtnOptions.style.top = "50%";
    eltBtnLevel.style.top = "55%";
    eltBtnTimeTrial.style.top = "60%";
    
    // Set event listener
    eltBtnPlay.addEventListener("click", oMenu.clickTabPlay, false);
    eltBtnScores.addEventListener("click", oMenu.clickTabScores, false);
    eltBtnOptions.addEventListener("click", oMenu.clickTabOptions, false);
    eltBtnLang.addEventListener("click", oMenu.setLanguage, false);
    eltBtnLevel.addEventListener("click", oMenu.clickTabLevel, false);
    eltBtnTimeTrial.addEventListener("click", oMenu.clickTabTimeTrial, false);
    
    var tmp = document.getElementsByClassName("arrow-previous");
    
    for (var i = 0; i < tmp.length; i++) {
      tmp[i].addEventListener("click", oMenu.previous, false);
    }
  },
  // Previous function
  previous: function previous() {
    eltMenu.style.display = "block";
    eltGame.style.display = "none";
    eltOptions.style.display = "none";
    eltScores.style.display = "none";
  },
  // Changes the language of the application. FR and EN only available for the moment
  setLanguage: function setLanguage() {
    if (eltBtnLang.src.indexOf("btn-lang-fr") !== -1) {
      document.webL10n.setLanguage("en");
      eltBtnLang.src = "resources/images/btn-lang-en.png";
      eltGame.style.backgroundImage = "url(resources/backgrounds/game-en.jpg)";
      eltOptions.style.backgroundImage = "url(resources/backgrounds/options-en.jpg)";
      eltEndOverlay.style.backgroundImage = "url(resources/backgrounds/end-en.jpg)";
    } else if (eltBtnLang.src.indexOf("btn-lang-en") !== -1) {
      document.webL10n.setLanguage("fr");
      eltBtnLang.src ="resources/images/btn-lang-fr.png";
      eltGame.style.backgroundImage = "url(resources/backgrounds/game-fr.jpg)";
      eltOptions.style.backgroundImage = "url(resources/backgrounds/options-fr.jpg)";
      eltEndOverlay.style.backgroundImage = "url(resources/backgrounds/end-fr.jpg)";
    }
  },
  // Handles click on the tab "Jouer" / "Play"
  clickTabPlay: function clickTabPlay() {
    //oGame.initialize();
    eltMenu.style.display = "none";
    eltGame.style.display = "block";
  },
  // Handles click on the tab "Niveaux" / "Levels"
  clickTabLevel: function clickTabLevel() {
    alert("Levels");
  },
  // Handles click on the tab "Contre-la-montre" / "Time Trial"
  clickTabTimeTrial: function clickTabTimeTrial() {
    oGame.initialize();
    oGame.setTimeTrial();
  },
  // Handles click on the tab "Scores"
  clickTabScores: function clickTabScores() {
    eltMenu.style.display = "none";
    eltScores.style.display = "block";
    readAllScores();
  },
  // Handles click on the tab "Options"
  clickTabOptions: function clickTabOptions() {
    eltMenu.style.display = "none";
    eltOptions.style.display = "block";
  }
};
