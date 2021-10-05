import {Map} from './map/Map.js';
import {TileSheet} from './map/TileSheet.js'

import {buildCanvas} from './utils/canvas.js';
import {keys} from './utils/events.keys.js';

import { gameUpdate } from './engine/game.update.js';
import { gameRender } from './engine/game.render.js';
import { gameLoop } from './engine/game.loop.js';

class Game {

    constructor() {

        this.state = {};
        this.constants = {
            width: null,
            height: null,
            scale: null,
            tileSize: 16,
        };
        this.events = {
            keys: keys,
        }

        this.buildContext();

        // Initialize the game
        const grid = [...Array(5)].map(i => [...Array(5)].map(j => 1));
        const bounds = [...Array(5)].map(i => [...Array(5)].map(j => 0));
        const tileSheet = new TileSheet('./src/graphics/test.png', 16);
        const newMap = new Map(this, grid, bounds, tileSheet);
        this.addEntity(newMap, 'map');

        // this.update = gameUpdate(this);
        // this.render = gameRender(this);
        // this.loop = gameLoop(this);

    }

    buildContext() {
        const canvases = ['bkg','player','ui'];
        canvases.forEach(val => {
            const {canvas, context, width, height, scale} = buildCanvas('game-stage',`${val}-canvas`);
            this[`${val}Canvas`] = canvas;
            this[`${val}Context`] = context;
            this.constants.width = width;
            this.constants.height = height;
            this.constants.scale = scale;
        });

    }

    addEntity(entity, label) {
        this.state.entities = this.state.entities || {};
        this.state.entities[label] = entity;
    }

    removeEntity(label) {
        this.state.entities = this.state.entities || {};
        delete this.state.entities[label]
    }
}

window.game = new Game();

export default game