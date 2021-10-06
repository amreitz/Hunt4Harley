import state from '../engine/game.state.js';

// Find if the desired x,y location (and width/height of object)
// collides with any known boundaries on the map.
function isBoundaryHit(val, coord, w, h) {
    const x = (coord === 'globalX') ? val : state[coord];
    const y = (coord === 'globalY') ? val : state[coord];

    let row1 = Math.floor(x / state.mapTileSize);
    let col1 = Math.floor(y / state.mapTileSize);

    row1 = (row1 < 0) ? 0 : row1;
    col1 = (col1 < 0) ? 0 : col1;

    let row2 = Math.ceil((x + w) / state.mapTileSize);
    let col2 = Math.ceil((x + h) / state.mapTileSize);

    row2 = (row2 < 0) ? 0 : row2;
    col2 = (col2 < 0) ? 0 : col2;

    const boundBox = state.boundaries.slice(row1, row2).slice(col1, col2)

    if (boundBox.length > 0) {
        return true;
    } else {
        return false;
    }

}

export default isBoundaryHit;