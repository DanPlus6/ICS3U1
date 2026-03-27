'use strict';
import { Player } from './player.js';
import { Screen } from './canvas.js';

// ----------------- Init variables ------------------
// variables for canvas
const CV = new Screen('game-canvas');
// variables for player
let player;
const AVT_PATH = 'assets/img/trollge.png';
const AVT_W = 32;
const AVT_H = 32;
let p_gain = 1;


// ----------------- Canvas init and drawing ------------------
/** callback draw graphics onto the canvas */
function draw() {
    CV.BRUSH.clearRect(0, 0, CV.CV_WIDTH, CV.CV_HEIGHT);
    CV.BRUSH.drawImage(player.avatar, player.x, player.y, player.w, player.h);
}

/** load attributes of graphics to display then draw onto canvas */
function loadAndDraw() {
    player = new Player(AVT_PATH, AVT_W, AVT_H);
    player.avatar.onload = function() { draw(); }
}

// ----------------- Player controls ------------------
/** handle player controls */
function controls(keydownEvent) {
    let keyPressed = keydownEvent.key;
    let new_y;
    let new_x;
    switch (keyPressed) {
        case 'ArrowUp':
            new_y = player.y - p_gain;
            if (new_y >= 0) player.y = new_y;
            else player.y = 0;
            break;
        case 'ArrowDown':
            new_y = player.y + p_gain;
            if (new_y + AVT_H <= CV.CV_HEIGHT) player.y = new_y;
            else player.y = CV.CV_HEIGHT - AVT_H;
            break;
        case 'ArrowLeft':
            new_x = player.x - p_gain;
            if (new_x >= 0) player.x = new_x;
            else player.x = 0;
            break;
        case 'ArrowRight':
            new_x = player.x + p_gain;
            if (new_x + AVT_W <= CV.CV_WIDTH) player.x = new_x;
            else player.x = CV.CV_WIDTH - AVT_W;
            break;
        case '-':
            p_gain--;
            break;
        case '+':
            p_gain++;
            break;
    }

    draw();
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
