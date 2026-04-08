'use strict';

const P_PRINTER1 = document.getElementById('printer1');
const P_PRINTER2 = document.getElementById('printer2');

function makeCar(colour) {
    console.log(`Making a ${colour} car!`);
}

function start() {
    makeCar("blue");
    makeCar("yellow");
    makeCar("red");
}
