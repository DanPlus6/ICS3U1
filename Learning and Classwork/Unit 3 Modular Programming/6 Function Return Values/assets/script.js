'use strict';

/**
 * Converts temperature from Celsius to Fahrenheit 
 * @param {Number} celsius the temperature in celsius
 */
function convertCToF(celsius) {
    return celsius * 9/5 + 32;
}

/**
 * Main entrypoint when website loads
 */
function start() {
    alert(`The boiling point of water is ${convertCToF(100)} F.`);

}
