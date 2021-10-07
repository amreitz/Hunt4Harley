import Scene from './Scene.js'
import state from '../engine/game.state.js';

class GameOver extends Scene {

    constructor(scope) {
        super(scope, false);
        this.alpha = 0;
        this.timestamp = Math.floor(Date.now() / 100);
        this.interval = setInterval(this.updateAlpha.bind(this), 50);
    }

    render() {
        if (this.isActive) {
            this.context.clearRect(0, 0, this.width, this.height);
            this.context.textAlign = 'center';
            this.context.font = '44pt Arial';
            this.context.fillStyle = `rgba(0,0,0,${this.alpha})`
            this.context.fillText("You found Harley's Collar!", this.width / 2, this.height / 3);
        }
    }

    update() {
        if (this.Alpha >= 1) {
            clearInterval(this.interval);
        }
    }

    updateAlpha() {
        this.alpha += (this.alpha < 1) ? .03 : 0;
    }

};

export default GameOver;