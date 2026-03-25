'use strict';

export class Player {
    constructor(avatarPath, w, h, x, y) {
        this.avatar = new Image();
        this.avatar.src = avatarPath;

        this.w = w;
        this.h = h;

        this.x = x;
        this.y = y;
    }

}
