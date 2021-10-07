import { addMouseEvent, removeMouseEvent, addTouchEvent, removeTouchEvent } from "../input/events.mouse.js";
import state from "../engine/game.state.js";

class Scene {
    constructor(scope, clickable = true) {

        this.canvas = scope.uiCanvas;
        this.context = scope.uiContext;

        this.isActive = false;
        this.isLoaded = false;

        this.width = state.viewWidth
        this.height = state.viewHeight
        this.keys = state.keys;

        this.alpha = 1;

        if (clickable) {
            addMouseEvent(this, this.canvas, 'clicks')
            addTouchEvent(this, this.canvas, 'touches')
        }
    }

    removeMouseEvent(name) {
        if (this.events) {
            removeMouseEvent(this, this.canvas, name);
        }
    }
    removeTouchEvent(name) {
        if (this.events) {
            removeTouchEvent(this, this.canvas, name);
        }
    }

    clear() {
        this.isActive = false;
        this.context.clearRect(0, 0, this.width, this.height);
    }


    render() {

    }

    update() {

    }
};

export default Scene;