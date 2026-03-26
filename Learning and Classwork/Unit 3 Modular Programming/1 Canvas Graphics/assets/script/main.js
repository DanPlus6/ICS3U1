'use strict';
import { Player } from './player.js';
import { Screen } from './canvas.js';

// ----------------- Init variables ------------------
/** Object containing game canvas */
const CANVAS = new Screen('game-canvas');
/** Object containing player */
let player;
const AVATAR_PATH = 'assets/img/trollge.png';
const AVATAR_W = 32;
const AVATAR_H = 32;


// ----------------- Canvas init and drawing ------------------
/** callback draw graphics onto the canvas */
function draw() {
    CANVAS.BRUSH.drawImage(player.avatar, player.x, player.y, player.w, player.h);
}

/** load attributes of graphics to display then draw onto canvas */
function loadAndDraw() {
    player = new Player(AVATAR_PATH, AVATAR_W, AVATAR_H);
    player.avatar.onload = function() { draw(); }
}

// ----------------- Player controls ------------------
/** handle player controls */
function controls(keydownEvent) {
    console.log(keydownEvent.key);
}

/** add event listeners except onload listener */
function addListeners() {
    document.addEventListener('keydown',controls);
}


// ----------------- Initialization ------------------
/** onload callback */
function start() {
    addListeners();
    loadAndDraw();
}
window.addEventListener('load', start);
