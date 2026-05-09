'use strict';

// HTML targets
const P_DISPLAY1 = document.getElementById('p-display1');
const P_DISPLAY2 = document.getElementById('p-display2');
const TXT_IPT = document.getElementById('txt-input');

// arrays to be used as test data for the algorithms
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

/**
 * Finds the maximum element in a number array
 * @param {number[]} arr an array of real numbers
 * @returns the greatest element in given array 
 */
function findMaximum(arr) {
    /** value to store the running max as we iterate */
    let curMax = arr[0];

    // iterate through all elements of the number array
    for (let i = 0; i < arr.length; i++) {
        // replace running max with current element if current element is greater
        curMax = (arr[i] > curMax ? arr[i] : curMax);
    }

    return curMax;
}

/**
 * Find the index of the first occurence of a value in an array
 * @param {Array} arr the array to search in
 * @param {*} val the value to search for
 * @returns index of the search value if it is found, else -1
 */
function searchArray(arr, val) {
    // iterate through array to search for value
    for (let i = 0; i < arr.length; i++) {
        // check if current element is equal to search value
        if (arr[i] == val) return i;
    }
    return -1;
}


// Test button callbacks
/**
 * callback to clear all output and input fields
 */
function clear() {
    P_DISPLAY1.innerHTML = '';
    P_DISPLAY2.innerHTML = '';
    TXT_IPT.innerHTML = '';
}

/**
 * test the printArray function by printing both stringArray and numbersArray to the console
 */
function printArrayTest() {
    clear();

    P_DISPLAY1.innerHTML = printArray(stringArray);
    P_DISPLAY2.innerHTML = printArray(numbersArray);
}

/**
 * test the countOccurences function by counting number of occurences of input value inside of the string or number array
 */
function countOccurencesTest() {
    /** temporary variable to track input field's value */
    let ipt = TXT_IPT.value;
    
    clear();

    // check if input value is a number of string to determine whether to check occurences inside numbers or strings array
    if (isNaN(ipt)) 
        P_DISPLAY1.textContent = `Input value occurs ${countOccurences(stringArray,TXT_IPT.value)} times in the strings array.`;
    else
        P_DISPLAY2.textContent = `Input value occurs ${countOccurences(numbersArray,+TXT_IPT.value)} times in the number array.`;
}

/** test the findMaximum function by finding max element in the */
function findMaximumTest() {
    clear();

    P_DISPLAY1.innerHTML = findMaximum(numbersArray);
}

/** test the searchArray function by search for an input value inside of the string or numbers array */
function searchArrayTest() {
    /** temporary variable to track input field's value */
    let ipt = TXT_IPT.value;
    
    clear();

    // check if input value is a number of string to determine whether to search for input value inside numbers or strings array
    if (isNaN(ipt)) {
        let res = searchArray(stringArray,ipt);
        P_DISPLAY1.textContent = (res != -1 ? `Input value is first found at index ${res} in the strings array.` : 'Input value was not found in the strings array.');
    } else {
        let res = searchArray(numbersArray,+ipt);
        P_DISPLAY2.textContent = (res != -1 ? `Input value is first found at index ${res} in the numbers array.` : 'Input value was not found in the numbers array.');
    }
}
