'use strict';

/**
 * Generate a random integer in the interval [minimum,maximum]
 * @param {number} minimum lower bound
 * @param {number} maximum upper bound
 * @returns {number} a random integer between minimum and maximum inclusively
 */
function makeRandomInt(minimum=0, maximum=10) {
    // swap minimum and 
    if (minimum > maximum) { [maximum,minimum] = [minimum, maximum]; }
    return Math.floor(Math.random() * (maximum-minimum+1)) + minimum;
}

/**
 * Alerts two unique random integers in the interval [minimum,maximum]
 * @param {number} minimum lower bound
 * @param {number} maximum upper bound
 */
function print2UniqueNumbers(minimum,maximum) {
    if (minimum == maximum) { console.log("Lower bound and upper bound must not equal."); return; }
    let num1 = makeRandomInt(minimum,maximum);
    let num2 = makeRandomInt(minimum,maximum);

    while (num1 == num2) {
        num1 = makeRandomInt(minimum,maximum);
        num2 = makeRandomInt(minimum,maximum);
    }

    alert(`First random int: ${num1},\nsecond random int: ${num2}`)
}
