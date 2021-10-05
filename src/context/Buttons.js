class TextButton {
    //* Note that x, y are the CENTER. *//
    constructor(context, x, y, w, h, label) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.label = label;

        this.draw = () => {

            context.strokeColor = 'black';
            context.lineWidth = 1;
            context.rect(this.x-Math.round(this.w/2), this.y-Math.round(this.h/2), w, h);
            context.stroke();
            context.textAlign = 'center';
            context.fillText(label, this.x, this.y+5);
        }
    }

    checkClicked(x,y) {
        if ((x >= this.x-this.w/2) && (x <= (this.x+this.w/2)) && (y >= (this.y-this.h/2)) && (y <= this.y+this.h/2)) {
            return true;
        } else {
            return false;
        }
    }
}

export default TextButton