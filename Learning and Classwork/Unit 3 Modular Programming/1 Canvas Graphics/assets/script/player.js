'use strict';

/** define player object */
export class Player {
    /**
     * @param {string} avatarPath path to the image for player's avatar
     */
    constructor(avatarPath) {
        // player avatar's image object
        this.avatar = new Image();
        this.avatar.src = avatarPath;

        // player avatar's width and height
        this.w = 572;
        this.h = 572;

        // player avatar's top-left x and y coordinates
        this.x = 0;
        this.y = 0;
    }

}
