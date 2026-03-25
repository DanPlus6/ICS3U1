'use strict';
import { Player } from './player.js';
import { Screen } from './canvas.js';

/** Object containing game canvas */
const SCREEN = new Screen('game-canvas');
/** Object containing player */
let player = new Player();


/** load attributes of graphics to display */
function loadImages() {
    player.avatar.src = "assets/img/trollge.png";
}

/** draw graphics onto the canvas */
function draw() {
    SCREEN.BRUSH.drawImage(player.avatar, player.x, player.y, player.w, player.h);
}

/** start() but for multiple javascripts being imported */
window.addEventListener('load', function() {
    loadImages();
    draw();
});
