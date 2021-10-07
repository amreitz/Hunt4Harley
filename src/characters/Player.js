import state from '../engine/game.state.js';
import isBoundaryHit from '../engine/collisions.js';
import SpriteLoader from './SpriteLoader.js';

class Player {

    constructor(scope) {
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

        this.moveSpeed = 8;

        this.width = 64;
        this.height = 64;
        state.update('playerWidth', this.width);
        state.update('playerHeight', this.height);

        this.context = scope.playerContext;
        this.keys = state.keys;

        this.globalX = state.globalX;
        this.globalY = state.globalY;

        // make sure we don't spawn on a boundary
        while (isBoundaryHit(this.globalX - this.width / 4,
            this.globalX + this.width / 4,
            this.globalY + this.height / 4,
            this.globalY + this.height / 2)) {
            console.log("Whoops! Spawned on a boundary...")
            this.globalX += this.moveSpeed * 1;
            this.globalY += this.moveSpeed * 1;
            state.update('globalX', this.globalX);
            state.update('globalY', this.globalY);
        }


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

            if (state[pos] < globalSize + playerSize / 2) {
                let newVal = state[pos] + this.moveSpeed * step;

                let xmin, xmax, ymin, ymax;
                if (dir === 'left' || dir === 'right') {
                    xmin = newVal - this.width / 4;
                    xmax = newVal + this.width / 4;
                    ymin = state.globalY + this.width / 4;
                    ymax = state.globalY + this.height / 2;
                } else {
                    ymin = newVal + this.width / 4;
                    ymax = newVal + this.height / 2;
                    xmin = state.globalX - this.width / 4;
                    xmax = state.globalX + this.width / 4;
                }
                if (!isBoundaryHit(xmin, xmax, ymin, ymax)) {
                    state.update(pos, newVal);
                    this[pos] = state[pos];
                };
            }
            // make sure we aren't exceeding the viewport or global map
            if (state[pos] > globalSize - playerSize / 2) {
                state.update(pos, globalSize - playerSize / 2);
                this[pos] = globalSize - playerSize / 2;
            }
            if (state[pos] < playerSize / 2) {
                state.update(pos, playerSize / 2)
                this[pos] = playerSize / 2;
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

        if (Y >= (mapHeight - viewHeight / 2)) {
            finalY = Math.round((viewHeight - (mapHeight - Y)));
            state.update('cameraY1', mapHeight - viewHeight);
            state.update('cameraY2', mapHeight);
        } else if (Y <= viewHeight / 2) {
            finalY = Math.round(Y);
            state.update('cameraY1', 0);
            state.update('cameraY2', viewHeight);
        } else {
            finalY = Math.round(viewHeight / 2);
            state.update('cameraY1', (Y - viewHeight / 2));
            state.update('cameraY2', (Y + viewHeight / 2));
        }

        if (X >= (mapWidth - viewWidth / 2)) {
            finalX = Math.round((viewWidth - (mapWidth - X)));
            state.update('cameraX1', mapWidth - viewWidth);
            state.update('cameraX2', mapWidth);
        } else if (X <= viewWidth / 2) {
            finalX = Math.round(X);
            state.update('cameraX1', 0);
            state.update('cameraX2', viewWidth);
        } else {
            finalX = Math.round(viewWidth / 2);
            state.update('cameraX1', (X - viewWidth / 2));
            state.update('cameraX2', (X + viewWidth / 2));
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
                x - this.width / 2, y - this.height / 2, this.width, this.height
            );
        }
    }

    update() {
        if (state.playerActive) {
            this.moveSpeed = 10;
        } else {
            this.moveSpeed = 0;
        }
        this.animation.state = 'idle';
        if (this.keys.isPressed.left || this.keys.isPressed.right || this.keys.isPressed.up || this.keys.isPressed.down) {
            this.movePlayer('left', -1)
            this.movePlayer('right', 1);
            this.movePlayer('up', -1);
            this.movePlayer('down', 1);
        }
    };

    render() {
        if (state.playerActive || this.isVisible) {
            const coords = this.getLocalPosition();
            this.context.clearRect(0, 0, state.viewWidth, state.viewHeight)
            this.animate(coords.x, coords.y);
        }
    }
};


export { Player }
