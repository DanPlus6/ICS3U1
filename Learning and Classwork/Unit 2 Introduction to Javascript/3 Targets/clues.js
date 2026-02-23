'use strict';

// Declare const references to target elements
const CLUE1 = document.getElementById('clue1');
const CLUE2 = document.getElementById('clue2');
const CLUE3 = document.getElementById('clue3');
const CLUE4 = document.getElementById('clue4');
const CLUE5 = document.getElementById('clue5');
const CLUE1BUT = document.getElementById('clueButton1');
const CLUE2BUT = document.getElementById('clueButton2');
const CLUE3BUT = document.getElementById('clueButton3');
const CLUE4BUT = document.getElementById('clueButton4');
const CLUE5BUT = document.getElementById('clueButton5');
const CLUEIMG = document.getElementById('clue-image');
const CLUEIMGBUT = document.getElementById('clue-img-button');
const ANS = document.getElementById('answer');
const ANSBUT = document.getElementById('ans-button');

/**
 * Reveal the first clue
 */
function revealClue1() {
    CLUE1.innerHTML = "He works for <b>Google</b>.";
    CLUE1BUT.hidden = true;
}

/**
 * Reveal the second clue
 */
function revealClue2() {
    if (!CLUE1BUT.hidden) return;
    CLUE2.innerHTML = "He has a <b>PhD</b> in Electrical Engineering.";
    CLUE2BUT.hidden = true;
}

/**
 * Reveal the third clue
 */
function revealClue3() {
    if (!CLUE2BUT.hidden) return;
    CLUE3.innerHTML = "He is ranked <b>#1</b> by points <b>on DMOJ</b>.";
    CLUE3BUT.hidden = true;
}

/**
 * Reveal the fourth clue
 */
function revealClue4() {
    if (!CLUE3BUT.hidden) return;
    CLUE4.innerHTML = "He is a competitive programming <b>coach</b>.";
    CLUE4BUT.hidden = true;
}

/**
 * Reveal the fifth clue
 */
function revealClue5() {
    if (!CLUE4BUT.hidden) return;
    CLUE5.innerHTML = "He teaches at <b>Olympiads School/Meritus Academy</b>.";
    CLUE5BUT.hidden = true;
}

/**
 * Reveal the image clue
 */
function revealClueImage() {
    if (!CLUE5BUT.hidden) return;
    CLUEIMG.hidden = false;
    CLUEIMGBUT.hidden = true;
}

/**
 * Reveal the answer
 */
function revealAnswer() {
    if (!CLUEIMGBUT.hidden) return;
    ANS.textContent= "It is Doctor (Xiaoming) Bruce Nan!";
    ANSBUT.hidden = true;
}

function start() {
    CLUEIMG.width = 250;
    CLUEIMG.height = 250;
}
