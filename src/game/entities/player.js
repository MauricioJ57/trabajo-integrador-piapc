import {
    COLORS,
    PLAYER_SIZE,
    PLAYER_SPEED
} from '../config.js';

export class Player {
    constructor (scene, grid, startTile) {
        this.scene = scene;
        this.grid = grid;
        this.startTile = { col: startTile.col, row: startTile.row };
        this.halfSize = PLAYER_SIZE / 2;
        this.position = grid.tileToWorldCenter(startTile.col, startTile.row);

        this.sprite = scene.add.rectangle(
            this.position.x,
            this.position.y,
            PLAYER_SIZE,
            PLAYER_SIZE,
            COLORS.player
        )
            .setStrokeStyle(2, COLORS.playerEdge)
            .setDepth(10);
    }

    update (delta, input) {
        let dx = 0;
        let dy = 0;

        if (input.left) dx -= 1;
        if (input.right) dx += 1;
        if (input.up) dy -= 1;
        if (input.down) dy += 1;

        if (dx !== 0 || dy !== 0) {
            const length = Math.hypot(dx, dy);
            const step = PLAYER_SPEED * Math.min(delta, 50) / 1000;

            this.move((dx / length) * step, (dy / length) * step);
        }

        this.sprite.setPosition(this.position.x, this.position.y);
    }

    move (dx, dy) {
        const nextX = this.position.x + dx;

        if (!this.grid.rectOverlapsWall(nextX, this.position.y, this.halfSize)) {
            this.position.x = nextX;
        }

        const nextY = this.position.y + dy;

        if (!this.grid.rectOverlapsWall(this.position.x, nextY, this.halfSize)) {
            this.position.y = nextY;
        }
    }

    reset () {
        this.position = this.grid.tileToWorldCenter(
            this.startTile.col,
            this.startTile.row
        );
        this.sprite.setPosition(this.position.x, this.position.y);
    }

    resetTo (tile) {
        this.startTile = { col: tile.col, row: tile.row };
        this.reset();
    }

    getTile () {
        return this.grid.worldToTile(this.position.x, this.position.y);
    }
}
