'use strict';

//both in seconds
const halfLife = 18;
const absorptionTime = 10;

/**
 * @param {Number} totalCaffeine
 * @param {Number} timeTaken
 * @returns {Number}
 */
export function calculate(totalCaffeine, timeTaken) {
  const seconds = (Date.now() - timeTaken) / 1000;
  
  if(seconds <= absorptionTime) {
    return totalCaffeine * seconds / absorptionTime;
  } else {
    return totalCaffeine * Math.pow(0.5, (seconds - absorptionTime) / halfLife);
  }
}

export default {calculate};