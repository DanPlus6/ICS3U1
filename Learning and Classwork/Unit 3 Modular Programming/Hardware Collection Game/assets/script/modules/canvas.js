'use strict';

import { Entity } from './entity.js'

/** define canvas/screen object */
export class Canvas {
    /**
     * @param {string} canvasId  id for the canvas html element  
     */
    constructor(canvasId) {
        /** ref to the canvas */
        this.CANVAS = document.getElementById(canvasId);

        /** ref to the canvas graphics context */
        this.BRUSH = this.CANVAS.getContext('2d');

        // redundant values for storing canvas width and height
        this.CV_WIDTH = this.CANVAS.width;
        this.CV_HEIGHT = this.CANVAS.height;

        /** array to store active entities on the page */
        this.entities = [];

        Object.freeze(this);
    }

    /**
     * Append an entity to array storing entities on the page
     * @param {Entity} entity a valid entity object
     */
    addEntity(entity) {
        this.entities.push(entity);
    }

    /**
     * draws provided entities onto screen
     * @param {Entity[]} entities array containing entity objects to be drawn
     */
    clearAndDraw(entities) {
        this.BRUSH.clearRect(0,0,this.CV_WIDTH,this.CV_HEIGHT);
        for (const ent of entities) {
            this.BRUSH.drawImage(ent.sprite, ent.x, ent.y, ent.w, ent.h);
        }
    }
}
