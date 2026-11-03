const angleDifference = (first, second) => (
    Math.atan2(Math.sin(first - second), Math.cos(first - second))
);

const isWallAt = (grid, x, y) => {
    const tile = grid.worldToTile(x, y);

    return !grid.isWalkable(tile.col, tile.row);
};

export const hasLineOfSight = (grid, from, to) => {
    if (!grid.isWalkable(from.col, from.row) || !grid.isWalkable(to.col, to.row)) {
        return false;
    }

    let col = from.col;
    let row = from.row;

    const deltaCol = to.col - col;
    const deltaRow = to.row - row;
    const totalCols = Math.abs(deltaCol);
    const totalRows = Math.abs(deltaRow);
    const stepCol = Math.sign(deltaCol);
    const stepRow = Math.sign(deltaRow);

    let indexCol = 0;
    let indexRow = 0;

    while (indexCol < totalCols || indexRow < totalRows) {
        const decision = (1 + 2 * indexCol) * totalRows
            - (1 + 2 * indexRow) * totalCols;

        if (decision === 0) {
            if (
                !grid.isWalkable(col + stepCol, row)
                || !grid.isWalkable(col, row + stepRow)
            ) {
                return false;
            }

            col += stepCol;
            row += stepRow;
            indexCol++;
            indexRow++;
        } else if (decision < 0) {
            col += stepCol;
            indexCol++;
        } else {
            row += stepRow;
            indexRow++;
        }

        if (!grid.isWalkable(col, row)) {
            return false;
        }
    }

    return true;
};

export const isInVisionCone = (
    origin,
    facing,
    target,
    radius,
    halfAngle
) => {
    const deltaX = target.x - origin.x;
    const deltaY = target.y - origin.y;
    const distance = Math.hypot(deltaX, deltaY);

    if (distance > radius) {
        return false;
    }

    if (distance === 0) {
        return true;
    }

    const angle = Math.atan2(deltaY, deltaX);

    return Math.abs(angleDifference(angle, facing)) <= halfAngle;
};

export const buildVisionCone = (
    grid,
    origin,
    facing,
    radius,
    halfAngle,
    rayCount = 32
) => {
    const points = [{
        x: origin.x,
        y: origin.y
    }];
    const startAngle = facing - halfAngle;
    const endAngle = facing + halfAngle;

    for (let index = 0; index <= rayCount; index++) {
        const angle = startAngle
            + (endAngle - startAngle) * (index / rayCount);
        const directionX = Math.cos(angle);
        const directionY = Math.sin(angle);
        let distance = 0;

        while (distance < radius) {
            const nextDistance = Math.min(radius, distance + 2);
            const x = origin.x + directionX * nextDistance;
            const y = origin.y + directionY * nextDistance;

            if (isWallAt(grid, x, y)) {
                break;
            }

            distance = nextDistance;
        }

        points.push({
            x: origin.x + directionX * distance,
            y: origin.y + directionY * distance
        });
    }

    return points;
};
