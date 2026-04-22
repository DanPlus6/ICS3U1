'use strict';

import { Entity } from './Classes/Entities/Entity.js';
import { InputManager } from './Classes/Player/InputManager.js';
import { ActionMap } from './Classes/Player/ActionMap.js';
import { Player } from './Classes/Player/Player.js';
import { Canvas } from './Classes/GameScreen/Canvas.js';

import { Epilepsy } from './functions/Epilepsy.js';
import { BarrelRoll } from './functions/BarrelRoll.js';

// +++++++++++++++++ Init variables ++++++++++++++++++++
// ------------ Canvas -----------
/** game screen/canvas */
let CV;

// ----------- Player ------------
/** const path to player sprite for game resetting */
const PL_SPRITE_SRC = 'assets/img/PlayerAvatar/trollge.png';
// player sprite dimensions
const PL_W = 142;
const PL_H = 128;
const PL_S = 8;
/** player object */
let PL;

// ---------- Game Essentials -----------
// HTML targets
const BTN_TOGGLE_CLOCK = document.getElementById('btn-toggle-clock');
const BTN_RESET_CLOCK = document.getElementById('btn-reset-clock');
const H_GAME_CLOCK = document.getElementById('h-gameclock');

/** variable to track if game is paused */
let gameActive;
/** variable to store game's clock time in seconds  */
let gameTime;
/** variable storing game refresher's timeout timer */
let gameRefresher;
/** interval between game refreshes/"frames" in miliseconds */
const REFRESH_INTV = 20;
/** variable to store game's current tick ( there are 1000/REFRESH_INTV ticks per second ) */
let gameTick = 0;
/** 
 * track the selection phase of the game
 * 0 = select
 * 1 = playing
 * 2 = paused
 */
let gamePhase;
/** variable to track what type of user the player chose */
let userType;

// ------- Player Movement ---------
/** input manager that listens player input (keyboard events) */
let iptManager;
/** action map that maps keyboard events to player actions (e.g. movements) */
let actMapper;

// Miscellaneous Global Properties
/** barrel roll state */
globalThis.barrelRolling = false;
/** epilepsy state */
globalThis.givingEpilepsy = false;
/** epilepsy "warning" state */
globalThis.epilepsyWarning = false;
/** whether the user has been warned */
globalThis.epilepsyWarned = false;


// ++++++++++++++++++++++ Game Essentials +++++++++++++++++++++++
/** toggles the game clock and pauses/unpauses the game */
function toggleGame() {
    // pause the game if it's active, start it if it's paused
    if (gameActive) {
        gameActive = false;
        BTN_TOGGLE_CLOCK.textContent = 'Start';
        clearInterval(gameRefresher);
        gameRefresher = null;
    } else {
        // Check if game is in selection phase/first time starting
        if (gamePhase == 0) {
            start();
            gamePhase = 1;
        }

        gameActive = true;
        BTN_TOGGLE_CLOCK.textContent = 'Pause';
        gameRefresher = setInterval(refreshGame, REFRESH_INTV);
    }
}

/** reset the game, bringing user back to character selection screen */
function resetGame() {
    clearInterval(gameRefresher);
    gameRefresher = null;
    gameActive = false;

    BTN_TOGGLE_CLOCK.textContent = 'Start';

    // showCharacterSelect();
    start();
}

// ++++++++++++++++++++ Callbacks for Init +++++++++++++++++++++
/** Show character/user-type selection screen for the player */
function showCharacterSelect() {
    gamePhase = 0;

    console.log('d');
}

/** refresh game, ran on each frame */
function refreshGame() {
    // Update entities and game screen
    PL.update();
    CV.clearAndDraw();

    // Game clock
    gameTick = (gameTick+1) % (1000/REFRESH_INTV);
    // If enough ticks have passed (a second has passed), increment the visual game clock
    if (gameTick === 0) gameTime++;
    H_GAME_CLOCK.textContent = gameTime.toString() + 's';

    // Miscellaneous
    // Do a barrel roll if valid control key(s) are active
    if (actMapper.isActive('barrelRoll')) BarrelRoll();
    // Give the user epilepsy if valid control key(s) are active
    if (actMapper.isActive('epilespy')) Epilepsy();
}

/** attaches event listeners for the game after it's been started */
function addListeners() {
    // currently empty, awaiting new features
}

/** attaches base event listeners that persist between game resets */
function addBaseListeners() {
    // For game toggle and reset buttons
    BTN_TOGGLE_CLOCK.addEventListener("click", toggleGame);
    // Send the player back to character selection screen when reset
    BTN_RESET_CLOCK.addEventListener('click', start);
}

// ++++++++++++++++++++ Initialization +++++++++++++++++++++
/** page onload callback */
function init() {
    addBaseListeners();
    showCharacterSelect();
}

/** game load/game reset callback */  
function start() {
    // Canvas
    CV = new Canvas('game-canvas', 96);

    // Game clock
    gameActive = false;
    gameTime = 0;
    if (gameRefresher) clearInterval(gameRefresher);
    gameRefresher = null;
    H_GAME_CLOCK.textContent = '0s';
    BTN_TOGGLE_CLOCK.textContent = 'Start';

    // Player Movement
    iptManager = new InputManager();
    actMapper = new ActionMap(iptManager);

    // Player
    PL = new Player({path:PL_SPRITE_SRC, cv:CV, actMap:actMapper, width:PL_W, height:PL_H, kp:PL_S});
    CV.addEntity(PL);

    addListeners();
    CV.clearAndDraw();
}

// run onload initialization function once page loads
window.addEventListener('load',init);
