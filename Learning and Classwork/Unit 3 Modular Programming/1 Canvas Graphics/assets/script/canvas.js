'use strict';

/** define canvas/screen object */
export class Screen {
    constructor(canvasId) {
        /** ref to the canvas */
        this.CANVAS = document.getElementById(canvasId);

        /** ref to the canvas graphics context */
        this.BRUSH = CANVAS.getContext('2d');

        // redundant values for storing canvas width and height
        this.CV_WIDTH = CANVAS.width;
        this.CV_HEIGHT = CANVAS.height;

        Object.freeze(this);
    }
}
