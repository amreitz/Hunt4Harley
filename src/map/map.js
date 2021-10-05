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

        this.viewWidth = scope.constants.width;
        this.viewHeight = scope.constants.height;

        this.isLoaded = false;
        this.needsUpdate = false;

        this.context = scope.bkgContext;

        // Set the visible x/y values to link to the global view
        Object.defineProperty(this, 'view', {
            get: function () {
                return {
                    xmin: scope.view.globalX - scope.constants.width / 2,
                    xmax: scope.view.globalX + scope.constants.width / 2,
                    ymin: scope.view.globalY - scope.constants.height / 2,
                    ymax: scope.view.globalY + scope.constants.height / 2,
                }
            },
            configurable: true,
            enumerable: true,
        });

        this.previous = { ...this.view };
        this.current = { ...this.view };

    }

    getVisibleGrid() {
        let startCol, endCol, startRow, endRow

        if (this.view.xmin >= 0 && this.view.xmax <= this.width) {
            startCol = Math.floor(this.view.xmin / this.tileSize);
            endCol = Math.ceil(this.view.xmax / this.tileSize);
        } else if (this.view.xmin < 0) {
            startCol = 0;
            endCol = Math.ceil(this.viewWidth / this.tileSize);
        } else if (this.view.xmax > this.width && this.view.xmin <= this.width) {
            startCol = Math.floor(this.nCols - this.viewWidth / this.tileSize)
            endCol = this.nCols;
        } else {
            startCol = this.nCols;
            endCol = this.nCols;
        }

        if (this.view.ymin >= 0 && this.view.ymax <= this.height) {
            startRow = Math.floor(this.view.ymin / this.tileSize);
            endRow = Math.ceil(this.view.ymax / this.tileSize);
        } else if (this.view.ymin < 0) {
            startRow = 0;
            endRow = Math.ceil(this.viewHeight / this.tileSize);
        } else if (this.view.ymax > this.height && this.view.ymin <= this.height) {
            startRow = Math.floor(this.nRows - this.viewHeight / this.tileSize);
            endRow = this.nRows;
        } else {
            startRow = this.nCols;
            endRow = this.nRows;
        }

        return {
            grid: this.grid.map((val) => val.slice(startCol, endCol)).slice(startRow, endRow),
            startRow: startRow,
            endRow: endRow,
            startCol: startCol,
            endCol: endCol,
        };
    }

    isCurrent() {
        if (JSON.stringify(this.current) !== JSON.stringify(this.previous)) {
            this.needsUpdate = true;
        }
    }

    render() {
        this.isCurrent();
        if ((!this.isLoaded && this.tileSheet.isLoaded) || this.needsUpdate) {
            const { grid } = this.getVisibleGrid();
            this.context.clearRect(0, 0, this.viewWidth, this.viewHeight);
            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[0].length; j++) {
                    const { img, x, y, size } = this.tileSheet.fetchTile(grid[i][j]);
                    this.context.drawImage(img, x, y, size, size, j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);
                };
            };
            this.isLoaded = true;
        }
        this.previous = this.current;
    };

    update() {
        this.current = { ...this.view }
    };
};

export { Map }