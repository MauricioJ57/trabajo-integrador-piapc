import {
    COLORS,
    GUARD_SIZE,
    GUARD_SPEED,
    GUARD_WAIT_MS
} from '../config.js';
import { findPath } from '../world/pathfinding.js';
import { smoothPath } from '../world/navigation.js';

const copyTile = (tile) => ({ col: tile.col, row: tile.row });

export class Guard {
    constructor (
        scene,
        grid,
        patrolPoints,
        searchAlgorithm = 'bfs',
        navigationMode = 'grid'
    )
    {
        this.scene = scene;
        this.grid = grid;
        this.patrolPoints = patrolPoints.map(copyTile);
        this.searchAlgorithm = searchAlgorithm;
        this.navigationMode = navigationMode;
        this.halfSize = GUARD_SIZE / 2;
        this.patrolIndex = this.patrolPoints.length > 1 ? 1 : 0;
        this.route = [];
        this.routeIndex = 0;
        this.waiting = false;
        this.waitTimer = 0;
        this.advanceOnWait = true;
        this.position = this.grid.tileToWorldCenter(
            this.patrolPoints[0].col,
            this.patrolPoints[0].row
        );

        this.sprite = scene.add.rectangle(
            this.position.x,
            this.position.y,
            GUARD_SIZE,
            GUARD_SIZE,
            COLORS.guard
        )
            .setStrokeStyle(2, COLORS.guardEdge)
            .setDepth(9);

        this.calculateRoute();
    }

    setAlgorithm (algorithm)
    {
        if (this.searchAlgorithm === algorithm) {
            return;
        }

        this.searchAlgorithm = algorithm;
    }

    setNavigation (navigationMode)
    {
        if (this.navigationMode === navigationMode) {
            return;
        }

        this.navigationMode = navigationMode;
    }

    calculateRoute ()
    {
        const currentTile = this.grid.worldToTile(
            this.position.x,
            this.position.y
        );
        const target = this.patrolPoints[this.patrolIndex];
        const path = findPath(
            this.grid,
            currentTile,
            target,
            this.searchAlgorithm
        );

        if (!path) {
            this.beginWait();
            return;
        }

        const points = this.navigationMode === 'smooth'
            ? smoothPath(this.grid, path, this.halfSize)
            : path;

        this.route = points.map((tile) => (
            this.grid.tileToWorldCenter(tile.col, tile.row)
        ));
        this.routeIndex = this.route.length > 1 ? 1 : 0;
        this.waiting = false;
        this.waitTimer = 0;

        if (this.route.length <= 1) {
            this.beginWait();
        }
    }

    beginWait (advanceOnWait = true)
    {
        this.route = [];
        this.routeIndex = 0;
        this.waiting = true;
        this.waitTimer = GUARD_WAIT_MS;
        this.advanceOnWait = advanceOnWait;
    }

    advancePatrol ()
    {
        if (this.patrolPoints.length === 0) {
            return;
        }

        this.patrolIndex = (this.patrolIndex + 1) % this.patrolPoints.length;
    }

    update (delta)
    {
        const safeDelta = Math.min(delta, 50);

        if (this.waiting) {
            this.waitTimer -= safeDelta;

            if (this.waitTimer <= 0) {
                this.waiting = false;
                this.waitTimer = 0;

                if (this.advanceOnWait) {
                    this.advancePatrol();
                }

                this.advanceOnWait = true;
                this.calculateRoute();
            }

            return;
        }

        if (this.route.length === 0) {
            this.calculateRoute();
            return;
        }

        let remaining = GUARD_SPEED * safeDelta / 1000;

        while (remaining > 0 && this.routeIndex < this.route.length) {
            const target = this.route[this.routeIndex];
            const deltaX = target.x - this.position.x;
            const deltaY = target.y - this.position.y;
            const distance = Math.hypot(deltaX, deltaY);

            if (distance === 0) {
                this.position.x = target.x;
                this.position.y = target.y;
                this.routeIndex++;
                continue;
            }

            if (distance <= remaining) {
                this.position.x = target.x;
                this.position.y = target.y;
                this.routeIndex++;
                remaining -= distance;
                continue;
            }

            const ratio = remaining / distance;
            const nextX = this.position.x + deltaX * ratio;
            const nextY = this.position.y + deltaY * ratio;

            if (this.grid.rectOverlapsWall(nextX, nextY, this.halfSize)) {
                this.beginWait(false);
                break;
            }

            this.position.x = nextX;
            this.position.y = nextY;
            remaining = 0;
        }

        this.sprite.setPosition(this.position.x, this.position.y);

        if (
            !this.waiting
            && this.route.length > 0
            && this.routeIndex >= this.route.length
        ) {
            this.beginWait();
        }
    }

    reset ()
    {
        this.position = this.grid.tileToWorldCenter(
            this.patrolPoints[0].col,
            this.patrolPoints[0].row
        );
        this.patrolIndex = this.patrolPoints.length > 1 ? 1 : 0;
        this.route = [];
        this.routeIndex = 0;
        this.waiting = false;
        this.waitTimer = 0;
        this.advanceOnWait = true;
        this.sprite.setPosition(this.position.x, this.position.y);
        this.calculateRoute();
    }

    getRemainingRoute ()
    {
        if (
            this.waiting
            || this.route.length === 0
            || this.routeIndex >= this.route.length
        ) {
            return [];
        }

        const points = [{
            x: this.position.x,
            y: this.position.y
        }];

        for (let index = this.routeIndex; index < this.route.length; index++) {
            points.push({
                x: this.route[index].x,
                y: this.route[index].y
            });
        }

        return points;
    }

    destroy ()
    {
        this.sprite.destroy();
    }
}
