class State {
    constructor() {
        this.globalX = 0; // global position of characters on screen
        this.globalY = 0;

        this.mapWidth = 0; // Map size information
        this.mapHeight = 0;
        this.mapBounds = [];

        this.viewWidth = 0;
        this.viewHeight = 0;

        this.tileSize = 16;

        this.playerWidth = 0;
        this.playerHeight = 0;

    }

    update(target, val) {
        this[target] = val;
    }

}

const state = new State();

export default state;