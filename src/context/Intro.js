import Scene from './Scene.js'
import TextButton from './Buttons.js';

class Intro extends Scene {

    render () {
        if (!this.isLoaded && this.isActive) {
            this.context.fillStyle = '#ccc';
            this.context.fillRect(0,0,this.width, this.height);
            this.context.textAlign='center';
            this.context.font = '18pt Arial';
            this.context.fillStyle = '#000'
            this.context.fillText("Hunt for Harley", this.width/2, this.height/2);
            this.context.font = '14pt Arial';
            this.context.fillText("An Adventure RPG", this.width/2, this.height/2+25);
            this.isLoaded = true;
            this.proceedButton = new TextButton(this.context, this.width/2, this.height/2+55, 200, 25, 'Click to Proceed');
            this.proceedButton.draw();
            console.log("Intro Scene loaded.")
        }
    }

    update () {
        if (this.proceedButton) {
            if (this.proceedButton.checkClicked(this.clickX, this.clickY)) {
            console.log("You clicked the button!");
            this.clickX = 0;
            this.clickY = 0;
            }
        }
    }

};

export {Intro};