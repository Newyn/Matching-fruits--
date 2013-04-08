var DB_NAME = "Matching-fruits-indexedDB07";
var DB_RELEASE = 1;
var db;
var store;
var storeSettings;
var storeScores;
var storeLevels;
var storeAchievementsLevels;
var storeAchievementsTimeTrial;
// window.indexedDB
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// window.IDB* objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

// test indexedDB
if (!window.indexedDB) {
  alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}

window.onload = function() {
  var request = indexedDB.open(DB_NAME, DB_RELEASE);

  request.onerror = function(event) {
    alert("The web app isn't allow to use IndexedDB.");
  };

  request.onupgradeneeded = function(event) { 
    db = event.target.result;
    storeSettings = db.createObjectStore("settings", {keyPath: "type"});
    storeScores = db.createObjectStore("scores", {keyPath: "score"});
    storeLevels = db.createObjectStore("levels", {keyPath: "id"});
    storeAchievementsLevels = db.createObjectStore("achievementsLevels", {keyPath: "id"});
    storeAchievementsTimeTrial = db.createObjectStore("achievementsTimeTrial", {keyPath: "id"});
  };

  request.onsuccess = function(event) {
    db = event.target.result;
    
    selectSetting("language");
    selectSetting("sounds");
    selectSetting("music");
    
    for (var i = 0; i < oSettings.levels.list.length; i++) {
      selectLevel(oSettings.levels.list[i].id);
    }
    
    for (var i = 0; i < oSettings.achievementsTimeTrial.list.length; i++) {
      selectAchievement(oSettings.achievementsTimeTrial.list[i].id, "TimeTrial");
    }
    
    for (var i = 0; i < oSettings.achievementsLevels.list.length; i++) {
      selectAchievement(oSettings.achievementsLevels.list[i].id, "Levels");
    }
  }
}

/**************************************************************************************************
Select a setting
**************************************************************************************************/
function selectSetting(type) {
  store = db.transaction("settings", "readwrite").objectStore("settings");
  var keyRange = IDBKeyRange.only(type);
  var cursor = store.openCursor(keyRange);
  
  cursor.onsuccess = function(event) {
    var result = event.target.result;
    if (!!result == false) {
      console.log("Non-existent type");
      if (type == "language") {
        addSetting("language", oSettings.settings.language);
      }
      else if (type == "sounds") {
        addSetting("sounds", oSettings.settings.sounds);
      }
      else if (type == "music") {
        addSetting("music", oSettings.settings.music);
      }
    } else {
      if (type == "language") {
        oMenu.language = result.value.val;
        oMenu.updateUI();
      }
      else if (type == "sounds") {
        oMenu.soundState = result.value.val;
        oMenu.updateUI();
      }
      else if (type == "music") {
        oMenu.musicState = result.value.val;
        oMenu.updateUI();
      }
    }
  }
  
  cursor.onerror = function(event) {
    console.log("Select setting failed", event);
  };
}

/**************************************************************************************************
Add a setting
**************************************************************************************************/
function addSetting(type, val) {
  store = db.transaction("settings", "readwrite").objectStore("settings");
	var data = {type:type, val:val};

	console.log("Attempting to write setting ", data);

	var request = store.put(data);
  
  request.onsuccess = function onsuccess() {
    console.log("Write setting succeeded");
  };
  
  request.onerror = function onerror(event) {
    console.log("Write setting failed", event);
  };
};

/**************************************************************************************************
Delete a setting
**************************************************************************************************/
function deleteSetting(type) {
  store = db.transaction("settings", "readwrite").objectStore("settings");
  
  console.log("Attempting to delete setting");
  
  var request = store.delete(type);
  
  request.onsuccess = function(event) {
    console.log("Delete setting succeeded");
  }
  request.onerror = function(event) {
    console.log("Delete setting failed", event);
  };
}

/**************************************************************************************************
List all the score
**************************************************************************************************/
function selectAllScores() {
  var scores = [];
  store = db.transaction("scores", "readwrite").objectStore("scores");

  eltScoresList.innerHTML = "";
  
  store.openCursor().onsuccess = function (event) {
    var cursor = event.target.result; 
    if (cursor) {
      var tmp = store.get(cursor.key);
      tmp.onsuccess = function (e) {
        scores.push(tmp.result.score);
        cursor.continue();
      }
    }
    else {
      if (scores.length == 0) {
        if (oMenu.language == "fr") {
          eltScoresList.innerHTML = "<span class=\"scores-list-item\">Aucun score realise !</span><br />";
        } else {
          eltScoresList.innerHTML = "<span class=\"scores-list-item\">No score achieved !</span><br />";
        }
      } else {
        scores.sort();
        scores.reverse();
        
        for (var i = 0; i < scores.length; i++) {
          if (i < 5) {
            eltScoresList.innerHTML += i + 1 +" - <span class=\"scores-list-item\">"+ scores[i] + "</span><br />";
            console.log(scores[i]);
          } else {
            deleteScore(scores[i]);
          }
        }
      }
    }
  }
}

/**************************************************************************************************
Adds a score
**************************************************************************************************/
function addScore(score) {
  store = db.transaction("scores", "readwrite").objectStore("scores");
  var data = {score:score};
  
  console.log("Attempting to write score", data);
  
  var request = store.put(data);
  
  request.onsuccess = function(event) {
      console.log("Write score succeeded");
	};
  
  request.onerror = function(event) {
      console.log("Write score failed");
	};
}

/**************************************************************************************************
Deletes a score
**************************************************************************************************/
function deleteScore(score) {
  store = db.transaction("scores", "readwrite").objectStore("scores");
  
  console.log("Attempting to delete score");
  
  var request = store.delete(score);
  
  request.onsuccess = function(event) {
    console.log("Delete score succeeded");
  }
  request.onerror = function(event) {
    console.log("Delete score failed", event);
  };
}

/**************************************************************************************************
Checks best score
**************************************************************************************************/
function checkBestScore(score){
  var scores = [];
  store = db.transaction("scores", "readwrite").objectStore("scores");
  
  store.openCursor().onsuccess = function (event) {
    var cursor = event.target.result;

    if (cursor) {
      var tmp = store.get(cursor.key);
      tmp.onsuccess = function (e) {
        scores.push(tmp.result.score);
        cursor.continue();
      }
    }
    else {
      scores.reverse();
      
      if (scores[0] < score) {
        eltEndScoreMsg.style.display = "block";
      }
      
      addScore(score);
    }
  }
}

/**************************************************************************************************
Selects a level
**************************************************************************************************/
function selectLevel(id) {
  store = db.transaction("levels", "readwrite").objectStore("levels");
  var keyRange = IDBKeyRange.only(id);
  var cursor = store.openCursor(keyRange);
  
  cursor.onsuccess = function(event) {
    var result = event.target.result;
    if (!!result == false) {
      console.log("Non-existent type");
      if (id == "1") {
        addLevel(id, "", "", "", 0, true);
      } else {
        addLevel(id, "", "", "", 0, false);
      }
    } else {
      // TODO
    }
  }
  
  cursor.onerror = function(event) {
    console.log("Select level failed", event);
  };
};

function selectLevelScore(id) {
  store = db.transaction("levels", "readwrite").objectStore("levels");
  var keyRange = IDBKeyRange.only(id);
  var cursor = store.openCursor(keyRange);
  
  cursor.onsuccess = function(event) {
    var result = event.target.result;
    if (!!result == false) {
      console.log("Non-existent type");
    } else {
      eltLevelScoreScore.innerHTML = result.value.score;
      eltLevelScoreTime.innerHTML = result.value.time;
      eltLevelScoreMove.innerHTML = result.value.move;
    }
  }
  
  cursor.onerror = function(event) {
    console.log("Select level failed", event);
  };
}

/**************************************************************************************************
Selects a level in order to append cherry
**************************************************************************************************/
function selectLevelAndAppendCherry(id, cherryLevel, page) {
  store = db.transaction("levels", "readwrite").objectStore("levels");
  var keyRange = IDBKeyRange.only(id);
  var cursor = store.openCursor(keyRange);
  
  cursor.onsuccess = function(event) {
    var result = event.target.result;
    if (!!result == false) {
      console.log("Non-existent type");
    } else {
      var eltCherry = createCherry(id, result.value.cherries);
      if (cherryLevel == "first") {
        document.getElementById("levels-first-level-cherry-"+page).appendChild(eltCherry);
        if (getLevel(id).style.opacity != 1) {
          eltCherry.style.visibility = "hidden";
        }
      } else {
        document.getElementById("levels-second-level-cherry-"+page).appendChild(eltCherry);
        if (getLevel(id).style.opacity != 1) {
          eltCherry.style.visibility = "hidden";
        }
      }
    }
  }
  
  cursor.onerror = function(event) {
    console.log("Select level failed", event);
  };
};

/**************************************************************************************************
List all the levels
**************************************************************************************************/
function selectAllLevels(elt, mode) {

  var levels = [];
  store = db.transaction("levels", "readwrite").objectStore("levels");

  elt.innerHTML = "";

  store.openCursor().onsuccess = function (event) {
    var cursor = event.target.result; 
    if (cursor) {
      var tmp = store.get(cursor.key);
      tmp.onsuccess = function (e) {
        levels.push(tmp.result.id);
        cursor.continue();
      }
    }
    else {
      levels.sort();
      
      var count = 0;
      var page = 1;
      
      for (var i = 0; i < levels.length; i++) {     
        count++;
        
        // First level item
        // Append page element, previous and next arrow, first level group and level item
        if (count == 1) {
          var eltPage = createPage(page);
          elt.appendChild(eltPage);
          
          if (page == 1) {
            var eltArrowPrevious = document.createElement("img");
            eltArrowPrevious.className = "arrow-previous";
            eltArrowPrevious.src = "resources/images/arrows/previous.png";
            if (mode == "levels") {
              eltArrowPrevious.addEventListener('click', oMenu.previous, false);
            } else if (mode == "scores") {
              eltArrowPrevious.addEventListener('click', oMenu.clickTabScores, false);
            }
            getPage(page).appendChild(eltArrowPrevious);
          } else {
            eltPage.style.display = "none";
            
            var eltArrowNext = document.createElement("img");
            eltArrowNext.className = "arrow-next";
            eltArrowNext.src = "resources/images/arrows/next.png";
            
            (function(page) {
              eltArrowNext.addEventListener('click', function(event){ handleClickArrowNextPage(parseInt(page)); },false);
            })(page);
            
            getPage(parseInt(page-1)).appendChild(eltArrowNext);
            
            var eltArrowPrevious = document.createElement("img");
            eltArrowPrevious.className = "arrow-previous";
            eltArrowPrevious.src = "resources/images/arrows/previous.png";
            
            (function(page) {
              eltArrowPrevious.addEventListener('click', function(event){ handleClickArrowPreviousPage(parseInt(page - 1)); },false);
            })(page);
          
            getPage(page).appendChild(eltArrowPrevious);
          }
          
          var eltFirstLevel = document.createElement("div");
          eltFirstLevel.className = "levels-first-level";
          eltPage.appendChild(eltFirstLevel);
          
          var eltLevel = createLevel(i);
          eltFirstLevel.appendChild(eltLevel);
          checkLockLevel(parseInt(i+1), mode);
        }
        
        // Second and third level item
        // Append a level item
        if ((count == 2) || (count == 3)) {
          var eltLevel = createLevel(i);
          eltFirstLevel.appendChild(eltLevel);
          checkLockLevel(parseInt(i+1), mode);
        }
        
        // Third item
        // Append a cherry level group and all cherries in order to put it under the first line of the level item group
        if (count == 3) {
          var eltFirstLevelCherry = createLevelCherry("first", page);
          eltPage.appendChild(eltFirstLevelCherry);
          
          if (page == 1) {
            selectLevelAndAppendCherry(""+1+"", "first", page);
            selectLevelAndAppendCherry(""+2+"", "first", page);
            selectLevelAndAppendCherry(""+3+"", "first", page);
          } else {
            selectLevelAndAppendCherry(""+parseInt(1+(parseInt(parseInt(page - 1)*5)))+"", "first", page);
            selectLevelAndAppendCherry(""+parseInt(2+(parseInt(parseInt(page - 1)*5)))+"", "first", page);
            selectLevelAndAppendCherry(""+parseInt(3+(parseInt(parseInt(page - 1)*5)))+"", "first", page);
          }
        }
        
        // Fourth item
        // Append the second level group and a level item
        if (count == 4) {
          var eltSecondLevel = document.createElement("div");
          eltSecondLevel.className = "levels-second-level";
          eltPage.appendChild(eltSecondLevel);
          
          var eltLevel = createLevel(i, mode);
          eltSecondLevel.appendChild(eltLevel);   
          checkLockLevel(parseInt(i+1), mode);          
        }
        
        // Fifth item
        // Append a level item and append a cherry level group in order to put it under the second line of the level item group
        if (count == 5) {
          var eltLevel = createLevel(i);
          eltSecondLevel.appendChild(eltLevel);
          checkLockLevel(parseInt(i+1), mode);
          
          var eltSecondLevelCherry = createLevelCherry("second", page);
          eltPage.appendChild(eltSecondLevelCherry);
          
          if (page == 1) {
            selectLevelAndAppendCherry(""+4+"", "second", page);
            selectLevelAndAppendCherry(""+5+"", "second", page);
          } else {
            selectLevelAndAppendCherry(""+parseInt(4+(parseInt(parseInt(page - 1)*5)))+"", "second", page);
            selectLevelAndAppendCherry(""+parseInt(5+(parseInt(parseInt(page - 1)*5)))+"", "second", page);
          }
          
          count = 0;
          page++;
        }
      }
    }
  }
}

/**************************************************************************************************
Unlock / Lock level
**************************************************************************************************/
function checkLockLevel(id, mode) {
  store = db.transaction("levels", "readwrite").objectStore("levels");
  var keyRange = IDBKeyRange.only(""+id+"");
  var cursor = store.openCursor(keyRange);
  
  cursor.onsuccess = function(event) {
    var result = event.target.result;
    if (!!result == false) {
      console.log("Non-existent type");
    } else {
      if (result.value.unlock == false) {
        getLevel(id).style.opacity = 0.5;
        getLevel(id).style.cursor = "default";
      } else {
        getLevel(id).style.opacity = 1;
        
        if (mode == "levels") {
          (function(id) {
            document.getElementById("level"+id).addEventListener('click', function(event){ handleClickLevel(id); },false);
          })(id);
        } else {
          (function(id) {
            document.getElementById("level"+id).addEventListener('click', function(event){ handleClickLevelScore(id); },false);
          })(id);
        }
      }
    }
  }
  
  cursor.onerror = function(event) {
    console.log("Select level failed", event);
  };
};

/**************************************************************************************************
Adds a level
**************************************************************************************************/
function addLevel(id, score, move, time, cherries, unlock) {
  store = db.transaction("levels", "readwrite").objectStore("levels");
	var data = {id: id, score:score, move:move, time:time, cherries:cherries, unlock:unlock};

	console.log("Attempting to write level", data);

	var request = store.put(data);

  request.onsuccess = function onsuccess() {
    console.log("Write level succeeded");
  };
  
  request.onerror = function onerror(event) {
    console.log("Write level failed", event);
  };
};

/**************************************************************************************************
Check best score for level mode and update level if it's better
**************************************************************************************************/
function checkBestLevel(id, score, move, time){
  store = db.transaction("levels", "readwrite").objectStore("levels");
  
  var keyRange = IDBKeyRange.only(id);
  var cursor = store.openCursor(keyRange);
  
  cursor.onsuccess = function(event) {
    var result = event.target.result;
    if (!!result == false) {
      console.log("Non-existent level");
    } else {
      var cherries = 1;
      if (score >= oSettings.levels.list[parseInt(id - 1)].threeCherries) {
        cherries = 3;
      } else if (score >= oSettings.levels.list[parseInt(id - 1)].twoCherries) {
        cherries = 2;
      }
      if (result.value.score < score) { // Better score
        addLevel(id, score, move, time, cherries, true);
      } else if ((result.value.score == score) && (result.value.move > move)) { // Same score but less move
        addLevel(id, score, move, time, cherries, true);
      } else if ((result.value.score == score) && (result.value.time > time)) { // Same score but less time
        addLevel(id, score, move, time, cherries, true);
      }
    }
  }
}

/**************************************************************************************************
Deletes a level
**************************************************************************************************/
function deleteLevel(id) {
  store = db.transaction("levels", "readwrite").objectStore("levels");
  
  console.log("Attempting to delete level");
  
  var request = store.delete(id);
  
  request.onsuccess = function(event) {
    console.log("Delete level succeeded");
  }
  request.onerror = function(event) {
    console.log("Delete level failed", event);
  };
}

/**************************************************************************************************
Checks all the achievements
**************************************************************************************************/
function checkAchievements(mode) {
  console.log("achievement");
  if (mode == "time-trial") {
    for (var i = 0; i < oSettings.achievementsTimeTrial.list.length; i++) {
      if (oSettings.achievementsTimeTrial.list[i].type == "score") {
        if (eltScore.innerHTML > oSettings.achievementsTimeTrial.list[i].val) {
          console.log("Achievements unlocked"+oSettings.achievementsTimeTrial.list[i]["description-en"]);
          addAchievement(oSettings.achievementsTimeTrial.list[i]["id"], true, "TimeTrial");
        }
      }
    }
  } else if (mode == "level") {
    for (var i = 0; i < oSettings.achievementsLevels.list.length; i++) {
      if (oSettings.achievementsLevels.list[i].type == "level") {
        if (""+oGame.idLevel+"" == oSettings.achievementsLevels.list[i].val) {
          console.log("Achievements unlocked"+oSettings.achievementsLevels.list[i]["description-en"]);
          addAchievement(oSettings.achievementsLevels.list[i]["id"], true, "Levels");
        }
      }
    }
  }
}

/**************************************************************************************************
Selects an achievement
**************************************************************************************************/
function selectAchievement(id, mode) {
  store = db.transaction("achievements"+mode, "readwrite").objectStore("achievements"+mode);
  var keyRange = IDBKeyRange.only(id);
  var cursor = store.openCursor(keyRange);
  
  cursor.onsuccess = function(event) {
    var result = event.target.result;
    if (!!result == false) {
      console.log("Non-existent achievement");
      addAchievement(id, false, mode);
    } else {
      // TODO
    }
  }
  
  cursor.onerror = function(event) {
    console.log("Select achievement failed", event);
  };
};

/**************************************************************************************************
Adds an achievement
**************************************************************************************************/
function addAchievement(id, done, mode) {
  store = db.transaction("achievements"+mode, "readwrite").objectStore("achievements"+mode);
	var data = {id: id, done: done};

	console.log("Attempting to write achievements", data);

	var request = store.put(data);

  request.onsuccess = function onsuccess() {
    console.log("Write achievements succeeded");
  };
  
  request.onerror = function onerror(event) {
    console.log("Write achievements failed", event);
  };
};

/**************************************************************************************************
Deletes an achievement
**************************************************************************************************/
function deleteAchievement(id, mode) {
  store = db.transaction("achievements"+mode, "readwrite").objectStore("achievements"+mode);
  
  console.log("Attempting to delete achievement");
  
  var request = store.delete(id);
  
  request.onsuccess = function(event) {
    console.log("Delete achievement succeeded");
  }
  request.onerror = function(event) {
    console.log("Delete achievement failed", event);
  };
}

/**************************************************************************************************
Selects all achievements
**************************************************************************************************/
function selectAllAchievements(elt, mode) {

  var achievements = [];
  store = db.transaction("achievements"+mode, "readwrite").objectStore("achievements"+mode);

  elt.innerHTML = "";

  store.openCursor().onsuccess = function (event) {
    var cursor = event.target.result; 
    if (cursor) {
      var tmp = store.get(cursor.key);
      tmp.onsuccess = function (e) {
        achievements.push(tmp.result.id);
        cursor.continue();
      }
    }
    else {
      achievements.sort();
      
      var count = 0;
      var page = 1;
      
      for (var i = 0; i < achievements.length; i++) {
        count++;
        
        if (count == 1) {
          var eltPage = createPage(page);
          elt.appendChild(eltPage);
          
          if (page == 1) {
            var eltArrowPrevious = document.createElement("img");
            eltArrowPrevious.className = "arrow-previous";
            eltArrowPrevious.src = "resources/images/arrows/previous.png";
            // TODO add the event listener
            /*if (mode == "levels") {
              eltArrowPrevious.addEventListener('click', oMenu.previous, false);
            } else if (mode == "scores") {
              eltArrowPrevious.addEventListener('click', oMenu.clickTabScores, false);
            }*/
            getPage(page).appendChild(eltArrowPrevious);
          } else {
            eltPage.style.display = "none";
            
            var eltArrowNext = document.createElement("img");
            eltArrowNext.className = "arrow-next";
            eltArrowNext.src = "resources/images/arrows/next.png";
            
            // TODO add the event listener
            (function(page) {
              eltArrowNext.addEventListener('click', function(event){ handleClickArrowNextPage(parseInt(page)); },false);
            })(page);
            
            getPage(parseInt(page-1)).appendChild(eltArrowNext);
            
            var eltArrowPrevious = document.createElement("img");
            eltArrowPrevious.className = "arrow-previous";
            eltArrowPrevious.src = "resources/images/arrows/previous.png";
            
            // TODO add the event listener
            /*(function(page) {
              eltArrowPrevious.addEventListener('click', function(event){ handleClickArrowPreviousPage(parseInt(page - 1)); },false);
            })(page);*/
          
            getPage(page).appendChild(eltArrowPrevious);
          }
          
          var eltAchievementsLevel = document.createElement("div");
          eltAchievementsLevel.className = "achievements-list-first";
          eltPage.appendChild(eltAchievementsLevel);
          
          var eltImg = document.createElement("img");
          eltImg.id = "star"+parseInt(i+1);
          eltImg.src = "resources/images/achievements/star.png";
          eltAchievementsLevel.appendChild(eltImg);
          checkLockAchievement(parseInt(i+1), mode);
          
          var eltName = document.createElement("span");
          eltName.className = "achievements-list-name";
          if (mode == "TimeTrial") {
            eltName.innerHTML = oSettings.achievementsTimeTrial.list[i]["description-"+oMenu.language];
          } else {
            eltName.innerHTML = oSettings.achievementsLevels.list[i]["description-"+oMenu.language];
          }
          eltAchievementsLevel.appendChild(eltName);
        } else if (count == 2) {
          var eltAchievementsLevel = document.createElement("div");
          eltAchievementsLevel.className = "achievements-list-second";
          eltPage.appendChild(eltAchievementsLevel);
          
          var eltImg = document.createElement("img");
          eltImg.id = "star"+parseInt(i+1);
          eltImg.src = "resources/images/achievements/star.png";
          eltAchievementsLevel.appendChild(eltImg);
          checkLockAchievement(parseInt(i+1), mode);
          
          var eltName = document.createElement("span");
          eltName.className = "achievements-list-name";
          if (mode == "TimeTrial") {
            eltName.innerHTML = oSettings.achievementsTimeTrial.list[i]["description-"+oMenu.language];
          } else {
            eltName.innerHTML = oSettings.achievementsLevels.list[i]["description-"+oMenu.language];
          }
          eltAchievementsLevel.appendChild(eltName);
        } else if (count == 3) {
          var eltAchievementsLevel = document.createElement("div");
          eltAchievementsLevel.className = "achievements-list-third";
          eltPage.appendChild(eltAchievementsLevel);
          
          var eltImg = document.createElement("img");
          eltImg.id = "star"+parseInt(i+1);
          eltImg.src = "resources/images/achievements/star.png";
          eltAchievementsLevel.appendChild(eltImg);
          checkLockAchievement(parseInt(i+1), mode);
          
          var eltName = document.createElement("span");
          eltName.className = "achievements-list-name";
          if (mode == "TimeTrial") {
            eltName.innerHTML = oSettings.achievementsTimeTrial.list[i]["description-"+oMenu.language];
          } else {
            eltName.innerHTML = oSettings.achievementsLevels.list[i]["description-"+oMenu.language];
          }
          eltAchievementsLevel.appendChild(eltName);
        
          count = 0;
          page++;
        }
      }
    }
  }
}

/**************************************************************************************************
Unlock / Lock level
**************************************************************************************************/
function checkLockAchievement(id, mode) {
  store = db.transaction("achievements"+mode, "readwrite").objectStore("achievements"+mode);
  var keyRange = IDBKeyRange.only(""+id+"");
  var cursor = store.openCursor(keyRange);
  
  cursor.onsuccess = function(event) {
    var result = event.target.result;
    if (!!result == false) {
      console.log("Non-existent type");
    } else {
      if (result.value.done == false) {
        document.getElementById("star"+id).style.opacity = 0.5;
        document.getElementById("star"+id).style.cursor = "default";
      } else {
        document.getElementById("star"+id).style.opacity = 1;
      }
    }
  }
  
  cursor.onerror = function(event) {
    console.log("Select achievement failed", event);
  };
};
