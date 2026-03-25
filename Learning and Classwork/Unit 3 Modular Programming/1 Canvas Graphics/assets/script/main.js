'use strict';
import { Player } from './player.js'

// Const values for the canvas
/** Const refs to the canvas */
const CANVAS = document.getElementById('game-canvas');
/** Const ref to canvas graphics context */
const BRUSH = CANVAS.getContext('2d');

const CV_WIDTH = CANVAS.width;
const CV_HEIGHT = CANVAS.height;



// vals for controlling player avatar
let player = new Player();


/** load attributes of graphics to display */
function loadImages() {
    player = new Player();
}

/** draw graphics onto the canvas */
function draw() {
    BRUSH.drawImage(player.avatar, player.x, player.y, player.w, player.h);
}
