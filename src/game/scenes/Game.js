import { Scene } from 'phaser';
import {
    BOARD_HEIGHT,
    BOARD_WIDTH,
    BOARD_X,
    BOARD_Y,
    COLORS,
    GRID_COLS,
    GRID_ROWS,
    PANEL_HEIGHT,
    PANEL_WIDTH,
    PANEL_X,
    PANEL_Y,
    TILE_SIZE
} from '../config.js';
import { Player } from '../entities/player.js';
import { STATIC_MAP, TILE_WALL } from '../world/grid.js';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(COLORS.background);

        this.drawBoard();
        this.drawPanel();

        this.player = new Player(this, { col: 2, row: 2 });

        this.setupInput();
    }

    drawBoard ()
    {
        const graphics = this.add.graphics().setDepth(0);

        graphics.fillStyle(COLORS.board, 1);
        graphics.fillRect(BOARD_X, BOARD_Y, BOARD_WIDTH, BOARD_HEIGHT);

        for (let row = 0; row < GRID_ROWS; row++)
        {
            for (let col = 0; col < GRID_COLS; col++)
            {
                if (STATIC_MAP[row][col] === TILE_WALL)
                {
                    continue;
                }

                const color = (row + col) % 2 === 0
                    ? COLORS.floorA
                    : COLORS.floorB;

                graphics.fillStyle(color, 1);
                graphics.fillRect(
                    BOARD_X + col * TILE_SIZE,
                    BOARD_Y + row * TILE_SIZE,
                    TILE_SIZE,
                    TILE_SIZE
                );
            }
        }

        graphics.lineStyle(1, COLORS.gridLine, 0.6);

        for (let col = 1; col < GRID_COLS; col++)
        {
            const x = BOARD_X + col * TILE_SIZE;

            graphics.lineBetween(x, BOARD_Y, x, BOARD_Y + BOARD_HEIGHT);
        }

        for (let row = 1; row < GRID_ROWS; row++)
        {
            const y = BOARD_Y + row * TILE_SIZE;

            graphics.lineBetween(BOARD_X, y, BOARD_X + BOARD_WIDTH, y);
        }

        for (let row = 0; row < GRID_ROWS; row++)
        {
            for (let col = 0; col < GRID_COLS; col++)
            {
                if (STATIC_MAP[row][col] !== TILE_WALL)
                {
                    continue;
                }

                const x = BOARD_X + col * TILE_SIZE;
                const y = BOARD_Y + row * TILE_SIZE;

                graphics.fillStyle(COLORS.wall, 1);
                graphics.fillRect(x, y, TILE_SIZE, TILE_SIZE);
                graphics.lineStyle(1, COLORS.wallEdge, 1);
                graphics.strokeRect(x + 1, y + 1, TILE_SIZE - 2, TILE_SIZE - 2);
            }
        }

        graphics.lineStyle(2, COLORS.wallEdge, 1);
        graphics.strokeRect(BOARD_X, BOARD_Y, BOARD_WIDTH, BOARD_HEIGHT);
    }

    drawPanel ()
    {
        const graphics = this.add.graphics().setDepth(0);

        graphics.fillStyle(COLORS.panel, 1);
        graphics.fillRect(PANEL_X, PANEL_Y, PANEL_WIDTH, PANEL_HEIGHT);
        graphics.lineStyle(1, COLORS.panelEdge, 1);
        graphics.strokeRect(PANEL_X, PANEL_Y, PANEL_WIDTH, PANEL_HEIGHT);

        const left = PANEL_X + 16;

        this.add.text(left, PANEL_Y + 16, 'TURNO DE NOCHE', {
            fontFamily: 'Arial Black, Arial',
            fontSize: '18px',
            color: COLORS.text
        }).setDepth(1);

        this.add.text(left, PANEL_Y + 56, 'BASE JUGABLE', {
            fontFamily: 'Arial',
            fontSize: '12px',
            color: COLORS.accent
        }).setDepth(1);

        this.add.text(left, PANEL_Y + 100, 'CONTROLES', {
            fontFamily: 'Arial Black, Arial',
            fontSize: '13px',
            color: COLORS.muted
        }).setDepth(1);

        this.add.text(left, PANEL_Y + 128, 'WASD / Flechas\nMover', {
            fontFamily: 'Arial',
            fontSize: '14px',
            color: COLORS.text
        }).setDepth(1);

        this.add.text(left, PANEL_Y + 190, 'R\nReiniciar posición', {
            fontFamily: 'Arial',
            fontSize: '14px',
            color: COLORS.text
        }).setDepth(1);

        this.add.text(left, PANEL_Y + 260, 'Grilla 24 x 16\nTablero 768 x 512 px', {
            fontFamily: 'Arial',
            fontSize: '12px',
            color: COLORS.muted
        }).setDepth(1);

        this.add.text(left, PANEL_Y + 330, 'Panel de opciones\npendiente (spec 06).', {
            fontFamily: 'Arial',
            fontSize: '12px',
            color: COLORS.muted
        }).setDepth(1);
    }

    setupInput ()
    {
        this.wasd = this.input.keyboard.addKeys('W,S,A,D');
        this.cursors = this.input.keyboard.createCursorKeys();

        this.input.keyboard.on('keydown-R', () => {
            this.player.reset();
        });
    }

    update (_time, delta)
    {
        this.player.update(delta, {
            up: this.wasd.W.isDown || this.cursors.up.isDown,
            down: this.wasd.S.isDown || this.cursors.down.isDown,
            left: this.wasd.A.isDown || this.cursors.left.isDown,
            right: this.wasd.D.isDown || this.cursors.right.isDown
        });
    }
}
