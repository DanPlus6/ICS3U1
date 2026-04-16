'use strict';

import { Entity } from '../Entities/Entity.js';
import { Canvas } from '../GameScreen/Canvas.js';
import { ActionMap } from './ActionMap.js';

/** Object representing a player */
export class Player extends Entity {
    /**
     * Constructs a player entity
     * @param {Object} args destructured object containing arguments
     * @param {string} args.path path to the image for player's sprite
     * @param {Canvas} args.cv active game screen
     * @param {ActionMap} args.actMap active ActionMap object to check for player actions
     * @param {number} [args.width] width for player avatar
     * @param {number} [args.height] height for player avatar
     * @param {number} [args.kpMin] minimum movement speed for player
     * @param {number} [args.kpMax] maximum movement speed for player
     */
    constructor({path='assets/img/PlayerAvatar/trollge.png', cv, actMap, width=96, height=96, kpMin=1, kpMax=10}) {
        // inherit properties from Entity class
        super({path:path, cv:cv, width:width, height:height});

        // player movement
        this.cv = cv;
        this.actMap = actMap;
        this.kp = 4;
        this.KP_MIN = kpMin;
        this.KP_MAX = kpMax;
    }

    /** check player actions' state to actually perform them */
    update() {
        /** lambda/short-form for checking state of an action */
        const check = act => this.actMap.isActive(act);
        
        if (check('mvUp')) {
            let new_y = this.y - this.kp;
            if (new_y >= 0) this.y = new_y;
            else this.y = 0;
        }
        if (check('mvDown')) {
            let new_y = this.y + this.kp;
            if (new_y + this.h <= this.cv.HEIGHT) this.y = new_y;
            else this.y = this.cv.HEIGHT - this.h;
        }
        if (check('mvLeft')) {
            let new_x = this.x - this.kp;
            if (new_x >= 0) this.x = new_x;
            else this.x = 0;
        }
        if (check('mvRight')) {
            let new_x = this.x + this.kp;
            if (new_x + this.w <= this.cv.WIDTH) this.x = new_x;
            else this.x = this.cv.WIDTH - this.w;
        }
        if (check('incKp')) {
            if (this.kp < this.KP_MAX) this.kp++;
        }
        if (check('decKp')) {
            if (this.kp > this.KP_MIN) this.kp--;
        }
    }
}
