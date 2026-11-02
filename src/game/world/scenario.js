import { GRID_COLS, GRID_ROWS } from '../config.js';
import { TILE_FLOOR, TILE_WALL } from './grid.js';

const MAX_ATTEMPTS = 80;
const MIN_RELIC_DISTANCE = 12;
const GUARD_COUNT = 2;
const PATROLS_PER_GUARD = 4;
const PATROL_MIN_ENTRANCE_DISTANCE = 3;
const PATROL_MIN_SEPARATION = 4;
const MIN_REACHABLE_CELLS = Math.floor(
    (GRID_COLS - 2) * (GRID_ROWS - 2) * 0.55
);

const DIRECTIONS = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
];

const randomInt = (min, max) => (
    min + Math.floor(Math.random() * (max - min + 1))
);

const shuffle = (items) => {
    for (let i = items.length - 1; i > 0; i--) {
        const j = randomInt(0, i);
        [items[i], items[j]] = [items[j], items[i]];
    }

    return items;
};

const keyOf = (col, row) => `${col},${row}`;

const parseKey = (key) => {
    const [col, row] = key.split(',').map(Number);

    return { col, row };
};

const sameTile = (a, b) => a.col === b.col && a.row === b.row;

const manhattan = (a, b) => (
    Math.abs(a.col - b.col) + Math.abs(a.row - b.row)
);

const isWalkable = (map, col, row) => (
    col >= 0
    && col < GRID_COLS
    && row >= 0
    && row < GRID_ROWS
    && map[row][col] === TILE_FLOOR
);

const createMap = (rectangleCount, singleCount) => {
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

    let placedRectangles = 0;
    let rectangleTries = 0;

    while (placedRectangles < rectangleCount && rectangleTries < 120) {
        rectangleTries++;

        const width = randomInt(1, 4);
        const height = randomInt(1, 3);
        const startCol = randomInt(1, GRID_COLS - width - 1);
        const startRow = randomInt(1, GRID_ROWS - height - 1);

        let free = true;

        for (let row = startRow; row < startRow + height && free; row++) {
            for (let col = startCol; col < startCol + width; col++) {
                if (map[row][col] === TILE_WALL) {
                    free = false;
                    break;
                }
            }
        }

        if (!free) {
            continue;
        }

        for (let row = startRow; row < startRow + height; row++) {
            for (let col = startCol; col < startCol + width; col++) {
                map[row][col] = TILE_WALL;
            }
        }

        placedRectangles++;
    }

    let placedSingles = 0;
    let singleTries = 0;

    while (placedSingles < singleCount && singleTries < 120) {
        singleTries++;

        const col = randomInt(1, GRID_COLS - 2);
        const row = randomInt(1, GRID_ROWS - 2);

        if (map[row][col] === TILE_WALL) {
            continue;
        }

        map[row][col] = TILE_WALL;
        placedSingles++;
    }

    return map;
};

const getBorderFreeCells = (map) => {
    const cells = [];
    const seen = new Set();

    const add = (col, row) => {
        const key = keyOf(col, row);

        if (map[row][col] === TILE_FLOOR && !seen.has(key)) {
            seen.add(key);
            cells.push({ col, row });
        }
    };

    for (let col = 1; col < GRID_COLS - 1; col++) {
        add(col, 1);
        add(col, GRID_ROWS - 2);
    }

    for (let row = 1; row < GRID_ROWS - 1; row++) {
        add(1, row);
        add(GRID_COLS - 2, row);
    }

    return cells;
};

const floodFillDistances = (map, start) => {
    const distances = new Map();
    const queue = [start];

    distances.set(keyOf(start.col, start.row), 0);

    for (let index = 0; index < queue.length; index++) {
        const current = queue[index];
        const distance = distances.get(keyOf(current.col, current.row));

        for (const [deltaCol, deltaRow] of DIRECTIONS) {
            const col = current.col + deltaCol;
            const row = current.row + deltaRow;
            const key = keyOf(col, row);

            if (isWalkable(map, col, row) && !distances.has(key)) {
                distances.set(key, distance + 1);
                queue.push({ col, row });
            }
        }
    }

    return distances;
};

const buildScenario = (map) => {
    const entranceCandidates = shuffle(getBorderFreeCells(map));

    for (const entrance of entranceCandidates) {
        const distances = floodFillDistances(map, entrance);

        if (distances.size < MIN_REACHABLE_CELLS) {
            continue;
        }

        const reachable = [...distances.entries()].map(([key, distance]) => ({
            ...parseKey(key),
            distance
        }));

        const relicCandidates = reachable.filter((cell) => (
            cell.distance >= MIN_RELIC_DISTANCE
            && !sameTile(cell, entrance)
        ));

        if (relicCandidates.length === 0) {
            continue;
        }

        const relic = relicCandidates[randomInt(0, relicCandidates.length - 1)];
        const patrolCandidates = shuffle(reachable.filter((cell) => (
            cell.distance >= PATROL_MIN_ENTRANCE_DISTANCE
            && !sameTile(cell, entrance)
            && !sameTile(cell, relic)
        )));

        const patrols = [];

        for (const candidate of patrolCandidates) {
            const separated = patrols.every((point) => (
                manhattan(point, candidate) >= PATROL_MIN_SEPARATION
            ));

            if (!separated) {
                continue;
            }

            patrols.push({ col: candidate.col, row: candidate.row });

            if (patrols.length === GUARD_COUNT * PATROLS_PER_GUARD) {
                break;
            }
        }

        if (patrols.length < GUARD_COUNT * PATROLS_PER_GUARD) {
            continue;
        }

        return {
            map,
            entrance: { col: entrance.col, row: entrance.row },
            relic: { col: relic.col, row: relic.row },
            guardPatrols: [
                patrols.slice(0, PATROLS_PER_GUARD),
                patrols.slice(PATROLS_PER_GUARD)
            ]
        };
    }

    return null;
};

const getObstacleBudget = (attempt) => {
    if (attempt < 30) {
        return {
            rectangles: randomInt(6, 9),
            singles: randomInt(4, 8)
        };
    }

    if (attempt < 55) {
        return {
            rectangles: randomInt(5, 7),
            singles: randomInt(3, 6)
        };
    }

    return {
        rectangles: randomInt(3, 5),
        singles: randomInt(1, 4)
    };
};

export const generateScenario = () => {
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const budget = getObstacleBudget(attempt);
        const map = createMap(budget.rectangles, budget.singles);
        const scenario = buildScenario(map);

        if (scenario) {
            return scenario;
        }
    }

    const fallback = buildScenario(createMap(0, 0));

    if (fallback) {
        return fallback;
    }

    throw new Error('No se pudo generar un escenario jugable.');
};
