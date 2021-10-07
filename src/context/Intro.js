import Scene from './Scene.js'
import state from '../engine/game.state.js';

class Intro extends Scene {

    render() {
        if (!this.isLoaded && this.isActive) {
            this.context.clearRect(0, 0, this.width, this.height);
            this.context.textAlign = 'center';
            this.context.font = '44pt Arial';
            this.context.fillStyle = `rgba(0,0,0,${this.alpha})`
            this.context.fillText("Hunt for Harley", this.width / 2, this.height / 3);
            this.context.font = '20pt Arial';
            this.context.fillText("Use W-A-S-D or arrow keys to control the kitty.", this.width / 2, this.height - 225);
            this.context.fillText("Find his friend, Harley!", this.width / 2, this.height - 200);
            this.context.fillText("Press SPACE to start", this.width / 2, this.height - 175);
            this.isLoaded = true;
        }
    }

    update() {
        if (state.keys.isPressed.space) {
            this.clear();
            state.unloadScene = 'Intro';
        }
    }


};

export { Intro };