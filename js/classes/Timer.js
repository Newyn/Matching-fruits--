/**************************************************************************************************
Constructor the Timer class
**************************************************************************************************/
function Timer() {
  this.tSecondsElapsed = 0; // Tenths of seconds elapsed since the timer starts
  this.secondsElapsed = 0; // Seconds elapsed since the timer starts
  this.minutesElapsed = 0; // Minutes elapsed since the timer starts
  this.interval = null; // Interval
}

/**************************************************************************************************
Starts the timer
**************************************************************************************************/
Timer.prototype.start = function() {
  this.interval = setInterval(function(){
                oTimer.update();
               },100);
}

/**************************************************************************************************
Pauses the timer
**************************************************************************************************/
Timer.prototype.pause = function() {
  // Stop the execution of the interval
  clearInterval(this.interval);
  this.interval = null;
}

/**************************************************************************************************
Resets the timer
**************************************************************************************************/
Timer.prototype.reset = function() {
  this.tSecondsElapsed = 0;
  this.secondsElapsed = 0;
  this.minutesElapsed = 0;
}

/**************************************************************************************************
Updates the timer
**************************************************************************************************/
Timer.prototype.update = function() {
  this.tSecondsElapsed++;

  if (this.tSecondsElapsed > 9) {
    this.tSecondsElapsed = 0;
    this.secondsElapsed++;
  }

  if (this.secondsElapsed > 59) {
    this.secondsElapsed = 0;
    this.minutesElapsed++;
  }

  if(this.minutesElapsed < 10) {
    eltTimerMinutes.innerHTML = "0"+this.minutesElapsed;
  } else {
    eltTimerMinutes.innerHTML = this.minutesElapsed;
  }

  if(this.secondsElapsed < 10) {
    eltTimerSeconds.innerHTML = "0"+this.secondsElapsed;
  } else {
    eltTimerSeconds.innerHTML = this.secondsElapsed;
  }
}
