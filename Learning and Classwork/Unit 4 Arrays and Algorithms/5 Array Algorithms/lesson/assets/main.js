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


// Base functions
/**
 * Return all elements of a string where each element is on a different line
 * @param {Array} arr the array
 * @returns {string} string of all elements separated by line break characters
 */
function printArray(arr) {
    /** string buffer to store output */
    let res = "";

    // iterate through each element of the given array
    for (const e of arr)
        // append element value and a linebreak character to output buffer
        res += e + '<br>';
    return res;
}

/**
 * Count the number of occurences of a value in an array
 * @param {Array} arr the array to search in
 * @param {*} val the value to search for
 * @returns {number} the number of occurences of search value in the array
 */
function countOccurences(arr, val) {
    /** value to track how many times search value was found */
    let count = 0;

    // iterate through each element of the given array
    for (const e of arr) 
        // if current element is equal to search value, increment counter
        if (e == val) ++count;

    return count;
}


// Test button callbacks
/**
 * test the printArray function by printing both stringArray and numbersArray to the console
 */
function printArrayTest() {
    P_DISPLAY1.innerHTML = printArray(stringArray);
    P_DISPLAY2.innerHTML = printArray(numbersArray);
}
