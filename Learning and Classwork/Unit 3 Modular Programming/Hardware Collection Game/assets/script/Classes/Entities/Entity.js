'use strict';

/** Object representing an entity */
export class Entity {
    /**
     * @param {Object} args destructured object containing arguments
     * @param {string} args.path path to the image for entities sprite
     * @param {number} [args.width] width for avatar
     * @param {number} [args.height] height for avatar
     */
    constructor({path, width = 96, height = 96}) {
        // entity avatar's image object
        this.sprite = new Image();
        this.sprite.src = path;

        // entity avatar's width and height
        this.w = (width>0 ? width : this.sprite.naturalWidth);
        this.h = (height>0 ? height : this.sprite.naturalHeight);

        // entity avatar's top-left x and y coordinates
        this.x = 0;
        this.y = 0;
    } 
}
