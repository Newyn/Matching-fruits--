/**************************************************************************************************
Constructor of the Game class
**************************************************************************************************/
var Settings = function Settings() {
  this.levelsJSONFilePath = 'data/json/levels.json';
  this.settingsJSONFilePath = 'data/json/settings.json';
  this.levels = '';
  this.settings = '';
  this.loadLevelsJSON();
  this.loadSettingsJSON();
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
          saveSettings("language", oSettings.settings.language);
          saveSettings("sounds", oSettings.settings.sounds);
          saveSettings("music", oSettings.settings.music);
        } else {
          console.error('Failed to fetch settings.json: ', xhr.statusText);
        }
      }
    };

    xhr.open('GET', this.settingsJSONFilePath, true);
    xhr.responseType = 'json';
    xhr.send();
  }
};
