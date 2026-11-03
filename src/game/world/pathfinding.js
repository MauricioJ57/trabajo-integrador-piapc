const DIRECTIONS = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
];

const keyOf = (tile) => `${tile.col},${tile.row}`;

const sameTile = (a, b) => a.col === b.col && a.row === b.row;

const manhattan = (a, b) => (
    Math.abs(a.col - b.col) + Math.abs(a.row - b.row)
);

const reconstructPath = (parent, start, goal) => {
    const path = [];
    let current = goal;

    while (true) {
        path.push({ col: current.col, row: current.row });

        if (sameTile(current, start)) {
            break;
        }

        current = parent.get(keyOf(current));

        if (!current) {
            return null;
        }
    }

    path.reverse();

    return path;
};

const searchBfs = (grid, start, goal) => {
    if (!grid.isWalkable(start.col, start.row) || !grid.isWalkable(goal.col, goal.row)) {
        return { path: null, visited: [] };
    }

    const queue = [start];
    const discovered = new Set([keyOf(start)]);
    const parent = new Map();
    const visited = [];

    for (let head = 0; head < queue.length; head++) {
        const current = queue[head];
        visited.push({ col: current.col, row: current.row });

        if (sameTile(current, goal)) {
            return {
                path: reconstructPath(parent, start, goal),
                visited
            };
        }

        for (const [deltaCol, deltaRow] of DIRECTIONS) {
            const neighbor = {
                col: current.col + deltaCol,
                row: current.row + deltaRow
            };
            const neighborKey = keyOf(neighbor);

            if (
                grid.isWalkable(neighbor.col, neighbor.row)
                && !discovered.has(neighborKey)
            ) {
                discovered.add(neighborKey);
                parent.set(neighborKey, current);
                queue.push(neighbor);
            }
        }
    }

    return { path: null, visited };
};

const searchAStar = (grid, start, goal) => {
    if (!grid.isWalkable(start.col, start.row) || !grid.isWalkable(goal.col, goal.row)) {
        return { path: null, visited: [] };
    }

    const open = [{
        col: start.col,
        row: start.row,
        g: 0,
        f: manhattan(start, goal)
    }];
    const gScores = new Map([[keyOf(start), 0]]);
    const parent = new Map();
    const closed = new Set();
    const visited = [];

    while (open.length > 0) {
        let bestIndex = 0;

        for (let index = 1; index < open.length; index++) {
            const candidate = open[index];
            const best = open[bestIndex];

            if (
                candidate.f < best.f
                || (candidate.f === best.f && manhattan(candidate, goal) < manhattan(best, goal))
            ) {
                bestIndex = index;
            }
        }

        const current = open.splice(bestIndex, 1)[0];
        const currentKey = keyOf(current);

        if (closed.has(currentKey)) {
            continue;
        }

        closed.add(currentKey);
        visited.push({ col: current.col, row: current.row });

        if (sameTile(current, goal)) {
            return {
                path: reconstructPath(parent, start, goal),
                visited
            };
        }

        const currentScore = gScores.get(currentKey);

        for (const [deltaCol, deltaRow] of DIRECTIONS) {
            const neighbor = {
                col: current.col + deltaCol,
                row: current.row + deltaRow
            };
            const neighborKey = keyOf(neighbor);

            if (
                !grid.isWalkable(neighbor.col, neighbor.row)
                || closed.has(neighborKey)
            ) {
                continue;
            }

            const tentativeScore = currentScore + 1;
            const knownScore = gScores.get(neighborKey);

            if (knownScore !== undefined && tentativeScore >= knownScore) {
                continue;
            }

            parent.set(neighborKey, current);
            gScores.set(neighborKey, tentativeScore);
            open.push({
                col: neighbor.col,
                row: neighbor.row,
                g: tentativeScore,
                f: tentativeScore + manhattan(neighbor, goal)
            });
        }
    }

    return { path: null, visited };
};

export const findPathWithDetails = (grid, start, goal, algorithm = 'bfs') => {
    if (algorithm === 'astar') {
        return searchAStar(grid, start, goal);
    }

    return searchBfs(grid, start, goal);
};

export const findPath = (grid, start, goal, algorithm = 'bfs') => (
    findPathWithDetails(grid, start, goal, algorithm).path
);
