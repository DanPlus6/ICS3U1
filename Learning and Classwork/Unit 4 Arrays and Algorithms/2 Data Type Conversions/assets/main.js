'use strict';

// HTML targets
const IPT_NUM1 = document.getElementById('ipt-num-1');
const IPT_NUM2 = document.getElementById('ipt-num-2');
const P_ANS = document.getElementById('p-answers');


/**
 * Rounds a number to a set number of places
 * @param {number} num number to round
 * @param {number} places number of decimal places to round to
 */
function roundp(num, places=2) {
    let helperFactor = 10**places;
    return Math.round(num * helperFactor) / helperFactor;
}

/**
 * Takes the value of the number 1 and number 2 input boxes and adds them
 */
function add() {
    // Check for invalid number input
    if (isNaN(IPT_NUM1.value) || isNaN(IPT_NUM2.value)) { alert("Invalid input! Inputs must be proper numbers!"); return; }

    P_ANS.textContent = roundp((+IPT_NUM1.value) + (+IPT_NUM2.value));
}
