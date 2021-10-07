import GameOver from "../context/GameOver.js";
import SceneLoader from "../context/SceneLoader.js";

function gameUpdate(scope) {
    return function update() {
        const state = scope.state || {};

        if (scope.global.loadScene) {
            scope.scene.load(scope.global.loadScene);
            scope.global.loadScene = null;
        }
        if (scope.global.unloadScene) {
            scope.scene.unload(scope.global.unloadScene)
            scope.global.unloadScene = null;
        }

        if (state.hasOwnProperty('entities')) {
            var entities = state.entities;

            for (var entity in entities) {
                entities[entity].update();
            }
        }

        return state;
    }
}

export { gameUpdate }