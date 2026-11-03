import {
    CAPTURE_DISTANCE,
    COLORS,
    GUARD_CHASE_SPEED,
    GUARD_SIZE,
    GUARD_SPEED,
    GUARD_WAIT_MS,
    SEARCH_DURATION_MS,
    SEARCH_SWEEP_HALF_ANGLE,
    VISION_HALF_ANGLE,
    VISION_RADIUS
} from '../config.js';
import { findPath } from '../world/pathfinding.js';
import { smoothPath } from '../world/navigation.js';
import {
    buildVisionCone,
    hasLineOfSight,
    isInVisionCone
} from '../world/vision.js';

const STATES = {
    PATROL: 'PATROL',
    CHASE: 'CHASE',
    SEARCH: 'SEARCH',
    RETURN: 'RETURN'
};

const copyTile = (tile) => ({ col: tile.col, row: tile.row });

const sameTile = (first, second) => (
    first.col === second.col && first.row === second.row
);

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
        this.state = STATES.PATROL;
        this.lastKnownTile = null;
        this.searchElapsed = 0;
        this.searchStartAngle = 0;
        this.returnPatrolIndex = 0;
        this.route = [];
        this.routeIndex = 0;
        this.routeTarget = null;
        this.waiting = false;
        this.waitTimer = 0;
        this.position = this.grid.tileToWorldCenter(
            this.patrolPoints[0].col,
            this.patrolPoints[0].row
        );

        const initialTarget = this.patrolPoints[this.patrolIndex];

        this.facing = initialTarget ? this.getFacingTo(initialTarget) : 0;

        this.sprite = scene.add.rectangle(
            this.position.x,
            this.position.y,
            GUARD_SIZE,
            GUARD_SIZE,
            COLORS.guard
        )
            .setStrokeStyle(2, COLORS.guardEdge)
            .setDepth(9);

        this.visionGraphics = scene.add.graphics().setDepth(1);

        this.stateLabel = scene.add.text(
            this.position.x,
            this.position.y - GUARD_SIZE / 2 - 10,
            this.state,
            {
                fontFamily: 'Arial Black, Arial',
                fontSize: '11px',
                color: COLORS.text,
                stroke: '#000000',
                strokeThickness: 2
            }
        )
            .setOrigin(0.5)
            .setDepth(11);

        this.updatePresentation();
        this.startPatrolRoute();
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

    getCurrentTile ()
    {
        return this.grid.worldToTile(this.position.x, this.position.y);
    }

    getFacingTo (tile)
    {
        const target = this.grid.tileToWorldCenter(tile.col, tile.row);
        const deltaX = target.x - this.position.x;
        const deltaY = target.y - this.position.y;

        if (deltaX === 0 && deltaY === 0) {
            return 0;
        }

        return Math.atan2(deltaY, deltaX);
    }

    clearRoute ()
    {
        this.route = [];
        this.routeIndex = 0;
        this.routeTarget = null;
    }

    calculateRouteTo (targetTile)
    {
        if (!targetTile) {
            this.clearRoute();
            return false;
        }

        const currentTile = this.getCurrentTile();
        const path = findPath(
            this.grid,
            currentTile,
            targetTile,
            this.searchAlgorithm
        );

        if (!path) {
            this.clearRoute();
            return false;
        }

        const points = this.navigationMode === 'smooth'
            ? smoothPath(this.grid, path, this.halfSize)
            : path;

        this.route = points.map((tile) => (
            this.grid.tileToWorldCenter(tile.col, tile.row)
        ));
        this.routeIndex = this.route.length > 1 ? 1 : 0;
        this.routeTarget = copyTile(targetTile);

        return true;
    }

    startPatrolRoute ()
    {
        const target = this.patrolPoints[this.patrolIndex];

        if (!this.calculateRouteTo(target)) {
            this.beginWait();
        }
    }

    beginWait ()
    {
        this.clearRoute();
        this.waiting = true;
        this.waitTimer = GUARD_WAIT_MS;
    }

    advancePatrol ()
    {
        if (this.patrolPoints.length === 0) {
            return;
        }

        this.patrolIndex = (this.patrolIndex + 1) % this.patrolPoints.length;
    }

    findNearestPatrolIndex ()
    {
        const currentTile = this.getCurrentTile();
        let bestIndex = 0;
        let bestLength = Infinity;

        for (let index = 0; index < this.patrolPoints.length; index++) {
            const path = findPath(
                this.grid,
                currentTile,
                this.patrolPoints[index],
                this.searchAlgorithm
            );

            if (path && path.length < bestLength) {
                bestLength = path.length;
                bestIndex = index;
            }
        }

        return bestIndex;
    }

    enterChase (playerTile)
    {
        this.state = STATES.CHASE;
        this.waiting = false;
        this.waitTimer = 0;
        this.lastKnownTile = copyTile(playerTile);
        this.clearRoute();
        this.calculateRouteTo(playerTile);
    }

    enterSearch ()
    {
        this.state = STATES.SEARCH;
        this.waiting = false;
        this.waitTimer = 0;
        this.clearRoute();
        this.searchElapsed = 0;
        this.searchStartAngle = this.facing;
    }

    enterReturn ()
    {
        this.state = STATES.RETURN;
        this.waiting = false;
        this.waitTimer = 0;
        this.clearRoute();
        this.returnPatrolIndex = this.findNearestPatrolIndex();

        if (!this.calculateRouteTo(this.patrolPoints[this.returnPatrolIndex])) {
            this.enterPatrol();
        }
    }

    enterPatrol ()
    {
        this.state = STATES.PATROL;
        this.beginWait();
    }

    canSeePlayer (player)
    {
        const guardTile = this.getCurrentTile();
        const playerTile = player.getTile();

        if (!hasLineOfSight(this.grid, guardTile, playerTile)) {
            return false;
        }

        return isInVisionCone(
            this.position,
            this.facing,
            player.position,
            VISION_RADIUS,
            VISION_HALF_ANGLE
        );
    }

    update (delta, player)
    {
        const safeDelta = Math.min(delta, 50);

        if (this.state === STATES.PATROL) {
            this.updatePatrol(safeDelta, player);
        } else if (this.state === STATES.CHASE) {
            this.updateChase(safeDelta, player);
        } else if (this.state === STATES.SEARCH) {
            this.updateSearch(safeDelta, player);
        } else if (this.state === STATES.RETURN) {
            this.updateReturn(safeDelta, player);
        }

        this.updatePresentation();
    }

    updatePatrol (delta, player)
    {
        if (this.canSeePlayer(player)) {
            this.enterChase(player.getTile());
            return;
        }

        if (this.waiting) {
            this.waitTimer -= delta;

            if (this.waitTimer <= 0) {
                this.waiting = false;
                this.waitTimer = 0;
                this.advancePatrol();
                this.startPatrolRoute();
            }

            return;
        }

        if (this.route.length === 0) {
            this.startPatrolRoute();
            return;
        }

        if (this.moveAlongRoute(delta, GUARD_SPEED)) {
            this.beginWait();
        }
    }

    updateChase (delta, player)
    {
        const playerTile = player.getTile();
        const seesPlayer = this.canSeePlayer(player);

        if (seesPlayer) {
            this.lastKnownTile = copyTile(playerTile);

            const currentTile = this.getCurrentTile();

            if (sameTile(currentTile, playerTile)) {
                this.moveTowardPoint(player.position, delta, GUARD_CHASE_SPEED);
                return;
            }

            if (
                !this.routeTarget
                || !sameTile(this.routeTarget, playerTile)
                || this.route.length === 0
            ) {
                this.calculateRouteTo(playerTile);
            }

            this.moveAlongRoute(delta, GUARD_CHASE_SPEED);
            return;
        }

        if (!this.lastKnownTile) {
            this.enterSearch();
            return;
        }

        if (
            !this.routeTarget
            || !sameTile(this.routeTarget, this.lastKnownTile)
            || this.route.length === 0
        ) {
            if (sameTile(this.getCurrentTile(), this.lastKnownTile)) {
                this.enterSearch();
                return;
            }

            if (!this.calculateRouteTo(this.lastKnownTile)) {
                this.enterSearch();
                return;
            }
        }

        if (this.moveAlongRoute(delta, GUARD_CHASE_SPEED)) {
            this.enterSearch();
        }
    }

    updateSearch (delta, player)
    {
        this.searchElapsed += delta;

        const progress = Math.min(
            this.searchElapsed / SEARCH_DURATION_MS,
            1
        );

        this.facing = this.searchStartAngle
            + Math.sin(progress * Math.PI * 2) * SEARCH_SWEEP_HALF_ANGLE;

        if (this.canSeePlayer(player)) {
            this.enterChase(player.getTile());
            return;
        }

        if (progress >= 1) {
            this.enterReturn();
        }
    }

    updateReturn (delta, player)
    {
        if (this.canSeePlayer(player)) {
            this.enterChase(player.getTile());
            return;
        }

        if (this.route.length === 0) {
            const target = this.patrolPoints[this.returnPatrolIndex];

            if (!this.calculateRouteTo(target)) {
                this.enterPatrol();
                return;
            }
        }

        if (this.moveAlongRoute(delta, GUARD_SPEED)) {
            this.patrolIndex = this.returnPatrolIndex;
            this.state = STATES.PATROL;
            this.beginWait();
        }
    }

    moveAlongRoute (delta, speed)
    {
        if (this.route.length === 0) {
            return true;
        }

        let remaining = speed * Math.min(delta, 50) / 1000;

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

            this.facing = Math.atan2(deltaY, deltaX);

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
                this.clearRoute();
                return false;
            }

            this.position.x = nextX;
            this.position.y = nextY;
            remaining = 0;
        }

        if (this.route.length > 0 && this.routeIndex >= this.route.length) {
            this.clearRoute();
            return true;
        }

        return false;
    }

    moveTowardPoint (target, delta, speed)
    {
        const deltaX = target.x - this.position.x;
        const deltaY = target.y - this.position.y;
        const distance = Math.hypot(deltaX, deltaY);

        if (distance === 0) {
            return;
        }

        this.facing = Math.atan2(deltaY, deltaX);

        const step = speed * Math.min(delta, 50) / 1000;
        const travel = Math.min(step, distance);
        const ratio = travel / distance;
        const nextX = this.position.x + deltaX * ratio;
        const nextY = this.position.y + deltaY * ratio;

        if (!this.grid.rectOverlapsWall(nextX, nextY, this.halfSize)) {
            this.position.x = nextX;
            this.position.y = nextY;
        }
    }

    touches (player)
    {
        const deltaX = player.position.x - this.position.x;
        const deltaY = player.position.y - this.position.y;

        return (
            deltaX * deltaX + deltaY * deltaY
            <= CAPTURE_DISTANCE * CAPTURE_DISTANCE
        );
    }

    getStateColor ()
    {
        if (this.state === STATES.CHASE) {
            return COLORS.visionChase;
        }

        if (this.state === STATES.PATROL) {
            return COLORS.visionPatrol;
        }

        return COLORS.visionSearch;
    }

    drawVision ()
    {
        const graphics = this.visionGraphics;
        const color = this.getStateColor();
        const points = buildVisionCone(
            this.grid,
            this.position,
            this.facing,
            VISION_RADIUS,
            VISION_HALF_ANGLE
        );

        graphics.clear();
        graphics.fillStyle(color, 0.14);
        graphics.fillPoints(points, true);
        graphics.lineStyle(1, color, 0.65);
        graphics.strokePoints(points, true);
    }

    updatePresentation ()
    {
        this.sprite.setPosition(this.position.x, this.position.y);
        this.stateLabel.setText(this.state);
        this.stateLabel.setPosition(
            this.position.x,
            this.position.y - GUARD_SIZE / 2 - 10
        );
        this.drawVision();
    }

    reset ()
    {
        this.state = STATES.PATROL;
        this.lastKnownTile = null;
        this.searchElapsed = 0;
        this.searchStartAngle = 0;
        this.returnPatrolIndex = 0;
        this.patrolIndex = this.patrolPoints.length > 1 ? 1 : 0;
        this.waiting = false;
        this.waitTimer = 0;
        this.clearRoute();
        this.position = this.grid.tileToWorldCenter(
            this.patrolPoints[0].col,
            this.patrolPoints[0].row
        );

        const initialTarget = this.patrolPoints[this.patrolIndex];

        this.facing = initialTarget ? this.getFacingTo(initialTarget) : 0;
        this.sprite.setPosition(this.position.x, this.position.y);
        this.startPatrolRoute();
        this.updatePresentation();
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
        this.stateLabel.destroy();
        this.visionGraphics.destroy();
    }
}
