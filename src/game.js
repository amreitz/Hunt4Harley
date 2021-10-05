import { buildCanvas } from './utils/canvas.js';
import { keys } from './utils/events.keys.js';
import { Intro } from './context/Intro.js';
import { GrassyMap } from './map/maps/GrassyMap.js';
import { Player } from './player/Player.js';

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

        this.view = {
            globalX: this.constants.width / 2,
            globalY: this.constants.height / 2,
        }

        // Initialize the game
        // this.addEntity(new Intro(this), 'intro');
        this.addEntity(new GrassyMap(this), 'map');
        this.addEntity(new Player(this), 'player')


        this.update = gameUpdate(this);
        this.render = gameRender(this);
        this.loop = gameLoop(this);

    }

    buildContext() {
        const canvases = ['bkg', 'player', 'ui'];
        canvases.forEach(val => {
            const { canvas, context, width, height, scale } = buildCanvas('game-stage', `${val}-canvas`);
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