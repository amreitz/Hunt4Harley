import state from '../engine/game.state.js';
import GameOver from './GameOver.js';
import { Intro } from './Intro.js';

class SceneLoader {
    constructor(scope) {

        this.scenes = {
            Intro: new Intro(scope),
            GameOver: new GameOver(scope),
        }

        this.load = function (label) {
            state.playerActive = false;
            scope.addEntity(this.scenes[label], label);
            this.scenes[label].isActive = true;
        }

        this.unload = function (label, playerActive = true) {
            state.playerActive = playerActive;
            scope.removeEntity(label);
            this.scenes[label].clear();
        }
    }


}

export default SceneLoader