'use strict';

import { Entity } from './entity.js';

/** Object representing a player */
export class Player extends Entity {
    /**
     * @param {string} path path to the image for player's sprite
     * @param {number} width width for player avatar
     * @param {number} height height for player avatar
     * @param {number} kpMin minimum movement speed for player
     * @param {number} kpMax maximum movement speed for player
     */
    constructor(path, width = 0, height = 0, kpMin = 1, kpMax=10) {
        // inherit properties from Entity class
        super(path,width,height);
        
        // player movement
        this.kp = 1;
        this.KP_MIN = kpMin;
        this.KP_MAX = kpMax;
    }
}
