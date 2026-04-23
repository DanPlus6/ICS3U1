'use strict';

import { CharacterSelect } from './Classes/UI/CharacterSelect.js';
import { InputManager } from './Classes/Player/InputManager.js';
import { ActionMap } from './Classes/Player/ActionMap.js';
import { Entity } from './Classes/Entities/Entity.js';
import { Player } from './Classes/Player/Player.js';
import { Canvas } from './Classes/GameScreen/Canvas.js';

import { BarrelRoll } from './functions/BarrelRoll.js';
import { Epilepsy } from './functions/Epilepsy.js';


// +++++++++++++++++ Init variables ++++++++++++++++++++
// ------------ Canvas -----------
/** game screen/canvas */
let CV;

// ----------- Player ------------
/** available characters for user to select */
const CHARACTERS = [
    {
        id: 'gamer',
        label: 'Gamer',
        description: 'mom I need an rtx 9090 ti for school i swear...',
        spriteSrc: 'assets/img/PlayerAvatar/trollge.png',
        width: 140,
        height: 140,
        speed: 8,
    },
    {
        id: 'nerd',
        label: 'Student',
        description: 'erm actually 🤓👆...',
        spriteSrc: 'assets/img/PlayerAvatar/nerd.png',
        width: 140,
        height: 140,
        speed: 6,
    },
];
/** the character config the player chose on the selection screen */
let userType;
/** player object */
let PL;

// ---------- Game Essentials -----------
// HTML targets
const BTN_TOGGLE_CLOCK = document.getElementById('btn-toggle-clock');
const BTN_RESET_CLOCK = document.getElementById('btn-reset-clock');
const H_GAME_CLOCK = document.getElementById('h-gameclock');

/** variable to track if game is running (not paused) */
let gameActive;
/** variable to store game's clock time in seconds  */
let gameTime;
/** variable storing game refresher's timeout timer */
let gameRefresher;
/** interval between game refreshes/"frames" in miliseconds */
const REFRESH_INTV = 20;
/** variable to store game's current tick ( there are 1000/REFRESH_INTV ticks per second ) */
let gameTick = 0;
/** variable to track whether selection phase is active to prevent overlap */
let charSelecting = false;

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
    // Ignore toggle presses while still on the selection screen
    if (charSelecting) return;

    // Pause game if active
    if (gameActive) {
        gameActive = false;
        BTN_TOGGLE_CLOCK.textContent = 'Start';
        clearInterval(gameRefresher);
        gameRefresher = null;
    }
    // Resume game is paused 
    else {
        gameActive = true;
        BTN_TOGGLE_CLOCK.textContent = 'Pause';
        gameRefresher = setInterval(refreshGame, REFRESH_INTV);
    }
}

/** callback to clear/reset the active game elements */
function resetGame() {
    // Canvas
    CV = new Canvas('game-canvas', 96);

    // Game clock
    gameActive = false;
    gameTime = 0;
    gameTick = 0;
    H_GAME_CLOCK.textContent = '0s';
    BTN_TOGGLE_CLOCK.textContent = 'Start';
    // Clear game refresher interval if already active
    if (gameRefresher) clearInterval(gameRefresher);
    gameRefresher = null;


    // Player Movement
    iptManager = new InputManager();
    actMapper  = new ActionMap(iptManager);
}

/** restart the game as if it's the beginning */
function restartGame() {
    // Prevent overlap if character selection is already active
    if (charSelecting) return;
    charSelecting = true;

    // Game reset
    resetGame();

    // Character selection
    const charSelect = new CharacterSelect(CHARACTERS, (chosen) => {
        userType = chosen;
        build();
    });

    charSelect.show();

    charSelecting = false;
}

/** refresh game, ran on each frame */
function refreshGame() {
    // Update entities and game screen
    PL.update();
    CV.clearAndDraw();

    // Game clock
    gameTick = (gameTick + 1) % (1000 / REFRESH_INTV);
    // If enough ticks have passed (a second has elapsed), increment the visual game clock
    if (gameTick === 0) gameTime++;
    H_GAME_CLOCK.textContent = gameTime.toString() + 's';

    // Miscellaneous
    if (actMapper.isActive('barrelRoll')) BarrelRoll();
    if (actMapper.isActive('epilespy')) Epilepsy();
}

/** attaches base event listeners that persist between game resets */
function addBaseListeners() {
    // Game toggling
    BTN_TOGGLE_CLOCK.addEventListener('click', toggleGame);
    window.addEventListener('keydown', e=>{if(e.key == ' ') toggleGame();});

    // Game resetting
    BTN_RESET_CLOCK.addEventListener('click', restartGame);
    window.addEventListener('keydown', e=>{if(e.key == 'r' || e.key == 'R') restartGame();});
}

// ++++++++++++++++++++ Initialization +++++++++++++++++++++
/** page onload callback */
function init() {
    addBaseListeners();
    restartGame();
}

/** build the user set by the selection screen */
function build() {
    // Build player from whichever character the player selected
    PL = new Player({ 
        path: userType.spriteSrc, cv: CV, actMap: actMapper,
        width: userType.width, height: userType.height, kp: userType.speed
    });
    CV.addEntity(PL);

    CV.clearAndDraw();
}

// run onload initialization function once page loads
window.addEventListener('load', init);
