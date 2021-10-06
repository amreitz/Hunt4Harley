import { Map } from '../Map.js';
import { TileSheet } from '../TileSheet.js';

const tileSheet = new TileSheet('./src/graphics/test.png', 16);
const grid = [...Array(100)].map(i => [...Array(65)].map(j => Math.floor(Math.random() * 7)));
let bounds = [...Array(100)].map(i => [...Array(65)].map(j => 0));

bounds[0] = [...Array(65)].map(j => 1);
bounds[1] = [...Array(65)].map(j => 1);
bounds[2] = [...Array(65)].map(j => 1);

class GrassyMap extends Map {
    constructor(scope) {
        super(scope, grid, bounds, tileSheet);
    }
}

export { GrassyMap }