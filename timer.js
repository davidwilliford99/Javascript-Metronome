// Add accurate timer constructor function

function Timer(callback, timeInterval, options) {

    this.timeInterval = timeInterval;
    
    // Add method to start timer
    this.start = () => {
      
      this.expected = Date.now() + this.timeInterval;      // Set the expected time. The moment in time we start the timer plus whatever the time interval is. 
      this.theTimeout = null;                              // Start the timeout and save the id in a property, so we can cancel it later
      if (options.immediate) {
        callback();
      } 
      this.timeout = setTimeout(this.round, this.timeInterval);
      console.log('Timer Started');
    }

    // Add method to stop timer
    this.stop = () => {
      clearTimeout(this.timeout);
      console.log('Timer Stopped');
    }
                                                       
    this.round = () => {                                     
      console.log('timeout', this.timeout);                  // Round method that takes care of running the callback and adjusting the time
      let drift = Date.now() - this.expected;                // The drift will be the current moment in time for this round minus the expected time..
      if (drift > this.timeInterval) {                       // Run error callback if drift is greater than time interval, and if the callback is provided
        // If error callback is provided
        if (options.errorCallback) {
          options.errorCallback();
        }
      }
      callback();                                            // Increment expected time by time interval for every round after running the callback function.
      this.expected += this.timeInterval;
      console.log('Drift:', drift);
      console.log('Next round time interval:', this.timeInterval - drift);
      this.timeout = setTimeout(this.round, this.timeInterval - drift);          // Increment expected time by time interval for every round after running the callback function.
    }
  }

  export default Timer;