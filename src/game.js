import { buildCanvas } from './utils/canvas.js';
import { keys } from './utils/events.keys.js';
import { Intro } from './context/Intro.js';
import { GrassyMap } from './map/maps/GrassyMap.js';
import { Player } from './player/Player.js';

import { gameUpdate } from './engine/game.update.js';
import { gameRender } from './engine/game.render.js';
import { gameLoop } from './engine/game.loop.js';
import state from './engine/game.state.js';

class Game {

    constructor() {

        this.state = {};

        this.events = {
            keys: keys,
        };

        this.buildContext();

        // Initialize the game
        // this.addEntity(new Intro(this), 'intro');
        this.addEntity(new GrassyMap(this), 'map');
        this.addEntity(new Player(this), 'player');


    }

    init() {
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