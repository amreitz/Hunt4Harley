class TileSheet {
    constructor(src, tileSize) {
        this.img = new Image();
        this.img.src = src;
        this.isLoaded = false;
        this.tileSize = tileSize;

        this.img.onload = () => {
            console.log("Tile sheet image loaded successfully.");
            this.isLoaded = true;

            this.nCols = this.img.width / tileSize;
            this.nRows = this.img.height / tileSize;

            // Make a 2d array of all the indices
            const arr = [...Array(this.nCols * this.nRows).keys()];
            const temp = [];
            while (arr.length) temp.push(arr.splice(0, this.nCols));

            // Set all the x,y values to grab that index
            this.indexes = temp.map((val, i) => val.map(function (idx, j) {
                return { x: j * tileSize, y: i * tileSize, idx: idx };
            })).flat();

        };

    }

    fetchTile(i) {
        return { img: this.img, x: this.indexes[i].x, y: this.indexes[i].y, size: this.tileSize }
    }

}

export { TileSheet }