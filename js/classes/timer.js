/**************************************************************************************************
Constructor of the Timer class
**************************************************************************************************/
var Timer = function Timer() {
  this.tSecondsElapsed = 0; // Tenths of seconds elapsed since the timer starts
  this.secondsElapsed = 0; // Seconds elapsed since the timer starts
  this.minutesElapsed = 0; // Minutes elapsed since the timer starts
  this.interval = null; // Interval
  this.secondsElapsedForHint = 0;
  this.state = "pos";
};

/**************************************************************************************************
Prototype of the Timer class
**************************************************************************************************/
Timer.prototype = {
  convertTimerToSeconds: function convertTimerToSeconds() {
    return (parseInt(this.secondsElapsed + (this.minutesElapsed * 60)));
  },
  // Starts the timer
  start: function start() {
    console.log("Start timer");
    this.interval = setInterval(function() {
      oTimer.update();
    }, 100);
  },
  // Pauses the timer
  pause: function pause() {
    console.log("Pause timer");
    // Stop the execution of the interval
    clearInterval(this.interval);
    this.interval = null;
  },
  // Resets the timer
  reset: function reset() {
    console.log("Reset timer");
    this.tSecondsElapsed = 0;
    this.secondsElapsed = 0;
    this.minutesElapsed = 0;
  },
  // Updates the timer
  update: function update() {
    /*if (this.secondsElapsedForHint > 9) {
      oGame.checkMovement();
      this.secondsElapsedForHint = 0;
    }*/
    
    if (this.state == "pos") {
      this.tSecondsElapsed = this.tSecondsElapsed + 1;

      if (this.tSecondsElapsed > 9) {
        this.tSecondsElapsed = 0;
        this.secondsElapsed = this.secondsElapsed + 1;
        if (oGame.selectedCase == false) {
          //this.secondsElapsedForHint = this.secondsElapsedForHint + 1;
        } else {
          //this.secondsElapsedForHint = 0;
        }
      }

      if (this.secondsElapsed > 59) {
        this.secondsElapsed = 0;
        this.minutesElapsed = this.minutesElapsed + 1;
      }

      if (this.minutesElapsed < 10) {
        eltTimerMinutes.innerHTML = "0" + this.minutesElapsed;
      } else {
        eltTimerMinutes.innerHTML = this.minutesElapsed;
      }

      if (this.secondsElapsed < 10) {
        eltTimerSeconds.innerHTML = "0" + this.secondsElapsed;
      } else {
        eltTimerSeconds.innerHTML = this.secondsElapsed;
      }
      
      if (this.convertTimerToSeconds() > parseInt(oGame.objTime)) {
        oGame.endLevel();
      }
    } else if (this.state == "neg") {
      this.tSecondsElapsed = this.tSecondsElapsed - 1;

      if (this.tSecondsElapsed < 1) {
        this.tSecondsElapsed = 10;
        this.secondsElapsed = this.secondsElapsed - 1;
        if (oGame.selectedCase == false) {
          //this.secondsElapsedForHint = this.secondsElapsedForHint + 1;
        } else {
          //this.secondsElapsedForHint = 0;
        }
      }

      if (this.secondsElapsed < 1) {
        this.secondsElapsed = 59;
        this.minutesElapsed = this.minutesElapsed - 1;
      }

      if (this.minutesElapsed < 10) {
        eltTimerMinutes.innerHTML = "0" + this.minutesElapsed;
      } else {
        eltTimerMinutes.innerHTML = this.minutesElapsed;
      }

      if (this.secondsElapsed < 10) {
        eltTimerSeconds.innerHTML = "0" + this.secondsElapsed;
      } else {
        eltTimerSeconds.innerHTML = this.secondsElapsed;
      }
      
      if (this.minutesElapsed < 0) {
        this.tSecondsElapsed = 0;
        this.secondsElapsed = 0;
        this.minutesElapsed = 0;
        eltTimerMinutes.innerHTML = "00";
        eltTimerSeconds.innerHTML = "00";
        this.pause();
        oGame.end();
      }
    }
  }
};
