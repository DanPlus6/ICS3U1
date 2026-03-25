'use strict';
import { Player } from './player.js'
import { Screen } from './canvas.js'

/** Object containing game canvas */
const SCREEN = new Screen('game-id');
/** Object containing player */
let player = new Player();


/** load attributes of graphics to display */
function loadImages() {
    player.src = "assets/img/trollge.png";
}

/** draw graphics onto the canvas */
function draw() {
    SCREEN.BRUSH.drawImage(player.avatar, player.x, player.y, player.w, player.h);
}

function start() {
    loadImages();
    draw();
}
