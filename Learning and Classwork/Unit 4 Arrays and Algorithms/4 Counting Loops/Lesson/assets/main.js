'use strict';

// HTML targets
const P_ANS = document.getElementById('p-answer');
const IPT_RAND_QUANT = document.getElementById('ipt-random-quantity');

/** count from 1 to 10 */
function count1to10() {
    P_ANS.innerHTML = '';

    for (let i = 1; i <= 10; i++) {
        P_ANS.innerHTML += (i + '\n');
    }
}

/** count in the interval [50,1] in the terminal */
function count50To1() {
    for (let i = 50; i >= 1; i--) console.log(i);
}

/**  */
function sumToAMillion() {

}

/**
 * Generates a set number of random numbers
 * @param {number} quantity number of random nums to generate
 */
function makeRandomNumbers(quantity) {

}

