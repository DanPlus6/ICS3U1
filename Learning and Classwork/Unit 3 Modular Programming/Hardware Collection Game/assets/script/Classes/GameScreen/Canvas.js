'use strict';

import { Entity } from '../Entities/Entity.js';
import { SpatialGrid } from './SpatialGrid.js';
import { MakeConst } from '../../functions/MakeConst.js';

/** canvas/screen class for the game, replaces basic HTML5 canvas */
export class Canvas {
    /**
     * @param {string} canvasId id for the canvas html element  
     * @param {number} cellSize size for each spatial grid cell as an integer
     */
    constructor(canvasId, cellSize=24) {
        // HTML5 canvas
        MakeConst(this, 'CANVAS', document.getElementById(canvasId));
        MakeConst(this, 'BRUSH', this.CANVAS.getContext('2d'));

        // dimensions of canvas
        MakeConst(this, 'WIDTH', this.CANVAS.width);
        MakeConst(this, 'HEIGHT', this.CANVAS.height);

        /** spatial grid to store active entities on the page */
        this.spatGrid = new SpatialGrid(cellSize);
    }

    /**
     * Append an entity to array storing entities on the page
     * @param {Entity} entity a valid entity object
     */
    addEntity(entity) {
        this.spatGrid.add(entity);
    }

    /** clear visual canvas */
    clearCanvas() {
        this.BRUSH.clearRect(0,0,this.WIDTH,this.HEIGHT);
    }

    /** clear entities/empty spatial grid */
    clearEntities() {
        this.spatGrid.grid.clear();
    }

    /** draws provided entities onto screen */
    clearAndDraw() {
        this.clearCanvas();
        for (const v of this.spatGrid.grid.values()) {
            const e = v[0];
            this.BRUSH.drawImage(e.sprite, e.x, e.y, e.w, e.h);
        }
    }
}
