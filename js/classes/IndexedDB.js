// window.indexedDB
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

var db;

// window.IDB* objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

// test indexedDB
if (!window.indexedDB) {
  alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}

/**************************************************************************************************
Saves settings
**************************************************************************************************/
function saveSettings(type, val) {
  var request = indexedDB.open("Matching Fruits", 2);

  request.onerror = function(event) {
	  alert("The web app isn't allow to use IndexedDB.");
	};

	request.onupgradeneeded = function(event) { 
	   var db = event.target.result;
	   var store = db.createObjectStore("settings", {keyPath: "type"});
	};

  request.onsuccess = function(event) {
    var db = event.target.result;
		var store = db.transaction(["settings"], "readwrite").objectStore("settings");
		var data = {type:type, val:val};

		console.log("Attempting to write", data);

		var req = store.put(data);

    req.onerror = function onerror(event) {
      console.log("Writing failed", event);
    };
    req.onsuccess = function onsuccess() {
      console.log("Write succeeded");
    };
	};
}

/**************************************************************************************************
Saves the score
**************************************************************************************************/
function saveScore(score, mode) {

  var request = indexedDB.open("Matching Fruits", 1);

  request.onerror = function(event) {
	  alert("The web app isn't allow to use IndexedDB.");
	};

	request.onupgradeneeded = function(event) { 
	   var db = event.target.result;
	   var store = db.createObjectStore("save", {keyPath: "score"});
	};

  request.onsuccess = function(event) {
    var db = event.target.result;
		var store = db.transaction(["save"], "readwrite").objectStore("save");
		var data = {score:score, mode:mode};

		console.log("Attempting to write", data);

		var req = store.put(data);

    req.onerror = function onerror(event) {
      console.log("Writing failed", event);
    };
    req.onsuccess = function onsuccess() {
      console.log("Write succeeded");
    };
	};
}

/**************************************************************************************************
Checks best score
**************************************************************************************************/
function checkBestScore(valScore){

  var request = indexedDB.open("Matching Fruits", 1);

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
}

/**************************************************************************************************
Reads all the scores
**************************************************************************************************/
function readAllScores(){

  var request = indexedDB.open("Matching Fruits", 1);

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
        scores.reverse();
        
        for (var i = 0; i < scores.length; i++) {
          if (i < 5) {
            eltScoresList.innerHTML += i + 1 +" - <span class=\"scores-list-item\">"+ scores[i] + "</span><br />";
          }
        }
      }
		}
	}
}
