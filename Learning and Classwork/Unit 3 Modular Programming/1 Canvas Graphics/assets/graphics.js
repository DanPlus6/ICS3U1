'use strict';

// Const values for the canvas
/** Const refs to the canvas */
const CANVAS = document.getElementById('game-canvas');
/** Const ref to canvas graphics context */
const BRUSH = CANVAS.getContext('2d');

const CV_WIDTH = CANVAS.width;
const CV_HEIGHT = CANVAS.height;

// vals for controlling player avatar
class Player {
    constructor(avatarPath, w, h, x, y) {
        this.avatar = new Image();
        this.avatar.src = avatarPath;

        this.w = w;
        this.h = h;

        this.x = x;
        this.y = y;
    }

}

let player;
/** load attributes of graphics to display */
function loadImages() {
    player = new Player();
}

/** draw graphics onto the canvas */
function draw() {
    BRUSH.drawImage(player.avatar, player.x, player.y, player.w, player.h);
}
