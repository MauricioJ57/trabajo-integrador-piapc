import { COLORS } from '../config.js';

export class Relic {
    constructor (scene, grid, tile) {
        this.scene = scene;
        this.grid = grid;
        this.tile = { col: tile.col, row: tile.row };

        const position = grid.tileToWorldCenter(tile.col, tile.row);

        this.sprite = scene.add.rectangle(
            position.x,
            position.y,
            16,
            16,
            COLORS.relic
        )
            .setStrokeStyle(2, COLORS.relicEdge)
            .setAngle(45)
            .setDepth(8);
    }

    collect () {
        this.sprite.setVisible(false);
    }

    restore () {
        this.sprite.setVisible(true);
    }

    destroy () {
        this.sprite.destroy();
    }
}
