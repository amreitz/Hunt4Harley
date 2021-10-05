import { addMouseEvent, removeMouseEvent } from "../utils/events.mouse.js";

class Scene {
    constructor(scope, clickable=true) {

        this.canvas = scope.uiCanvas;
        this.context = scope.uiContext;

        this.isActive = true;
        this.isLoaded = false;
        
        this.width = scope.constants.width;
        this.height = scope.constants.height;
        this.keys = scope.constants.keys;

        if (clickable) {
            addMouseEvent(this, this.canvas, 'clicks')
        }
    }

    removeEvents(name) {
        if (this.events) {
            removeMouseEvent(this, this.canvas, name);
        }
    }

    render() {

    }

    update() {

    }
};

export default Scene;