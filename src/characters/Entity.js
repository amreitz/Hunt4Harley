import state from '../engine/game.state.js';
import game from '../game.js';

class Entity {

    constructor(scope, x, y) {

        this.dim = {
            row: x,
            col: y,
            x: x * state.mapTileSize,
            y: y * state.mapTileSize,
            width: state.mapTileSize,
            height: state.mapTileSize,
        };

        this.action = {
            canMove: false,
            moveX: 20, // in units of tiles
            moveY: 20,
            isMoving: true,
            moveSpeed: 3,
        };

        this.animation = {
            state: 'idle',
        }

        this.isActive = false;

        this.context = scope.worldContext;


    }

    draw() {
        const { cameraX1, cameraY1 } = state;
        const localX = this.dim.x - cameraX1;
        const localY = this.dim.y - cameraY1;
        this.context.fillRect(localX, localY, 32, 32);
    }

    checkInView() {
        const { cameraX1, cameraX2, cameraY1, cameraY2 } = state;
        if (this.dim.x >= cameraX1 && this.dim.x <= cameraX2 && this.dim.y >= cameraY1 && this.dim.y <= cameraY2) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        this.context.clearRect(0, 0, state.viewWidth, state.viewHeight);
        if (this.checkInView()) {
            this.draw();
        }
    }

    update() {
        const x1 = state.globalX - state.playerWidth / 4;
        const x2 = state.globalX + state.playerWidth / 4;
        const y1 = state.globalY + state.playerHeight / 4;
        const y2 = state.globalY + state.playerHeight / 2;

        const thisX1 = this.dim.x;
        const thisX2 = this.dim.x + this.dim.width;
        const thisY1 = this.dim.y;
        const thisY2 = this.dim.y + this.dim.height;

        if ((x1 >= thisX1 && x1 <= thisX2) || (x2 >= thisX1 && x2 <= thisX2)) {
            if ((y1 >= thisY1 && y1 <= thisY2) || (y2 >= thisY1 && y2 <= thisY2)) {
                state.gameOver = true;
                state.loadScene = 'GameOver';
            }
        }
    }
}

export default Entity;