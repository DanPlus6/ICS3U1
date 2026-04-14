'use strict';

import { Entity } from '../Entities/Entity.js';

/** spatial grid class for the game screen for efficient 2d collision detection */
export class SpatialGrid {
	/**
	 * @param {number} cellSize size of each square cell in spatial grid as an integer
	 */
	constructor(cellSize) {
		this.cellSize = cellSize;
		this.grid = new Map();
	}

	/**
	 * Add an entity to a cell in the spatial grid based on their location
	 * @param {Entity} entity object containing the entity to be added
	 */
	add(entity) {
		const cellKey = this.getCellKey(entity.x, entity.y);
		if (!this.grid.has(cellKey)) this.grid.set(cellKey, []);
		this.grid.get(cellKey).push(entity);
	}

	/**
	 * Get entities nearby to an entitiy
	 * @param {*} entity the entity
	 * @returns {Entity[]} an array containing neighboring entities
	 */
	getNearby(entity) {
		const nearby = [];

		for (let dx = -1; dx <= 1; dx++) {
			for (let dy = -1; dy <= 1; dy++) {
				const neighborKey = this.getCellKey(
					entity.x + dx * this.cellSize,
					entity.y + dy * this.cellSize
				);
				if (this.grid.has(neighborKey)) nearby.push(...this.grid.get(neighborKey));
			}
		}

		return nearby;
	}

	/**
	 * Get the cellKey pointing to the cell housing a requested location in the spatial grid
	 * @param {*} x The x coordinate of the location
	 * @param {*} y The y coordinate of the location
	 * @returns cellKey of the location
	 */
	getCellKey(x, y) {
		return `${Math.floor(x / this.cellSize)},${Math.floor(y / this.cellSize)}`;
	}
}
