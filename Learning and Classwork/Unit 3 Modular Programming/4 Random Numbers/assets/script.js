'use strict';

const OUTPUT = document.getElementById('output');

// RNG (int) formula: Math.floor( Math.random() * (max - min + 1) ) + min

function printRandom1To6() {
    //                                        (6 - 1 + 1)
    OUTPUT.textContent = Math.floor(Math.random() * 6) + 1
}

function printRandomMinus50To50() {
    //                                      (50 - (-50) + 1)
    OUTPUT.textContent = Math.floor(Math.random() * 100) - 50
}
