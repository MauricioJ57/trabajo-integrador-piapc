import {
    BOARD_X,
    BOARD_Y,
    GRID_COLS,
    GRID_ROWS,
    TILE_SIZE
} from '../config.js';

export const TILE_FLOOR = 0;
export const TILE_WALL = 1;

const INTERIOR_WALLS = [
    [6, 4], [7, 4], [6, 5], [7, 5],
    [16, 4], [17, 4], [16, 5], [17, 5],
    [10, 2], [10, 3], [10, 4],
    [13, 2], [13, 3], [13, 4],
    [3, 7], [4, 7], [5, 7],
    [18, 7], [19, 7], [20, 7],
    [11, 9], [12, 9], [13, 9],
    [6, 11], [7, 11], [6, 12], [7, 12],
    [16, 11], [17, 11], [16, 12], [17, 12],
    [20, 3], [20, 4],
    [2, 10], [3, 10],
    [20, 13], [21, 13],
    [9, 13], [10, 13]
];

const buildStaticMap = () => {
    const map = Array.from(
        { length: GRID_ROWS },
        () => Array(GRID_COLS).fill(TILE_FLOOR)
    );

    for (let col = 0; col < GRID_COLS; col++) {
        map[0][col] = TILE_WALL;
        map[GRID_ROWS - 1][col] = TILE_WALL;
    }

    for (let row = 0; row < GRID_ROWS; row++) {
        map[row][0] = TILE_WALL;
        map[row][GRID_COLS - 1] = TILE_WALL;
    }

    for (const [col, row] of INTERIOR_WALLS) {
        if (col > 0 && col < GRID_COLS - 1 && row > 0 && row < GRID_ROWS - 1) {
            map[row][col] = TILE_WALL;
        }
    }

    return map;
};

export const STATIC_MAP = buildStaticMap();

export const isInside = (col, row) => (
    col >= 0 && col < GRID_COLS && row >= 0 && row < GRID_ROWS
);

export const isWalkable = (col, row) => (
    isInside(col, row) && STATIC_MAP[row][col] === TILE_FLOOR
);

export const tileToWorldCenter = (col, row) => ({
    x: BOARD_X + col * TILE_SIZE + TILE_SIZE / 2,
    y: BOARD_Y + row * TILE_SIZE + TILE_SIZE / 2
});

export const worldToTile = (x, y) => ({
    col: Math.floor((x - BOARD_X) / TILE_SIZE),
    row: Math.floor((y - BOARD_Y) / TILE_SIZE)
});

export const rectOverlapsWall = (centerX, centerY, halfSize) => {
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
            if (!isWalkable(col, row)) {
                return true;
            }
        }
    }

    return false;
};
