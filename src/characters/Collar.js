import SheetLoader from "./SheetLoader.js";
import Entity from "./Entity.js";
import state from "../engine/game.state.js"

class Collar extends Entity {

    constructor(scope, x, y) {
        super(scope, x, y);

        this.dim.width = 32;
        this.dim.height = 32;

        this.sprite = new SheetLoader('./src/graphics/collar-sheet.png', 32, { 'idle': 0 }, 1)
        this.animation = {
            frame: 0,
            clock: Math.floor(Date.now() / 100),
        }
    }

    draw() {
        const { cameraX1, cameraY1 } = state;
        const localX = this.dim.x - cameraX1;
        const localY = this.dim.y - cameraY1;

        const { clock, frame } = this.animation;
        if (this.sprite.isLoaded) {
            if ((Math.floor(Date.now() / 100) - clock) > (1 / this.sprite.fps)) {
                this.animation.clock = Math.floor(Date.now() / 100);
                this.animation.frame = (frame < (this.sprite.nFrames - 1)) ? this.animation.frame + 1 : 0;
            }
            const tile = this.sprite.fetchTile('idle', this.animation.frame)
            this.context.drawImage(tile.img, tile.x, tile.y, this.sprite.tileWidth, this.sprite.tileHeight,
                localX, localY, this.dim.width, this.dim.height);
        }
    }

    isTouched() {
        if (this.isActive) {
            state.gameOver = true;
            state.loadScene = 'GameOver';
            this.isActive = false;
        }
    }
}

export default Collar;