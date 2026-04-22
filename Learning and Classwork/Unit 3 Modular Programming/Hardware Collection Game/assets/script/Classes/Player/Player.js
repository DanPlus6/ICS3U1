'use strict';

import { Entity } from '../Entities/Entity.js';
import { Canvas } from '../GameScreen/Canvas.js';
import { ActionMap } from './ActionMap.js';

export class Player extends Entity {
    /**
     * Object representing a player entity
     * @param {Object} args destructured object containing arguments
     * @param {string} args.path path to the image for player's sprite
     * @param {Canvas} args.cv active game screen
     * @param {ActionMap} args.actMap active ActionMap object to check for player actions
     * @param {number} [args.width] width for player avatar
     * @param {number} [args.height] height for player avatar
     * @param {number} [args.kpMin] minimum movement speed for player
     * @param {number} [args.kpMax] maximum movement speed for player
     */
    constructor({path='assets/img/PlayerAvatar/trollge.png', cv, actMap, width=96, height=96, kp=4}) {
        // inherit properties from Entity class
        super({path:path, cv:cv, width:width, height:height});

        // player movement
        this.cv = cv;
        this.actMap = actMap;
        this.kp = kp;
    }

    /** Communicate with action map to perform player actions if valid key(s) are pressed */
    update() {
        /** lambda/short-form for checking state of an action */
        const check = act => this.actMap.isActive(act);
        
        // Move up if valid control key(s) are active
        if (check('mvUp')) {
            let new_y = this.y - this.kp;
            if (new_y >= 0) this.y = new_y;
            else this.y = 0;
        }
        // Move down if valid control key(s) are active
        if (check('mvDown')) {
            let new_y = this.y + this.kp;
            if (new_y + this.h <= this.cv.HEIGHT) this.y = new_y;
            else this.y = this.cv.HEIGHT - this.h;
        }
        // Move left if valid control key(s) are active
        if (check('mvLeft')) {
            let new_x = this.x - this.kp;
            if (new_x >= 0) this.x = new_x;
            else this.x = 0;
        }
        // Move right if valid control key(s) are active
        if (check('mvRight')) {
            let new_x = this.x + this.kp;
            if (new_x + this.w <= this.cv.WIDTH) this.x = new_x;
            else this.x = this.cv.WIDTH - this.w;
        }
    }
}
