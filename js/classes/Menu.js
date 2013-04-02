/**************************************************************************************************
Constructor of the Menu class
**************************************************************************************************/
var Menu = function Menu() {
  this.music = new Audio("resources/music/menu.ogg");
  this.music.loop = true;
  this.music.volume = 0.5;
  this.music.load();
  this.music.play();
  this.musicState = "on"; // Music activate
  this.soundState = "on"; // Sounds activate
  this.language = "fr"; // Language FR
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
    eltBtnPlay.style.top = "34%";
    eltBtnScores.style.top = "39%";
    eltBtnAchievements.style.top = "44%";
    eltBtnOptions.style.top = "49%";
    eltBtnLevel.style.top = "55%";
    eltBtnTimeTrial.style.top = "60%";
    eltBtnLevelScores.style.top = "55%";
    eltBtnTimeTrialScores.style.top = "60%";
    
    // Set event listener
    eltBtnPlay.addEventListener("click", oMenu.clickTabPlay, false);
    eltBtnScores.addEventListener("click", oMenu.clickTabScores, false);
    eltBtnOptions.addEventListener("click", oMenu.clickTabOptions, false);
    eltBtnLang.addEventListener("click", oMenu.setLanguage, false);
    eltBtnMusic.addEventListener("click", oMenu.switchMusicState, false);
    eltBtnSound.addEventListener("click", oMenu.switchSoundState, false);
    eltBtnLevel.addEventListener("click", oMenu.clickTabLevel, false);
    eltBtnTimeTrial.addEventListener("click", oMenu.clickTabTimeTrial, false);
    eltBtnTimeTrialScores.addEventListener("click", oMenu.clickTabTimeTrialScores, false);
    
    var listArrowPrevious = document.getElementsByClassName("arrow-previous");
    
    for (var i = 0; i < listArrowPrevious.length; i++) {
      listArrowPrevious[i].addEventListener("click", oMenu.previous, false);
    }
  },
  // Previous function
  previous: function previous() {
    eltMenu.style.display = "block";
    eltGame.style.display = "none";
    eltOptions.style.display = "none";
    eltScores.style.display = "none";
    eltScoresList.style.display = "none";
    eltScores.style.backgroundImage = "url(resources/backgrounds/scores.jpg)";
    eltBtnLevelScores.style.display = "block";
    eltBtnTimeTrialScores.style.display = "block";
  },
  // Changes the language of the application. FR and EN only available for the moment
  setLanguage: function setLanguage() {
    if (oMenu.language == "fr") {
      oMenu.language = "en";
      addSetting("language", "en");
    } else if (oMenu.language == "en") {
      oMenu.language = "fr";
      addSetting("language", "fr");
    }
    
    oMenu.updateUI();
  },
  // Switch music state => activate / desactivate music
  switchMusicState: function switchMusicState() {
    if (oMenu.musicState == "on") {
      oMenu.musicState = "off";
      addSetting("music", "off");
    } else if (oMenu.musicState == "off") {
      oMenu.musicState = "on";
      addSetting("music", "on");
    }
    
    oMenu.updateUI();
  },
  // Switch sound state => activate / desactivate sound
  switchSoundState: function switchSoundState() {
    if (oMenu.soundState == "on") {
      oMenu.soundState = "off";
      addSetting("sounds", "off");
    } else {
      oMenu.soundState = "on";
      addSetting("sounds", "on");
    }
    
    oMenu.updateUI();
  },
  // Update the UI
  updateUI: function updateUI() {
    if (oMenu.language == "fr") {
      document.webL10n.setLanguage("fr");
      eltBtnLang.src = "resources/images/btn-lang-fr.png";
      eltGame.style.backgroundImage = "url(resources/backgrounds/game-fr.jpg)";
      eltOptions.style.backgroundImage = "url(resources/backgrounds/options-fr.jpg)";
      eltLevels.style.backgroundImage = "url(resources/backgrounds/levels-fr.jpg)";
      eltEndOverlay.style.backgroundImage = "url(resources/backgrounds/end-fr.jpg)";
    } else if (oMenu.language == "en") {
      document.webL10n.setLanguage("en");
      eltBtnLang.src ="resources/images/btn-lang-en.png";
      eltGame.style.backgroundImage = "url(resources/backgrounds/game-en.jpg)";
      eltOptions.style.backgroundImage = "url(resources/backgrounds/options-en.jpg)";
      eltLevels.style.backgroundImage = "url(resources/backgrounds/levels-en.jpg)";
      eltEndOverlay.style.backgroundImage = "url(resources/backgrounds/end-en.jpg)";
    }

    if (oMenu.soundState == "on") {
      eltBtnSound.src = "resources/images/btn-sound-on.png";
    } else {
      eltBtnSound.src = "resources/images/btn-sound-off.png";
    }
    
    if (oMenu.musicState == "on") {
      eltBtnMusic.src = "resources/images/btn-music-on.png";
    } else {
      eltBtnMusic.src = "resources/images/btn-music-off.png";
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
    eltMenu.style.display = "none";
    eltLevels.style.display = "block";
  },
  // Handles click on the tab "Contre-la-montre" / "Time Trial"
  clickTabTimeTrial: function clickTabTimeTrial() {
    oGame.initialize();
    oGame.setTimeTrial();
  },
  clickTabTimeTrialScores: function clickTabTimeTrialScores() {
    if (eltBtnLang.src.indexOf("btn-lang-fr") !== -1) {
      eltScores.style.backgroundImage = "url(resources/backgrounds/scores-time-trial-fr.jpg)";
    } else if (eltBtnLang.src.indexOf("btn-lang-en") !== -1) {
      eltScores.style.backgroundImage = "url(resources/backgrounds/scores-time-trial-en.jpg)";
    }
    eltBtnLevelScores.style.display = "none";
    eltBtnTimeTrialScores.style.display = "none";
    eltScoresList.style.display = "block";
    selectAllScores();
  },
  // Handles click on the tab "Scores"
  clickTabScores: function clickTabScores() {
    eltMenu.style.display = "none";
    eltScores.style.display = "block";
  },
  // Handles click on the tab "Options"
  clickTabOptions: function clickTabOptions() {
    eltMenu.style.display = "none";
    eltOptions.style.display = "block";
  }
};
