'use strict';

/**
 * Converts temperature from Celsius to Fahrenheit 
 * @param {Number} celsius the temperature in celsius
 */
function convertCToF(celsius) {
    return celsius * 9/5 + 32;
}

/**
 * This function does what you think it does
 * @param {Number} number1 the first number
 * @param {Number} number2 the second number
 */
function sum(number1, number2) {
    return number1 + number2;
}

/**
 * Main entrypoint when website loads
 */
function start() {
    alert(`The boiling point of water is ${convertCToF(100)} F.`);
    // absolutely unreadable code cuz we didn't add option to sum an array
    console.log(sum(sum(5,10),sum(20,30)));
}
