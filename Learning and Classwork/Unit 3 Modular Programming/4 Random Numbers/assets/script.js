'use strict';

const OUTPUT = document.getElementById('output');

const GREETINGS = [
    "Hi",
    "Hey",
    "Hello"
];

// RNG (int) formula for [min, max]: Math.floor( Math.random() * (max - min + 1) ) + min
// RNG (int) formula for [min, max): Math.floor( Math.random() * max )

function printRandom1To6() {
    //                                        (6 - 1 + 1)
    OUTPUT.textContent = Math.floor(Math.random() * 6) + 1
}

function printRandomMinus50To50() {
    //                                      (50 - (-50) + 1)
    OUTPUT.textContent = Math.floor(Math.random() * 100) - 50
}

function printRandomGreeting() {
    OUTPUT.textContent = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
}
