'use strict';
import { Player } from './player.js';
import { Screen } from './canvas.js';

/** Object containing game canvas */
const SCREEN = new Screen('game-canvas');
/** Object containing player */
let player;
const AVATAR_PATH = 'assets/img/trollge.png';
const AVATAR_W = 32;
const AVATAR_H = 32;


/** callback draw graphics onto the canvas */
function draw() {
    SCREEN.BRUSH.drawImage(player.avatar, player.x, player.y, player.w, player.h);
}

/** load attributes of graphics to display then draw onto canvas */
function loadAndDrawImages() {
    player = new Player(AVATAR_PATH, AVATAR_W, AVATAR_H);

    player.avatar.onload = function() {
        draw();
    }
}


/** start() but for multiple javascripts being imported */
window.addEventListener('load', function() {
    loadAndDrawImages();
});
