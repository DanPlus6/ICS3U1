'use strict';

// HTML targets
// calculator:
const IPT_NUM1 = document.getElementById('ipt-num-1');
const IPT_NUM2 = document.getElementById('ipt-num-2');
const P_CALC_ANS = document.getElementById('p-calc-ans');
// num guessing game:
const TARGET_NUM = rng(1,100);
const IPT_GUESS = document.getElementById('ipt-num-g');
const P_GUESS_RES = document.getElementById('p-guess-res');
// Hypotenuse calculator
const IPT_NUMA = document.getElementById('ipt-num-a');
const IPT_NUMB = document.getElementById('ipt-num-b');
const P_HYPCALC_ANS = document.getElementById('p-hypcalc-ans');

// Calculator
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
    P_CALC_ANS.textContent = '';

    // Check for invalid number input
    if (isNaN(IPT_NUM1.value) || isNaN(IPT_NUM2.value)) { alert("Invalid input! Inputs must be proper numbers!"); return; }

    P_CALC_ANS.textContent = roundp((+IPT_NUM1.value) + (+IPT_NUM2.value));
}

// Number guessing game
/**
 * Generates a random number inclusively in the provided range
 * @param {number} lower_bound the lower bound
 * @param {number} upper_bound the upper bound
 * @returns the random number
 */
function rng(lower_bound=1, upper_bound=100) {
    // Swap bounds if upper bound is less than lower bound
    if (upper_bound < lower_bound) {[lower_bound,upper_bound] = [upper_bound,lower_bound];}

    return Math.floor(Math.random() * (upper_bound-lower_bound+1)) + lower_bound;
}

/** Check if the user successfully guesses the target number */
function guess() {
    P_GUESS_RES.textContent = "";

    // validate guessing input
    if (isNaN(IPT_GUESS.value)) { alert("Invalid guess, must be a proper number!"); return; }
    
    let val = +IPT_GUESS.value;
    if (val == TARGET_NUM) P_GUESS_RES.textContent = "You win!";
    else if (val < TARGET_NUM) P_GUESS_RES.textContent = "Too low!";
    else P_GUESS_RES.textContent = "Too high!";
}

// Hypotenuse calculator
/** calculate hypotenuse of a triangle given input for side lengths of a and b */
function calcHyp() {
    P_HYPCALC_ANS.textContent = "";

    // check for empty input
    if (!IPT_NUMA.value || !IPT_NUMB.value) { alert("Invalid input! Inputs must not be empty!"); return; }
    // validate number input
    if (isNaN(IPT_NUMA.value) || isNaN(IPT_NUMB.value)) { alert("Invalid input! Inputs must be proper numbers!"); return; }

    let a = +IPT_NUMA.value, b = +IPT_NUMB.value;
    P_HYPCALC_ANS.textContent = roundp(Math.sqrt(a*a + b*b));
}


// Add base event listeners upon page load
// calculator
IPT_NUM1.addEventListener('keydown', e => {if (e.key == 'Enter') add();});
IPT_NUM2.addEventListener('keydown', e => {if (e.key == 'Enter') add();});
// number guessing game
IPT_GUESS.addEventListener('keydown', e => {if (e.key == 'Enter') guess();});

