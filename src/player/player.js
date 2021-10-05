function updatePosition(dir, player, coord, globalSize, step) {
    const playerSize = (dir === 'left' || 'right') ? player.width : player.height;
    if (player.keys.isPressed[dir]) {
        if (player.globalPosition[coord] <= globalSize - playerSize) {
            player.globalPosition[coord] += player.state.moveSpeed * step;
        }
    }
    // make sure we aren't exceeding the viewport or global map
    if (player.globalPosition[coord] > globalSize - playerSize) {
        player.globalPosition[coord] = globalSize - playerSize;
    }
    if (player.globalPosition[coord] < 0) {
        player.globalPosition[coord] = 0;
    }
}

class Player {

    constructor(scope) {
        this.isActive = true;

        this.state = {
            moveSpeed: 20,
        };

        this.width = 32;
        this.height = 32;

        this.globalPosition = {};
        this.viewPosition = {};

        this.context = scope.playerContext;
        this.keys = scope.events.keys;
        // Set up links to the current state map size
        Object.defineProperty(this, 'mapSize', {
            get: function () {
                return { width: scope.state.entities.map.width, height: scope.state.entities.map.height };
            },
            configurable: true,
            enumerable: true,
        });
        // set up the context definitions
        Object.defineProperty(this, 'contextSize', {
            get: function () {
                return { width: scope.constants.width, height: scope.constants.height };
            },
            configurable: true,
            enumerable: true,
        });

        // Set up the global positioning ... as the character the moves, the world updates.
        Object.defineProperty(this.globalPosition, 'x', {
            get: function () {
                return scope.view.globalX;
            },
            set: function (val) {
                scope.view.globalX = val;
            },
            configurable: true,
            enumerable: true,
        });
        Object.defineProperty(this.globalPosition, 'y', {
            get: function () {
                return scope.view.globalY;
            },
            set: function (val) {
                scope.view.globalY = val;
            },
            configurable: true,
            enumerable: true,
        });

        // Set up the local positioning
        const width = this.width;
        Object.defineProperty(this.viewPosition, 'x', {
            get: function () {
                const charSize = width;
                const globalPos = scope.view.globalX + charSize / 2;
                const map = scope.state.entities.map.width;
                const view = scope.constants.width;

                if (globalPos > (map - view / 2)) {
                    return Math.round((view - (map - globalPos + charSize / 2)));
                } else if (globalPos < view / 2) {
                    return Math.round(globalPos - charSize / 2);
                } else {
                    return Math.round(view / 2 - charSize / 2);
                }

            },
            configurable: true,
            enumerable: true,
        });
        const height = this.height;
        Object.defineProperty(this.viewPosition, 'y', {
            get: function () {
                const charSize = height;
                const globalPos = scope.view.globalY + charSize / 2;
                const map = scope.state.entities.map.height;
                const view = scope.constants.height;

                if (globalPos > (map - view / 2)) {
                    return Math.round((view - (map - globalPos + charSize / 2)));
                } else if (globalPos < view / 2) {
                    return Math.round(globalPos - charSize / 2);
                } else {
                    return Math.round(view / 2 - charSize / 2);
                }
            },
            configurable: true,
            enumerable: true,
        });
    };

    update() {
        const mapWidth = this.mapSize.width;
        const mapHeight = this.mapSize.height;
        updatePosition('left', this, 'x', mapWidth, -1);
        updatePosition('right', this, 'x', mapWidth, 1);
        updatePosition('up', this, 'y', mapHeight, -1);
        updatePosition('down', this, 'y', mapHeight, 1);

    };

    render() {
        this.context.clearRect(0, 0, this.contextSize.width, this.contextSize.height)
        this.context.fill = '#fff'
        this.context.fillRect(this.viewPosition.x, this.viewPosition.y, this.width, this.height);
    };
}

export { Player }