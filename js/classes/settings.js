/**************************************************************************************************
Constructor of the Game class
**************************************************************************************************/
var Settings = function Settings() {
  this.levelsJSONFilePath = 'data/json/levels.json';
  this.settingsJSONFilePath = 'data/json/settings.json';
  this.achievementsTimeTrialJSONFilePath = 'data/json/achievements-time-trial.json';
  this.achievementsLevelsJSONFilePath = 'data/json/achievements-levels.json';
  this.levels = '';
  this.settings = '';
  this.achievementsTimeTrial = '';
  this.achievementsLevels = '';
  this.loadLevelsJSON();
  this.loadSettingsJSON();
  this.loadAchievementsTimeTrialJSON();
  this.loadAchievementsLevelsJSON();
}

/**************************************************************************************************
Prototype of the Settings class
**************************************************************************************************/
Settings.prototype = {
  // Load levels.json file
  loadLevelsJSON: function loadLevelsJSON() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 0 || xhr.status === 200) {
          oSettings.levels = xhr.response;
        } else {
          console.error('Failed to fetch levels.json: ', xhr.statusText);
        }
      }
    };

    xhr.open('GET', this.levelsJSONFilePath, true);
    xhr.responseType = 'json';
    xhr.send();
  },
  // Load settings.json file
  loadSettingsJSON : function loadSettingsJSON() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 0 || xhr.status === 200) {
          oSettings.settings = xhr.response;
        } else {
          console.error('Failed to fetch settings.json: ', xhr.statusText);
        }
      }
    };

    xhr.open('GET', this.settingsJSONFilePath, true);
    xhr.responseType = 'json';
    xhr.send();
  },
  // Load achievements-time-trial.json file
  loadAchievementsTimeTrialJSON : function loadAchievementsTimeTrialJSON() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 0 || xhr.status === 200) {
          oSettings.achievementsTimeTrial = xhr.response;
        } else {
          console.error('Failed to fetch achievements-time-trial.json: ', xhr.statusText);
        }
      }
    };

    xhr.open('GET', this.achievementsTimeTrialJSONFilePath, true);
    xhr.responseType = 'json';
    xhr.send();
  },
  // Load achievements-levels.json file
  loadAchievementsLevelsJSON : function loadAchievementsLevelsJSON() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 0 || xhr.status === 200) {
          oSettings.achievementsLevels = xhr.response;
        } else {
          console.error('Failed to fetch achievements-levels.json: ', xhr.statusText);
        }
      }
    };

    xhr.open('GET', this.achievementsLevelsJSONFilePath, true);
    xhr.responseType = 'json';
    xhr.send();
  },
  // Set the language setting (fr / en)
  setLanguage: function setLanguage(val) {
    addSetting("language", val);
  },
  // Set the music setting (on / off)
  setMusic: function setMusic(val) {
    addSetting("music", val);
  },
  // Set the sound settings (on / off)
  setSound: function setSound(val) {
    addSetting("sounds", val);
  }
};
