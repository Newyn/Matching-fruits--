var DB_NAME = "Matching-fruits-indexedDB2";
var DB_RELEASE = 1;
var db;
var store;
var storeSettings;
var storeScores;
var storeLevels;
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
  };

  request.onsuccess = function(event) {
    db = event.target.result;
    
    selectSetting("language");
    selectSetting("sounds");
    selectSetting("music");
    
    for (var i = 0; i < oSettings.levels.list.length; i++) {
      selectLevel(oSettings.levels.list[i].id);
    }
    
    selectAllLevels();
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
/*function checkBestScore(valScore){

  var request = indexedDB.open("Matching Fruits", 2);

  request.onerror = function(event) {
	  alert("The web app isn't allow to use IndexedDB.");
	};

	request.onupgradeneeded = function(event) { 
    var db = event.target.result;
	  var store = db.createObjectStore("save",{keyPath: "score"});
	};

  request.onsuccess = function(event) {
    var scores = [];
		var db = event.target.result; 
		var store = db.transaction(["save"], "readonly").objectStore("save");

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
        
        if (scores[0] < valScore) {
          eltEndScoreMsg.style.display = "block";
        }
      }
		}
	}
}*/

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
      addLevel(id, 0);
    } else {
      // TODO
    }
  }
  
  cursor.onerror = function(event) {
    console.log("Select level failed", event);
  };
};

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
      var eltCherry = document.createElement("img");
      eltCherry.id = "cherry"+id;
      eltCherry.src = "resources/images/cherries/"+result.value.score+".png";
      if (cherryLevel == "first") {
        document.getElementById("levels-first-level-cherry-"+page).appendChild(eltCherry);
      } else {
        document.getElementById("levels-second-level-cherry-"+page).appendChild(eltCherry);
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
function selectAllLevels() {

  var levels = [];
  store = db.transaction("levels", "readwrite").objectStore("levels");

  eltLevels.innerHTML = "";
  
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
        
        if (count == 1) {
          var eltPage = document.createElement("div");
          eltPage.id = "page"+page;
          eltPage.className = "page";
          eltLevels.appendChild(eltPage);
          
          if (page != 1) {
            eltPage.style.display = "none";
            
            var eltArrowNext = document.createElement("img");
            eltArrowNext.className = "arrow-next";
            eltArrowNext.src = "resources/images/arrow-next.png";
            eltArrowNext.setAttribute('onclick', 'handleClickArrowNextPage('+parseInt(page)+')');
            getPage(parseInt(page-1)).appendChild(eltArrowNext);
            
            var eltArrowPrevious = document.createElement("img");
            eltArrowPrevious.className = "arrow-previous";
            eltArrowPrevious.src = "resources/images/arrow-previous.png";
            eltArrowPrevious.setAttribute('onclick', 'handleClickArrowPreviousPage('+parseInt(page - 1)+')');
            getPage(page).appendChild(eltArrowPrevious);
          }
          
          var eltFirstLevel = document.createElement("div");
          eltFirstLevel.className = "levels-first-level";
          eltPage.appendChild(eltFirstLevel);
          
          var eltLevel = document.createElement("img");
          eltLevel.id = "level"+parseInt(i+1);
          eltLevel.src = "resources/images/levels/"+parseInt(i+1)+".png";
          eltLevel.setAttribute('onclick', 'handleClickLevel('+parseInt(i+1)+')');
          eltFirstLevel.appendChild(eltLevel);
        }
        
        if ((count == 2) || (count == 3)) {
          var eltLevel = document.createElement("img");
          eltLevel.id = "level"+parseInt(i+1);
          eltLevel.src = "resources/images/levels/"+parseInt(i+1)+".png";
          eltLevel.setAttribute('onclick', 'handleClickLevel('+parseInt(i+1)+')');
          eltFirstLevel.appendChild(eltLevel);
        }
        
        if (count == 3) {
          var eltFirstLevelCherry = document.createElement("div");
          eltFirstLevelCherry.id = "levels-first-level-cherry-"+page;
          eltFirstLevelCherry.className = "levels-first-level-cherry";
          eltPage.appendChild(eltFirstLevelCherry);
          
          selectLevelAndAppendCherry(""+parseInt(1*page)+"", "first", page);
          selectLevelAndAppendCherry(""+parseInt(2*page)+"", "first", page);
          selectLevelAndAppendCherry(""+parseInt(3*page)+"", "first", page);
        }
        
        if (count == 4) {
          var eltSecondLevel = document.createElement("div");
          eltSecondLevel.className = "levels-second-level";
          eltPage.appendChild(eltSecondLevel);
          
          var eltLevel = document.createElement("img");
          eltLevel.id = "level"+parseInt(i+1);
          eltLevel.src = "resources/images/levels/"+parseInt(i+1)+".png";
          eltLevel.setAttribute('onclick', 'handleClickLevel('+parseInt(i+1)+')');
          eltSecondLevel.appendChild(eltLevel);      
        }
        
        if (count == 5) {
          var eltLevel = document.createElement("img");
          eltLevel.id = "level"+parseInt(i+1);
          eltLevel.src = "resources/images/levels/"+parseInt(i+1)+".png";
          eltLevel.setAttribute('onclick', 'handleClickLevel('+parseInt(i+1)+')');
          eltSecondLevel.appendChild(eltLevel);
          
          var eltSecondLevelCherry = document.createElement("div");
          eltSecondLevelCherry.id = "levels-second-level-cherry-"+page;
          eltSecondLevelCherry.className = "levels-second-level-cherry";
          eltPage.appendChild(eltSecondLevelCherry);
          
          selectLevelAndAppendCherry(""+parseInt(4*page)+"", "second", page);
          selectLevelAndAppendCherry(""+parseInt(5*page)+"", "second", page);
          
          count = 0;
          page++;
        }
      }
    }
  }
}

/**************************************************************************************************
Adds a level
**************************************************************************************************/
function addLevel(id, score) {
  store = db.transaction("levels", "readwrite").objectStore("levels");
	var data = {id: id, score:score};

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
