'use strict';

/** define player object */
export class Player {
    constructor(avatarPath, w, h, x, y) {
        // player avatar's image object
        this.avatar = new Image();
        this.avatar.src = avatarPath;

        // player avatar's width and height
        this.w = w;
        this.h = h;

        // player avatar's top-left x and y coordinates
        this.x = x;
        this.y = y;
    }

}
