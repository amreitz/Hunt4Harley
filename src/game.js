import {buildCanvas} from './utils/canvas.js';
import {keys} from './utils/events.keys.js';
import {Intro} from './context/Intro.js';

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
        this.addEntity(new Intro(this), 'intro');

        this.update = gameUpdate(this);
        this.render = gameRender(this);
        this.loop = gameLoop(this);

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

// let scale = window.devicePixelRatio;
// // scale = 2
// gameCanvas.width = Math.floor(640 * scale);
// gameCanvas.height = Math.floor(480 * scale);

// gameContext.scale(scale,scale);
// gameContext.imageSmoothingEnabled = false;

// gameContext.textAlign = 'center';
// gameContext.font = '18pt Arial';
// gameContext.fillText('Hello World', 640/2, 480/2)