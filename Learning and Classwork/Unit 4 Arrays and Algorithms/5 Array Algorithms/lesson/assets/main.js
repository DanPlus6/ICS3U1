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
 * Print all elements of an array to the console
 * @param {Array} arr the array
 */
function printArray(arr) {
    for (const e of arr) console.log(e);
}

/**
 * tests the printArray function by printing both stringArray and numbersArray to the console
 */
function printArrayTest() {
    printArray(stringArray);
    printArray(numbersArray);
}


