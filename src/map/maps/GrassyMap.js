import { Map } from '../Map.js';
import { TileSheet } from '../TileSheet.js';

const tileSheet = new TileSheet('./src/graphics/test.png', 16);
let grid = [...Array(100)].map(i => [...Array(65)].map(j => Math.floor(Math.random() * 7)));
let bounds = [...Array(100)].map(i => [...Array(65)].map(j => Math.round(Math.random() * 0.509)));

for (let i = 0; i < bounds.length; i++) {
    for (let j = 0; j < bounds[0].length; j++) {
        if (bounds[i][j] === 1) {
            grid[i][j] = Math.floor(Math.random() * 2) + 7;
        }
    }
}

class GrassyMap extends Map {
    constructor(scope) {
        super(scope, grid, bounds, tileSheet);
    }
}

export { GrassyMap }