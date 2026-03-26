'use strict';

/** define player object */
export class Player {
    /**
     * @param {string} path path to the image for player's avatar
     * @param {number} width width for avatar
     * @param {number} height height for avatar
     */
    constructor(path, width, height) {
        // player avatar's image object
        this.avatar = new Image();
        this.avatar.src = path;

        // player avatar's width and height
        this.w = width;
        this.h = height;

        // player avatar's top-left x and y coordinates
        this.x = 0;
        this.y = 0;
    }

}
