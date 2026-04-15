'use strict';

import { Entity } from '../Entities/Entity.js';
import { ActionMap } from './ActionMap.js';

/** Object representing a player */
export class Player extends Entity {
    /**
     * @param {string} path path to the image for player's sprite
     * @param {number} width width for player avatar
     * @param {number} height height for player avatar
     * @param {number} kpMin minimum movement speed for player
     * @param {number} kpMax maximum movement speed for player
     */
    constructor(path, width = 32, height = 32, kpMin = 1, kpMax=10) {
        // inherit properties from Entity class
        super((path ? path : 'assets/img/PlayerAvatar/trollge.png'),width,height);
        
        // player movement
        this.kp = 1;
        this.KP_MIN = kpMin;
        this.KP_MAX = kpMax;
    }

    /**
     * check player actions' state to actually perform them
     * @param {ActionMap} actMap active ActionMap object to check for player actions
     */
    update(actMap) {
        if (mvUp) {
            let new_y = this.y - this.kp;
            if (new_y >= 0) this.y = new_y;
            else this.y = 0;
        }
        if (mvDown) {
            let new_y = this.y + this.kp;
            if (new_y + this.h <= CV.HEIGHT) this.y = new_y;
            else this.y = CV.HEIGHT - this.h;
        }
        if (mvLeft) {
            let new_x = this.x - this.kp;
            if (new_x >= 0) this.x = new_x;
            else this.x = 0;
        }
        if (mvRight) {
            let new_x = this.x + this.kp;
            if (new_x + this.w <= CV.WIDTH) this.x = new_x;
            else this.x = CV.WIDTH - this.w;
        }
        if (incKp) {
            if (this.kp < this.KP_MAX) this.kp++;
        }
        if (decKp) {
            if (this.kp > this.KP_MIN) this.kp--;
        }
    }
}
