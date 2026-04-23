'use strict';

import { Entity } from '../Entities/Entity.js';

export class SpatialGrid {
	/**
	 * redundant spatial grid class for efficient 2d collision detection
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
		// Initialize a cell grid for entity's position if it doesn't exist
		if (!this.grid.has(cellKey)) this.grid.set(cellKey, []);
		this.grid.get(cellKey).push(entity);
	}

	/** 
	 * Remove an entity from the spcial grid
	 * @param {Entity} entity 
	 */
	remove(entity) {
		const cellKey = this.getCellKey(entity.x, entity.y);
		const cell = this.grid.get(cellKey);

		// Check if cell exists
		if (cell) {
			const index = cell.indexOf(entity);
			// If requested entity to remove is found, remove it
			if (index !== -1) cell.splice(index,1);
		}
	}

	/**
	 * Update an entity's position in the spatial grid if they have moved to a different cell
	 * @param {Entity} entity object containing current updated entity
	 */
	update(entity) {
		const oldKey = this.getCellKey(entity.oldX, entity.oldY);
		const newKey = this.getCellKey(entity.x,entity.y);

		// If entity has moved to new position, move it in the spatial grid
		if (oldKey !== newKey) {
			this.remove({x: entity.oldX, y: entity.oldY, ...entity});
			this.add(entity);
		}
	}

	/**
	 * Get entities nearby to an entitiy
	 * @param {*} entity the entity
	 * @returns {Entity[]} an array containing neighboring entities
	 */
	getNearby(entity) {
		const nearby = [];

		// Check adjacent cells
		for (let dx = -1; dx <= 1; dx++) {
			for (let dy = -1; dy <= 1; dy++) {
				const neighborKey = this.getCellKey(
					entity.x + dx * this.cellSize,
					entity.y + dy * this.cellSize
				);
				// If adjacent cell exists, insert its entities to a result array
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
