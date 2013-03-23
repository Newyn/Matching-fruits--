/**************************************************************************************************
Constructor of the Timer class
**************************************************************************************************/
var Timer = function Timer() {
  this.tSecondsElapsed = 0; // Tenths of seconds elapsed since the timer starts
  this.secondsElapsed = 0; // Seconds elapsed since the timer starts
  this.minutesElapsed = 0; // Minutes elapsed since the timer starts
  this.interval = null; // Interval
};

/**************************************************************************************************
Prototype of the Timer class
**************************************************************************************************/
Timer.prototype = {
  // Starts the timer
  start: function start() {
    this.interval = setInterval(function() {
      oTimer.update();
    }, 100);
  },
  // Pauses the timer
  pause: function pause() {
    // Stop the execution of the interval
    clearInterval(this.interval);
    this.interval = null;
  },
  // Resets the timer
  reset: function reset() {
    this.tSecondsElapsed = 0;
    this.secondsElapsed = 0;
    this.minutesElapsed = 0;
  },
  // Updates the timer
  update: function update() {
    this.tSecondsElapsed = this.tSecondsElapsed + 1;

    if (this.tSecondsElapsed > 9) {
      this.tSecondsElapsed = 0;
      this.secondsElapsed = this.secondsElapsed + 1;
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
  }
};
