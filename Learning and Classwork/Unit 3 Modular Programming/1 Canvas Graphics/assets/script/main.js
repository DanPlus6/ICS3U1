'use strict';
import { Entity } from './modules/entity.js';
import { Canvas } from './modules/canvas.js';

// +++++++++++++++++ Init variables ++++++++++++++++++++
// ------------ Canvas -----------
/** game canvas */
const CV = new Canvas('game-canvas');

// ----------- Entities ------------
/** dynamic array for storing entities*/
let entities = [];
/** main player entity */
let PL = new Entity('assets/img/trollge.png', 32, 32);
entities.push(PL);

// ---------- Game clock -----------
/** html target for game clock toggle button */
const BTN_TOGGLE_CLOCK = document.getElementById('btn-toggle-clock');
/** html target for game clock reset button */
const BTN_RESET_CLOCK = document.getElementById('btn-reset-clock');
/** html target for game clock */
const H_GAME_CLOCK = document.getElementById('h-gameclock');
/** variable to store game's clock time  */
let gameTime = 0;
/** initialized empty variable to store game's timer loop */
let gameClock = null;

// ------- Player Movement ---------
// movement states for the directions
let mvUp = false;
let mvDown = false;
let mvLeft = false;
let mvRight = false;


// +++++++++++++++++ Player Movement +++++++++++++++++++
/** handle keydown events */
function handleKeydown(keydownEvent) {
    let k = keydownEvent.key;
    if (k == 'ArrowUp' || k == 'W') mvUp = true;
    if (k == 'ArrowDown' || k == 'S') mvDown = true;
    if (k == 'ArrowLeft' || k == 'A') mvLeft = true;
    if (k == 'ArrowRight' || k == 'D') mvRight = true;
    if (k == '-') PL.kp--;
    if (k == '=') PL.kp++;
}

/** handle keyup events */
function handleKeyup(keyupEvent) {
    let k = keyupEvent.key;
    if (k == 'ArrowUp' || k == 'W') mvUp = false;
    if (k == 'ArrowDown' || k == 'S') mvDown = false;
    if (k == 'ArrowLeft' || k == 'A') mvLeft = false;
    if (k == 'ArrowRight' || k == 'D') mvRight = false;
    // if (k == '-') PL.kp--;
    // if (k == '=') PL.kp++;
}

/** check movement states to move player */
function movePlayer() {
    if (mvUp) {
        let new_y = PL.y - PL.kp;
        if (new_y >= 0) PL.y = new_y;
        else PL.y = 0;
    }
    if (mvDown) {
        let new_y = PL.y + PL.kp;
        if (new_y + PL.h <= CV.CV_HEIGHT) PL.y = new_y;
        else PL.y = CV.CV_HEIGHT - PL.h;
    }
    if (mvLeft) {
        new_x = PL.x - PL.kp;
        if (new_x >= 0) PL.x = new_x;
        else PL.x = 0;
    }
    if (mvRight) {
        new_x = PL.x + PL.kp;
        if (new_x + PL.w <= CV.CV_WIDTH) PL.x = new_x;
        else PL.x = CV.CV_WIDTH - PL.w;
    }
}



// ++++++++++++++++++++++ Game Clock +++++++++++++++++++++++
function incrementClock() {
    gameTime++;
    H_GAME_CLOCK.textContent = gameTime.toString() + 's';
}

function toggleClock() {
    if (gameClock != null) {
        BTN_TOGGLE_CLOCK.textContent = 'Start';
        clearInterval(gameClock);
        gameClock = null;
    } else {
        BTN_TOGGLE_CLOCK.textContent = 'Pause';
        gameClock = setInterval(incrementClock, 1000);
    }
}

function resetClock() {
    gameTime = 0;
    H_GAME_CLOCK.textContent = '0s';
}


// ++++++++++++++++++++ Initialization +++++++++++++++++++++
/** add event listeners except onload listener */
function addListeners() {
    document.addEventListener('keydown',handleKeydown);
    BTN_TOGGLE_CLOCK.addEventListener("click", toggleClock);
    BTN_RESET_CLOCK.addEventListener('click',resetClock);
}


/** onload callback */
function start() {
    addListeners();
    CV.clearAndDraw(entities);
}
window.addEventListener('load', start);
