'use strict';

/** object representing an entity */
export class Entity {
    /**
     * @param {string} path path to the image for entities sprite
     * @param {number} width width for avatar
     * @param {number} height height for avatar
     */
    constructor(path, width, height, spdCap=10) {
        // player avatar's image object
        this.sprite = new Image();
        this.sprite.src = path;

        // player avatar's width and height
        this.w = width;
        this.h = height;

        // player avatar's top-left x and y coordinates
        this.x = 0;
        this.y = 0;

        // player movement
        this.kp = 1;
        this.KP_MIN = 1;
        this.KP_MAX = 10;
    } 
}
