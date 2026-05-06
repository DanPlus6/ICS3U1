'use strict';

// HTML targets
const P_DISPLAY1 = document.getElementById('p-display1');
const P_DISPLAY2 = document.getElementById('p-display2');

// arrays to be used in the algorithms
const stringArray = [
    'noodles', 'dumplings',
    'pizza', 'burger',
    'noodles'
];

const numbersArray = [
    1, 2, 3, 4, 1, 7, 4, 0, 2, 9
];

/**
 * Return all elements of a string where each element is on a different line
 * @param {Array} arr the array
 * @returns {string} string of all elements separated by line break characters
 */
function printArray(arr) {
    let res = "";
    for (const e of arr) res += e + '<br>';
    return res;
}

/**
 * tests the printArray function by printing both stringArray and numbersArray to the console
 */
function printArrayTest() {
    P_DISPLAY1.innerHTML = printArray(stringArray);
    P_DISPLAY2.innerHTML = printArray(numbersArray);
}



