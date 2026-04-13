'use strict';

import { Entity } from './Entity.js'

/** canvas/screen object for the game, replaces basic HTML5 canvas */
export class Canvas {
    /**
     * @param {string} canvasId  id for the canvas html element  
     */
    constructor(canvasId) {
        /** target to the HTML5 canvas */
        this.CANVAS = document.getElementById(canvasId);
        /** target to the HTML5 canvas' 2d graphics context */
        this.BRUSH = this.CANVAS.getContext('2d');

        /** width of HTML5 canvas */
        this.WIDTH = this.CANVAS.width;
        /** height of HTML5 canvas */
        this.HEIGHT = this.CANVAS.height;

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
        this.BRUSH.clearRect(0,0,this.WIDTH,this.HEIGHT);
        for (const e of entities) {
            this.BRUSH.drawImage(e.sprite, e.x, e.y, e.w, e.h);
        }
    }
}
