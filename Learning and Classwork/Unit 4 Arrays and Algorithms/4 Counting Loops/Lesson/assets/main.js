'use strict';

// HTML targets
const P_ANS = document.getElementById('p-answer');
const IPT_RAND_QUANT = document.getElementById('ipt-random-quantity');

/** count from 1 to 10 */
function count1To10() {
    P_ANS.innerHTML = '';

    // prints 1 to 10 (inclusive) in a paragraph
    for (let i = 1; i <= 10; i++) P_ANS.innerHTML += (i + '\n');
}

/** count from 50 to 1 in a paragraph */
function count50To1() {
    P_ANS.innerHTML = '';

    // prints 50 to 1 (inclusive) in a paragraph
    for (let i = 50; i >= 1; i--) P_ANS.innerHTML += (i + '\n');
}

/** sums up numbers to a million */
function sumToAMillion() {

}

/**
 * Generates a set number of random numbers
 * @param {number} quantity number of random nums to generate
 */
function makeRandomNumbers(quantity) {

}

