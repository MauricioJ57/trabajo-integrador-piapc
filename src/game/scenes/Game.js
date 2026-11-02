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
import { Relic } from '../entities/relic.js';
import { Grid, TILE_WALL } from '../world/grid.js';
import { generateScenario } from '../world/scenario.js';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(COLORS.background);

        this.scenario = generateScenario();
        this.grid = new Grid(this.scenario.map);
        this.hasRelic = false;
        this.gameOver = false;

        this.boardGraphics = this.add.graphics().setDepth(0);

        this.drawPanel();
        this.createVictoryOverlay();

        this.player = new Player(this, this.grid, this.scenario.entrance);

        this.setupInput();
        this.startScenario(this.scenario);
    }

    startScenario (scenario)
    {
        this.scenario = scenario;
        this.grid.setMap(scenario.map);
        this.hasRelic = false;
        this.gameOver = false;

        this.player.resetTo(scenario.entrance);

        if (this.relic) {
            this.relic.destroy();
        }

        this.relic = new Relic(this, this.grid, scenario.relic);

        this.hideVictory();
        this.drawBoard();
        this.updateStatus();
    }

    restartScenario ()
    {
        this.hasRelic = false;
        this.gameOver = false;
        this.player.resetTo(this.scenario.entrance);
        this.relic.restore();
        this.hideVictory();
        this.updateStatus();
    }

    drawBoard ()
    {
        const graphics = this.boardGraphics;
        const map = this.grid.map;

        graphics.clear();

        graphics.fillStyle(COLORS.board, 1);
        graphics.fillRect(BOARD_X, BOARD_Y, BOARD_WIDTH, BOARD_HEIGHT);

        for (let row = 0; row < GRID_ROWS; row++)
        {
            for (let col = 0; col < GRID_COLS; col++)
            {
                if (map[row][col] === TILE_WALL)
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

        const entranceX = BOARD_X + this.scenario.entrance.col * TILE_SIZE;
        const entranceY = BOARD_Y + this.scenario.entrance.row * TILE_SIZE;

        graphics.fillStyle(COLORS.entrance, 0.18);
        graphics.fillRect(entranceX, entranceY, TILE_SIZE, TILE_SIZE);
        graphics.lineStyle(2, COLORS.entrance, 0.9);
        graphics.strokeRect(
            entranceX + 1,
            entranceY + 1,
            TILE_SIZE - 2,
            TILE_SIZE - 2
        );

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
                if (map[row][col] !== TILE_WALL)
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

        this.add.text(left, PANEL_Y + 56, 'ESCENARIO Y OBJETIVO', {
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

        this.add.text(left, PANEL_Y + 190, 'R\nReiniciar partida', {
            fontFamily: 'Arial',
            fontSize: '14px',
            color: COLORS.text
        }).setDepth(1);

        this.add.text(left, PANEL_Y + 250, 'N\nNuevo escenario', {
            fontFamily: 'Arial',
            fontSize: '14px',
            color: COLORS.text
        }).setDepth(1);

        this.statusText = this.add.text(left, PANEL_Y + 330, '', {
            fontFamily: 'Arial',
            fontSize: '14px',
            color: COLORS.victory
        }).setDepth(1);

        this.add.text(left, PANEL_Y + 460, 'La entrada está marcada\nen naranja.', {
            fontFamily: 'Arial',
            fontSize: '12px',
            color: COLORS.muted
        }).setDepth(1);

        this.add.text(left, PANEL_Y + 530, 'Panel de opciones\npendiente (spec 06).', {
            fontFamily: 'Arial',
            fontSize: '12px',
            color: COLORS.muted
        }).setDepth(1);
    }

    createVictoryOverlay ()
    {
        this.victoryOverlay = this.add.rectangle(
            BOARD_X + BOARD_WIDTH / 2,
            BOARD_Y + BOARD_HEIGHT / 2,
            BOARD_WIDTH,
            BOARD_HEIGHT,
            COLORS.overlay,
            0.78
        )
            .setDepth(20)
            .setVisible(false);

        this.victoryText = this.add.text(
            BOARD_X + BOARD_WIDTH / 2,
            BOARD_Y + BOARD_HEIGHT / 2,
            '¡VICTORIA!\n\nVolviste con la reliquia.\n\nR: reiniciar    N: nuevo escenario',
            {
                fontFamily: 'Arial Black, Arial',
                fontSize: '30px',
                color: COLORS.victory,
                align: 'center',
                stroke: '#000000',
                strokeThickness: 4
            }
        )
            .setOrigin(0.5)
            .setDepth(21)
            .setVisible(false);
    }

    setupInput ()
    {
        this.wasd = this.input.keyboard.addKeys('W,S,A,D');
        this.cursors = this.input.keyboard.createCursorKeys();

        this.input.keyboard.on('keydown-R', (event) => {
            if (event && event.repeat) return;

            this.restartScenario();
        });

        this.input.keyboard.on('keydown-N', (event) => {
            if (event && event.repeat) return;

            this.startScenario(generateScenario());
        });
    }

    update (_time, delta)
    {
        if (this.gameOver) {
            return;
        }

        this.player.update(delta, {
            up: this.wasd.W.isDown || this.cursors.up.isDown,
            down: this.wasd.S.isDown || this.cursors.down.isDown,
            left: this.wasd.A.isDown || this.cursors.left.isDown,
            right: this.wasd.D.isDown || this.cursors.right.isDown
        });

        this.checkRelicPickup();
        this.checkVictory();
    }

    checkRelicPickup ()
    {
        if (this.hasRelic) {
            return;
        }

        const tile = this.player.getTile();

        if (
            tile.col === this.relic.tile.col
            && tile.row === this.relic.tile.row
        ) {
            this.hasRelic = true;
            this.relic.collect();
            this.updateStatus();
        }
    }

    checkVictory ()
    {
        if (!this.hasRelic) {
            return;
        }

        const tile = this.player.getTile();

        if (
            tile.col === this.scenario.entrance.col
            && tile.row === this.scenario.entrance.row
        ) {
            this.showVictory();
        }
    }

    showVictory ()
    {
        this.gameOver = true;
        this.victoryOverlay.setVisible(true);
        this.victoryText.setVisible(true);
        this.updateStatus();
    }

    hideVictory ()
    {
        this.victoryOverlay.setVisible(false);
        this.victoryText.setVisible(false);
    }

    updateStatus ()
    {
        const relicState = this.gameOver
            ? 'entregada'
            : this.hasRelic
                ? 'en mano'
                : 'pendiente';

        this.statusText.setText(
            `Reliquia: ${relicState}\n\nN: nuevo escenario\nR: reiniciar`
        );
    }
}
