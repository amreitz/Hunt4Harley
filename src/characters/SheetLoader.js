class SheetLoader {
    constructor(src, tileWidth, states, fps = 5, tileHeight = null, rowOriented = true) {
        this.img = new Image();
        this.img.src = src;
        this.fps = fps;
        this.isLoaded = false;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight || tileWidth;

        this.img.onload = () => {
            console.log("Object sheet loaded successfully.");
            this.nCols = this.img.width / this.tileWidth;
            this.nRows = this.img.height / this.tileHeight;
            this.nFrames = rowOriented ? this.nCols : this.nRows;

            // 2D array of all indices
            const arr = [...Array(this.nCols * this.nRows).keys()];
            const temp = [];
            while (arr.length) temp.push(arr.splice(0, this.nCols));

            // Set indices to array
            const tileWidth = this.tileWidth;
            const tileHeight = this.tileHeight;
            this.indexes = temp.map((val, i) => val.map(function (idx, j) {
                return { x: j * tileWidth, y: i * tileHeight, idx: idx };
            }));

            this.states = {};
            Object.entries(states).forEach((entry) => {
                const [key, value] = entry;
                if (rowOriented) {
                    this.states[key] = this.indexes[value];
                } else {
                    this.states[key] = this.indexes.map((i) => i[value]);
                }
            });
            this.isLoaded = true;
        }
    }

    fetchTile(state, frame) {
        if (this.isLoaded) {
            return { img: this.img, x: this.states[state][frame].x, y: this.states[state][frame].y, size: this.tileSize }
        }
    }
}

export default SheetLoader