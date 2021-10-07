import state from '../engine/game.state.js';

// Find if the desired x,y location (and width/height of object)
// collides with any known boundaries on the map.
function isBoundaryHit(xmin, xmax, ymin, ymax) {

    const xmin2 = (xmin > 0) ? Math.floor(xmin / state.mapTileSize) : 0;
    const ymin2 = (ymin > 0) ? Math.floor(ymin / state.mapTileSize) : 0;
    const xmax2 = (xmax < state.mapWidth) ? Math.ceil(xmax / state.mapTileSize) : state.nRows;
    const ymax2 = (ymax < state.mapHeight) ? Math.ceil(ymax / state.mapTileSize) : state.nCols;

    const subGrid = state.boundaries.slice(ymin2, ymax2).map((val) => val.slice(xmin2, xmax2))

    const tilesToReview = subGrid.flat().filter(val => val > 0)
    if (tilesToReview.length > 0) {
        return true;
    } else {
        return false;
    }

}

export default isBoundaryHit;