'use strict';

const P_PRINTER1 = document.getElementById('printer1');
const P_PRINTER2 = document.getElementById('printer2');

function makeCar(colour) {
    console.log(`Making a ${colour} car!`);
}

function sayHello(name_ipt) {
    console.log(`Hello ${name_ipt.value}.`);
    alert(`Hello ${name_ipt.value}.`);
    name_ipt.value = "";
}

function start() {
    makeCar("blue");
    makeCar("yellow");
    makeCar("red");
}
