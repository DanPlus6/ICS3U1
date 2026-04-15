'use strict';

/** class for managing user/player inputs */
export class InputManager {
    constructor() {
        /** map to store status of keys */
        this.keys = {};

        // listen for keydown and keyup events
        window.addEventListener('keydown', keydownEvent => this.keys[keydownEvent.key] = true);
        window.addEventListener('keyup', keyupEvent => this.keys[keyupEvent.key] = false);
    }

    /**
     * check if a key is currently pressed
     * @param {*} key querying key
     * @returns `true` if requested key has been pressed before and is currently pressed
     */
    isDown(key) {
        return !!this.keys[code];
    }
}
