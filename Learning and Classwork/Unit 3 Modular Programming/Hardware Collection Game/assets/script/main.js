'use strict';

import { Entity } from './Classes/Entities/Entity.js';
import { Player } from './Classes/Entities/Player.js';
import { Canvas } from './Classes/GameScreen/Canvas.js';

// +++++++++++++++++ Init variables ++++++++++++++++++++
// ------------ Canvas -----------
/** game screen/canvas */
let CV = new Canvas('game-canvas', 24);

// ----------- Player ------------
/** const path to player sprite for game resetting */
const PL_SPRITE_SRC = 'assets/img/big_rock.png';
let PL = new Player(PL_SPRITE_SRC);
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
        if (new_y + PL.h <= CV.HEIGHT) PL.y = new_y;
        else PL.y = CV.HEIGHT - PL.h;
    }
    if (mvLeft) {
        let new_x = PL.x - PL.kp;
        if (new_x >= 0) PL.x = new_x;
        else PL.x = 0;
    }
    if (mvRight) {
        let new_x = PL.x + PL.kp;
        if (new_x + PL.w <= CV.WIDTH) PL.x = new_x;
        else PL.x = CV.WIDTH - PL.w;
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
    CV.clearCanvas();
    CV.clearEntities();

    // reset player
    PL = new Entity(PL_SPRITE_SRC);
    CV.addEntity(PL);
    refreshGame();
}


// ++++++++++++++++++++ Callbacks for Init +++++++++++++++++++++
/** refresh game */
function refreshGame() {
    handleControls();
    CV.clearAndDraw();
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
    CV.clearAndDraw();
}
window.addEventListener('load', start);
