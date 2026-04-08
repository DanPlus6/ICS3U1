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

function makeRandomInt(minimum, maximum) {
    console.log(Math.floor(Math.random() * (maximum - minimum + 1)) + minimum);
}

function roundp(x, places) {
    console.log(Math.round(x * (10**places)) / (10**places));
}

function calcHypotenuse(a,b) {
    alert(roundp(Math.sqrt(a**2 + b**2), 2));
}

function start() {
    makeCar("blue");
    makeCar("yellow");
    makeCar("red");
}
