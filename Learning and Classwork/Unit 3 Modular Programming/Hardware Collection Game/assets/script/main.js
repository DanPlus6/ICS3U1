'use strict';

import { Entity } from './Classes/Entities/Entity.js';
import { Player } from './Classes/Player/Player.js';
import { Canvas } from './Classes/GameScreen/Canvas.js';

// +++++++++++++++++ Init variables ++++++++++++++++++++
// ------------ Canvas -----------
/** game screen/canvas */
let CV;

// ----------- Player ------------
/** const path to player sprite for game resetting */
const PL_SPRITE_SRC = '';
let PL;

// ---------- Game clock -----------
/** html target for game clock toggle button */
const BTN_TOGGLE_CLOCK = document.getElementById('btn-toggle-clock');
/** html target for game clock reset button */
const BTN_RESET_CLOCK = document.getElementById('btn-reset-clock');
/** html target for game clock */
const H_GAME_CLOCK = document.getElementById('h-gameclock');
/** variable to store game's clock time  */
let gameTime;
/** variable storing storing game clock's interval */
let gameClock;

// ------- Player Movement ---------
// states for directional movement and increasing and decreasing player speed
let mvUp = false;
let mvDown = false;
let mvLeft = false;
let mvRight = false;
let incKp = false;
let decKp = false;
/** variable storing game refresher's interval */
let gameRefresher;


// +++++++++++++++++ Player Movement +++++++++++++++++++
/**
 * Toggle on movement states when respective key is pressed down
 * @param {KeyboardEvent} keydownEvent keydown event
 */
function handleKeydown(keydownEvent) {
    let k = keydownEvent.key;
    if (k == 'ArrowUp' || k == 'W' || k == 'w') mvUp = true;
    if (k == 'ArrowDown' || k == 'S' || k == 's') mvDown = true;
    if (k == 'ArrowLeft' || k == 'A' || k == 'a') mvLeft = true;
    if (k == 'ArrowRight' || k == 'D' || k == 'd') mvRight = true;
    if (k == '-') decKp = true;
    if (k == '=') incKp = true;
}

/**
 * Toggle off movement states when respective key is lifted
 * @param {KeyboardEvent} keyupEvent keyup event
 */
function handleKeyup(keyupEvent) {
    let k = keyupEvent.key;
    if (k == 'ArrowUp' || k == 'W' || k == 'w') mvUp = false;
    if (k == 'ArrowDown' || k == 'S' || k == 's') mvDown = false;
    if (k == 'ArrowLeft' || k == 'A' || k == 'a') mvLeft = false;
    if (k == 'ArrowRight' || k == 'D' || k == 'd') mvRight = false;
    if (k == '-') decKp = false;
    if (k == '=') incKp = false;
}

/** check momvement states to move the player */
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
/** increment the game clock */
function incrementClock() {
    gameTime++;
    H_GAME_CLOCK.textContent = gameTime.toString() + 's';
}

/** toggles the game clock and pauses/unpauses the game */
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

/** reset the game clock and reset the game */
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
    PL = new Player(PL_SPRITE_SRC);
    CV.addEntity(PL);
    refreshGame();
}


// ++++++++++++++++++++ Callbacks for Init +++++++++++++++++++++
/** refresh game */
function refreshGame() {
    handleControls();
    CV.clearAndDraw();
}

/** attaches event listeners for the game after it's been started */
function addListeners() {

}

/** attaches base event listeners that persist between game resets */
function addBaseListeners() {
    // For game toggle and reset buttons
    BTN_TOGGLE_CLOCK.addEventListener("click", toggleClock);
    BTN_RESET_CLOCK.addEventListener('click',resetClock);
}

// ++++++++++++++++++++ Initialization +++++++++++++++++++++
/** page onload callback */
function init() {
    addBaseListeners();
}

/** game load callback */  
function start() {
    // Canvas
    CV = new Canvas('game-canvas', 24);

    // Player
    PL = new Player(PL_SPRITE_SRC);
    CV.addEntity(PL);

    // Game clock
    gameTime = 0;
    gameClock = null;

    // Player Movement
    let mvUp = false;
    let mvDown = false;
    let mvLeft = false;
    let mvRight = false;
    let incKp = false;
    let decKp = false;
    
    gameRefresher = null;

    addListeners();
    CV.clearAndDraw();
}

// run onload initialization function once page loads
window.addEventListener('load',init);
