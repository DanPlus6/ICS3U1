'use strict';

import { Canvas } from "../GameScreen/Canvas.js";

/** Object representing an entity */
export class Entity {
    /**
     * @param {Object} args destructured object containing arguments
     * @param {Canvas} cv active canvas for scaling sprite/avatar dimensions
     * @param {string} args.path path to the image for entities sprite
     * @param {number} [args.width] width for avatar
     * @param {number} [args.height] height for avatar
     */
    constructor({path, cv, width = 96, height = 96}) {
        // entity avatar's image object
        this.sprite = new Image();
        this.sprite.src = path;

        // entity avatar's width and height, use default size of invalid dimensions provided and downscale if too large
        let stagingW = (width>0 ? width : this.sprite.naturalWidth);
        let stagingH = (height>0 ? height : this.sprite.naturalHeight);

        this.w = (stagingW>cv.WIDTH ? Math.round(cv.WIDTH/10) : stagingW);
        this.h = (stagingH>cv.HEIGHT ? Math.round(cv.HEIGHT/10) : stagingH);

        // entity avatar's top-left x and y coordinates
        this.x = 0;
        this.y = 0;
    } 
}
