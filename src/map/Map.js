import state from '../engine/game.state.js';
import game from '../game.js';

class Map {
    constructor(scope, grid, boundaries, tileSheet) {
        this.grid = grid;
        this.boundaries = boundaries;
        this.tileSheet = tileSheet;

        this.tileSize = 32;

        this.nRows = this.grid.length;
        this.nCols = this.grid[0].length;

        this.width = this.nCols * this.tileSize;
        this.height = this.nRows * this.tileSize;

        this.isLoaded = false;
        this.context = scope.bkgContext;

        this.previous = { ...this.getVisibleGrid() };
        this.current = { ...this.getVisibleGrid() };

        state.update('mapWidth', this.width);
        state.update('mapHeight', this.height);
        state.update('mapCols', this.nCols);
        state.update('mapRows', this.nRows);
        state.update('boundaries', this.boundaries);
        state.update('mapTileSize', this.tileSize);

        state.update('globalX', this.width / 2);
        state.update('globalY', this.height / 2);

    }

    getVisibleGrid() {
        let startCol, endCol, startRow, endRow
        let xoffset = 0;
        let yoffset = 0;

        const xmin = state.globalX - state.viewWidth / 2;
        const xmax = state.globalX + state.viewWidth / 2;
        const ymin = state.globalY - state.viewHeight / 2;
        const ymax = state.globalY + state.viewHeight / 2;

        const width = this.width;
        const height = this.height;


        if (xmin > 0 && xmax < width) {
            startCol = Math.floor(xmin / this.tileSize);
            endCol = Math.ceil(xmax / this.tileSize) + 1;
            xoffset = startCol * this.tileSize - xmin;

        } else if (xmin <= 0) {
            startCol = 0;
            endCol = Math.ceil(state.viewWidth / this.tileSize);

        } else if (xmax >= width && xmin < width) {
            startCol = Math.floor(this.nCols - state.viewWidth / this.tileSize)
            endCol = this.nCols;

        }

        // Middle case - figure out which rows/columns to grab
        if (ymin >= 0 && ymax <= height) {

            startRow = Math.floor(ymin / this.tileSize);
            endRow = Math.ceil(ymax / this.tileSize) + 1;
            yoffset = startRow * this.tileSize - ymin;

            // Top case - if y is too high to see
        } else if (ymin <= 0) {

            startRow = 0;
            endRow = Math.ceil(state.viewHeight / this.tileSize);

            // Bottom case - ymax outside of bounds, but ymin still in it
        } else if (ymax > height && ymin < height) {

            startRow = Math.floor(this.nRows - state.viewHeight / this.tileSize);
            endRow = this.nRows;

        }
        return {
            grid: this.grid.map((val) => val.slice(startCol, endCol)).slice(startRow, endRow),
            xOffset: xoffset,
            yOffset: yoffset,
        };
    }

    isCurrent() {
        if (JSON.stringify(this.current) !== JSON.stringify(this.previous)) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        if (this.tileSheet.isLoaded) {
            if (!this.isLoaded || !this.isCurrent()) {
                this.context.clearRect(0, 0, state.viewWidth, state.viewHeight);

                const { grid, xOffset, yOffset } = this.getVisibleGrid();
                for (let i = 0; i < grid.length; i++) {
                    for (let j = 0; j < grid[0].length; j++) {
                        const { img, x, y, size } = this.tileSheet.fetchTile(grid[i][j]);
                        this.context.drawImage(img, x, y, size, size, j * this.tileSize + xOffset, i * this.tileSize + yOffset, this.tileSize, this.tileSize);
                    };
                };
                this.isLoaded = true;
                this.previous = this.current;
            }
        }
    };

    update() {
        this.current = { ...this.getVisibleGrid() }
    };
};

export { Map }
