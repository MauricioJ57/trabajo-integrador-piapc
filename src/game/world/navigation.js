const copyTile = (tile) => ({ col: tile.col, row: tile.row });

export const hasClearSegment = (grid, start, end, halfSize) => {
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    const distance = Math.hypot(deltaX, deltaY);

    if (distance === 0) {
        return !grid.rectOverlapsWall(start.x, start.y, halfSize);
    }

    const steps = Math.max(1, Math.ceil(distance / 2));

    for (let index = 0; index <= steps; index++) {
        const ratio = index / steps;
        const x = start.x + deltaX * ratio;
        const y = start.y + deltaY * ratio;

        if (grid.rectOverlapsWall(x, y, halfSize)) {
            return false;
        }
    }

    return true;
};

export const smoothPath = (grid, path, halfSize) => {
    if (!path || path.length === 0) {
        return [];
    }

    if (path.length === 1) {
        return [copyTile(path[0])];
    }

    const centers = path.map((tile) => (
        grid.tileToWorldCenter(tile.col, tile.row)
    ));
    const waypoints = [copyTile(path[0])];
    let currentIndex = 0;

    while (currentIndex < path.length - 1) {
        let nextIndex = currentIndex + 1;

        for (let candidate = path.length - 1; candidate > currentIndex; candidate--) {
            if (hasClearSegment(grid, centers[currentIndex], centers[candidate], halfSize)) {
                nextIndex = candidate;
                break;
            }
        }

        waypoints.push(copyTile(path[nextIndex]));
        currentIndex = nextIndex;
    }

    return waypoints;
};
