import state from '../engine/game.state.js';
import isBoundaryHit from '../utils/interactions.js';
import SpriteLoader from './SpriteLoader.js';

class Player {

    constructor(scope) {
        this.isActive = true;
        this.isVisible = true;

        this.animation = {
            state: 'idle',
            dir: 'down',
            clock: Math.floor(Date.now() / 100),
            frame: 0,
        }

        this.sprites = {
            idle: new SpriteLoader('./src/graphics/kitty.png', 32, 0.5),
            walking: new SpriteLoader('./src/graphics/kitty2.png', 32, 5),
        };

        this.moveSpeed = 4;

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
            this.animation.dir = dir;
            this.animation.state = 'walking';

            if (state[pos] <= globalSize - playerSize) {
                let newVal = state[pos] + this.moveSpeed * step;
                if (!isBoundaryHit(newVal, pos, this.width, this.height)) {
                    state.update(pos, newVal);
                    this[pos] = state[pos];
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

        const width = this.width;
        const height = this.height;

        const Y = state.globalY;
        const X = state.globalX;

        let finalX, finalY;

        if (Y > (mapHeight - viewHeight / 2 - height / 2)) {
            finalY = Math.round((viewHeight - (mapHeight - Y)));
        } else if (Y < viewHeight / 2 - height / 2) {
            finalY = Math.round(Y);
        } else {
            finalY = Math.round(viewHeight / 2 - height / 2);
        }

        if (X > (mapWidth - viewWidth / 2 - width / 2)) {
            finalX = Math.round((viewWidth - (mapWidth - X)));
        } else if (X < viewWidth / 2 - width / 2) {
            finalX = Math.round(X);
        } else {
            finalX = Math.round(viewWidth / 2 - width / 2);
        }

        return {
            x: finalX,
            y: finalY,
        }
    }

    animate(x, y) {
        const { clock, frame, dir, state } = this.animation;
        const sprite = this.sprites[state]
        if (this.sprites[state].isLoaded) {
            if ((Math.floor(Date.now() / 100) - clock) > (1 / sprite.fps)) {
                this.animation.clock = Math.floor(Date.now() / 100);
                this.animation.frame = (frame < (sprite.nFrames - 1)) ? this.animation.frame + 1 : 0;
            }
            const tile = sprite.fetchTile(dir, frame);
            this.context.drawImage(
                tile.img,
                tile.x, tile.y, sprite.tileWidth, sprite.tileHeight,
                x, y, this.width, this.height
            );
        }
    }

    update() {
        if (this.isActive) {
            if (this.keys.isPressed.left || this.keys.isPressed.right || this.keys.isPressed.up || this.keys.isPressed.down) {
                this.movePlayer('left', -1)
                this.movePlayer('right', 1);
                this.movePlayer('up', -1);
                this.movePlayer('down', 1);
            } else {
                this.animation.state = 'idle';
            }

        }
    };

    render() {
        if (this.isActive) {
            const coords = this.getLocalPosition();
            this.context.clearRect(0, 0, state.viewWidth, state.viewHeight)
            this.animate(coords.x, coords.y);
        }
    }
};


export { Player }
