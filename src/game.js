import { buildCanvas } from './utils/canvas.js';
import { GrassyMap } from './map/maps/GrassyMap.js';
import { Player } from './characters/Player.js';

import { gameUpdate } from './engine/game.update.js';
import { gameRender } from './engine/game.render.js';
import { gameLoop } from './engine/game.loop.js';
import state from './engine/game.state.js';
import { Intro } from './context/Intro.js';
import SceneLoader from './context/SceneLoader.js';
import Collar from './characters/Collar.js';

class Game {

    constructor() {

        this.state = {};

        Object.defineProperty(this, 'global', {
            get: function () { return state },
            set: function (key, value) { state[key] = value; }
        });

        this.buildContext();

        // Initialize the game
        // this.addEntity(new Intro(this), 'intro');
        this.addEntity(new GrassyMap(this), 'map');
        const randX = Math.floor(Math.random() * state.mapCols);
        const randY = Math.floor(Math.random() * state.mapRows);
        this.addEntity(new Collar(this, randX, randY), 'collar');
        this.addEntity(new Player(this), 'player');
        this.addEntity(new Intro(this), 'intro');

        this.scene = new SceneLoader(this);

    }

    init() {
        this.update = gameUpdate(this);
        this.render = gameRender(this);
        this.loop = gameLoop(this);
    }

    buildContext() {
        const canvases = ['bkg', 'world', 'player', 'ui'];
        canvases.forEach(val => {
            const { canvas, context, width, height, scale } = buildCanvas('game-stage', `${val}-canvas`);
            this[`${val}Canvas`] = canvas;
            this[`${val}Context`] = context;
            state.update('viewWidth', width);
            state.update('viewHeight', height);
            state.update('scale', scale);
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
window.game.init();

export default game