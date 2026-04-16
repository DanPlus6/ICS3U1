'use strict';

import { Entity } from './Classes/Entities/Entity.js';
import { InputManager } from './Classes/Player/InputManager.js';
import { ActionMap } from './Classes/Player/ActionMap.js';
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
// HTML targets
const BTN_TOGGLE_CLOCK = document.getElementById('btn-toggle-clock');
const BTN_RESET_CLOCK = document.getElementById('btn-reset-clock');
const H_GAME_CLOCK = document.getElementById('h-gameclock');
// clock and intervals
/** variable to store game's clock time  */
let gameTime;
/** variable storing storing game clock's interval */
let gameClock;
/** variable storing game refresher's interval */
let gameRefresher;

// ------- Player Movement ---------
/** input manager that listens player input (keyboard events) */
let iptManager;
/** action map that maps keyboard events to player actions (e.g. movements) */
let actMapper;


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
        start();
    } else {
        BTN_TOGGLE_CLOCK.textContent = 'Pause';

        start();

        gameRefresher = setInterval(refreshGame,20);
        gameClock = setInterval(incrementClock, 1000);
    }
}


// ++++++++++++++++++++ Callbacks for Init +++++++++++++++++++++
/** refresh game */
function refreshGame() {
    PL.update(actMapper,CV);
    CV.clearAndDraw();
}

/** attaches event listeners for the game after it's been started */
function addListeners() {
    // currently empty, awaiting new features
}

/** attaches base event listeners that persist between game resets */
function addBaseListeners() {
    // For game toggle and reset buttons
    BTN_TOGGLE_CLOCK.addEventListener("click", toggleClock);
    BTN_RESET_CLOCK.addEventListener('click',start);
}

// ++++++++++++++++++++ Initialization +++++++++++++++++++++
/** page onload callback */
function init() {
    addBaseListeners();
}

/** game load/game reset callback */  
function start() {
    if (!!CV) {
        CV.clearCanvas();
        CV.clearEntities();
    }

    // Canvas
    CV = new Canvas('game-canvas', 24);

    // Game clock
    gameTime = 0;
    if (gameClock) clearInterval(gameClock);
    if (gameRefresher) clearInterval(gameRefresher);
    gameClock = null;
    gameRefresher = null;
    H_GAME_CLOCK.textContent = '0s';
    BTN_TOGGLE_CLOCK.textContent = 'Start';

    // Player Movement
    iptManager = new InputManager();
    actMapper = new ActionMap(iptManager);

    // Player
    PL = new Player({path:PL_SPRITE_SRC,cv:CV,actMap:actMapper});
    CV.addEntity(PL);
    
    addListeners();
    CV.clearAndDraw();
}

// run onload initialization function once page loads
window.addEventListener('load',init);
