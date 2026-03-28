'use strict';
import { Player } from './modules/player.js';
import { Screen } from './modules/canvas.js';

// ----------------- Init variables ------------------
/* canvas object */
const CV = new Screen('game-canvas');
/* PL object */
let PL = new Player('assets/img/trollge.png', 32, 32);


// ----------------- Canvas init and drawing ------------------
/** callback draw graphics onto the canvas */
function draw() {
    CV.clearAll();
    CV.BRUSH.drawImage(PL.avatar, PL.x, PL.y, PL.w, PL.h);
}


// ----------------- Player controls ------------------
/** handle PL controls */
function controls(keydownEvent) {
    let keyPressed = keydownEvent.key;
    let new_y;
    let new_x;
    switch (keyPressed) {
        case 'ArrowUp':
            new_y = PL.y - PL.kp;
            if (new_y >= 0) PL.y = new_y;
            else PL.y = 0;
            break;
        case 'ArrowDown':
            new_y = PL.y + PL.kp;
            if (new_y + PL.h <= CV.CV_HEIGHT) PL.y = new_y;
            else PL.y = CV.CV_HEIGHT - PL.h;
            break;
        case 'ArrowLeft':
            new_x = PL.x - PL.kp;
            if (new_x >= 0) PL.x = new_x;
            else PL.x = 0;
            break;
        case 'ArrowRight':
            new_x = PL.x + PL.kp;
            if (new_x + PL.w <= CV.CV_WIDTH) PL.x = new_x;
            else PL.x = CV.CV_WIDTH - PL.w;
            break;
        case '-':
            if (PL.kp > 1) PL.kp--;
            break;
        case '=':
            if (PL.kp < PL.KP_CAP) PL.kp++;
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
    draw();
}
window.addEventListener('load', start);
