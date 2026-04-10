'use strict';

import { Entity } from './modules/entity.js';
import { Player } from './modules/player.js';
import { Canvas } from './modules/canvas.js';

// +++++++++++++++++ Init variables ++++++++++++++++++++
// ------------ Canvas -----------
/** game canvas */
const CV = new Canvas('game-canvas');

// ----------- Entities ------------
/** main player entity */
let PL = new Player('assets/img/trollge.png');
CV.addEntity(PL);

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
// states for directional movement and increasing and decreasing player speed
let mvUp = false;
let mvDown = false;
let mvLeft = false;
let mvRight = false;
let incKp = false;
let decKp = false;
/** intialized empty variable to store game refresher */
let gameRefresher = null;


// +++++++++++++++++ Player Movement +++++++++++++++++++
/** handle keydown events */
function handleKeydown(keydownEvent) {
    let k = keydownEvent.key;
    if (k == 'ArrowUp' || k == 'W' || k == 'w') mvUp = true;
    if (k == 'ArrowDown' || k == 'S' || k == 's') mvDown = true;
    if (k == 'ArrowLeft' || k == 'A' || k == 'a') mvLeft = true;
    if (k == 'ArrowRight' || k == 'D' || k == 'd') mvRight = true;
    if (k == '-') decKp = true;
    if (k == '=') incKp = true;
}

/** handle keyup events */
function handleKeyup(keyupEvent) {
    let k = keyupEvent.key;
    if (k == 'ArrowUp' || k == 'W' || k == 'w') mvUp = false;
    if (k == 'ArrowDown' || k == 'S' || k == 's') mvDown = false;
    if (k == 'ArrowLeft' || k == 'A' || k == 'a') mvLeft = false;
    if (k == 'ArrowRight' || k == 'D' || k == 'd') mvRight = false;
    if (k == '-') decKp = false;
    if (k == '=') incKp = false;
}

/** check states for player control */
function handleControls() {
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
        let new_x = PL.x - PL.kp;
        if (new_x >= 0) PL.x = new_x;
        else PL.x = 0;
    }
    if (mvRight) {
        let new_x = PL.x + PL.kp;
        if (new_x + PL.w <= CV.CV_WIDTH) PL.x = new_x;
        else PL.x = CV.CV_WIDTH - PL.w;
    }
    if (incKp) {
        if (PL.kp < PL.KP_MAX) PL.kp++;
    }
    if (decKp) {
        if (PL.kp > PL.KP_MIN) PL.kp--;
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
        
        clearInterval(gameRefresher);
        gameRefresher = null;

        clearInterval(gameClock);
        gameClock = null;
    } else {
        BTN_TOGGLE_CLOCK.textContent = 'Pause';

        gameRefresher = setInterval(refreshGame,20);
        gameClock = setInterval(incrementClock, 1000);
    }
}

function resetClock() {
    // reset and turn off clock
    gameTime = 0;
    H_GAME_CLOCK.textContent = '0s';
    BTN_TOGGLE_CLOCK.textContent = 'Start';
    clearInterval(gameClock); gameClock = null;
    clearInterval(gameRefresher); gameRefresher = null;

    // clear entities
    entities = [];
    refreshGame();

    // reset player
    PL = new Entity('assets/img/trollge.png', 32, 32);
    entities.push(PL);
    refreshGame();
}


// ++++++++++++++++++++ Callbacks for Init +++++++++++++++++++++
/** refresh game */
function refreshGame() {
    handleControls();
    CV.clearAndDraw(entities);
}

/** add event listeners except onload listener */
function addListeners() {
    // player controls
    document.addEventListener('keydown',handleKeydown);
    document.addEventListener('keyup',handleKeyup);

    // game clock
    BTN_TOGGLE_CLOCK.addEventListener("click", toggleClock);
    BTN_RESET_CLOCK.addEventListener('click',resetClock);
}


// ++++++++++++++++++++ Initialization +++++++++++++++++++++
/** onload callback */
function start() {
    addListeners();
    CV.clearAndDraw(entities);
}
window.addEventListener('load', start);
