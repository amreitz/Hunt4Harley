import state from '../engine/game.state.js';
import isBoundaryHit from '../utils/interactions.js';

class Player {

    constructor(scope) {
        this.isActive = true;

        this.state = {
            moveSpeed: 8,
        };

        this.width = 64;
        this.height = 64;

        this.context = scope.playerContext;
        this.keys = scope.events.keys;

        this.globalX = state.globalX;
        this.globalY = state.globalY;

    };

    movePlayer(dir, step) {

        if (this.keys.isPressed[dir]) {
            let pos, mapDimension, playerSize
            if (dir === 'left' || dir === 'right') {
                pos = 'globalX';
                mapDimension = 'Width';
                playerSize = this.width;
            } else {
                pos = 'globalY';
                mapDimension = 'Height';
                playerSize = this.height;
            }

            const globalSize = state[`map${mapDimension}`]

            if (state[pos] <= globalSize - playerSize) {
                let newVal = state[pos] + this.state.moveSpeed * step;
                state.update(pos, newVal);
                this[pos] = newVal;
                if (isBoundaryHit(state.globalX, state.globalY, this.width, this.height)) {
                    state.update(pos, state[pos] - this.state.moveSpeed * step);
                    this[pos] = state[pos] - this.state.moveSpeed * step;
                };
            }
            // make sure we aren't exceeding the viewport or global map
            if (state[pos] > globalSize - playerSize) {
                state.update(pos, globalSize - playerSize);
                this[pos] = globalSize - playerSize
            }
            if (state[pos] < 0) {
                state.update(pos, 0)
                this[pos] = 0;
            }
        }
    }

    getLocalPosition() {
        const mapWidth = state.mapWidth;
        const mapHeight = state.mapHeight;
        const viewWidth = state.viewWidth;
        const viewHeight = state.viewHeight;

        const Y = state.globalY;
        const X = state.globalX;

        let finalX, finalY;

        if (Y > (mapHeight - viewHeight / 2 - this.height / 2)) {
            finalY = Math.round((viewHeight - (mapHeight - Y)));
        } else if (Y < viewHeight / 2 - this.height / 2) {
            finalY = Math.round(Y);
        } else {
            finalY = Math.round(viewHeight / 2 - this.height / 2);
        }

        if (X > (mapWidth - viewWidth / 2 - this.width / 2)) {
            finalX = Math.round((viewWidth - (mapWidth - X)));
        } else if (X < viewWidth / 2 - this.width / 2) {
            finalX = Math.round(X);
        } else {
            finalX = Math.round(viewWidth / 2 - this.width / 2);
        }

        return {
            x: finalX,
            y: finalY,
        }
    }

    update() {
        this.movePlayer('left', -1)
        this.movePlayer('right', 1);
        this.movePlayer('up', -1);
        this.movePlayer('down', 1);
    };

    render() {
        if (this.isActive) {
            const coords = this.getLocalPosition();
            this.context.clearRect(0, 0, state.viewWidth, state.viewHeight)
            this.context.fill = '#fff'
            this.context.fillRect(coords.x, coords.y, this.width, this.height);
        }
    }
};


export { Player }
