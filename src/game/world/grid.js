import {
    BOARD_X,
    BOARD_Y,
    GRID_COLS,
    GRID_ROWS,
    TILE_SIZE
} from '../config.js';

export const TILE_FLOOR = 0;
export const TILE_WALL = 1;

export class Grid {
    constructor (map) {
        this.map = map;
    }

    setMap (map) {
        this.map = map;
    }

    isInside (col, row) {
        return col >= 0 && col < GRID_COLS && row >= 0 && row < GRID_ROWS;
    }

    isWalkable (col, row) {
        return this.isInside(col, row) && this.map[row][col] === TILE_FLOOR;
    }

    tileToWorldCenter (col, row) {
        return {
            x: BOARD_X + col * TILE_SIZE + TILE_SIZE / 2,
            y: BOARD_Y + row * TILE_SIZE + TILE_SIZE / 2
        };
    }

    worldToTile (x, y) {
        return {
            col: Math.floor((x - BOARD_X) / TILE_SIZE),
            row: Math.floor((y - BOARD_Y) / TILE_SIZE)
        };
    }

    rectOverlapsWall (centerX, centerY, halfSize) {
        const left = centerX - halfSize;
        const right = centerX + halfSize;
        const top = centerY - halfSize;
        const bottom = centerY + halfSize;

        const epsilon = 0.0001;
        const minCol = Math.floor((left + epsilon - BOARD_X) / TILE_SIZE);
        const maxCol = Math.floor((right - epsilon - BOARD_X) / TILE_SIZE);
        const minRow = Math.floor((top + epsilon - BOARD_Y) / TILE_SIZE);
        const maxRow = Math.floor((bottom - epsilon - BOARD_Y) / TILE_SIZE);

        for (let row = minRow; row <= maxRow; row++) {
            for (let col = minCol; col <= maxCol; col++) {
                if (!this.isWalkable(col, row)) {
                    return true;
                }
            }
        }

        return false;
    }
}
