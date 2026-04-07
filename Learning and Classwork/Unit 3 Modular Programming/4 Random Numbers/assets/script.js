'use strict';

const OUTPUT = document.getElementById('output');

function printRandom1To6() {
    OUTPUT.textContent = Math.floor(Math.random() * 6) + 1
}
