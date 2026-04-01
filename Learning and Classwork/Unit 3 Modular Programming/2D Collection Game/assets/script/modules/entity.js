'use strict';

/** Object representing an entity */
export class Entity {
    /**
     * @param {string} path path to the image for entities sprite
     * @param {number} width width for avatar
     * @param {number} height height for avatar
     */
    constructor(path, width, height) {
        // entity avatar's image object
        this.sprite = new Image();
        this.sprite.src = path;

        // entity avatar's width and height
        this.w = width;
        this.h = height;

        // entity avatar's top-left x and y coordinates
        this.x = 0;
        this.y = 0;
    } 
}
