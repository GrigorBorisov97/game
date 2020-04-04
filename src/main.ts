import { Terrain } from './Terrain';
import GameEngine from './GameEngine';
 

let terrain = new Terrain;
terrain.buildScreen();
terrain.addStone();


const game = new GameEngine('game', 500, 800, { preload: preload, create: create, update: update });

var gl = {
    terrain: {},
    stones: {},
}

// preload some image, audio ...
function preload() {
    console.log('preload')
}

// create objects like player, terrain ...
function create() {
    console.log('create');

    // gl.terrain = new Terrain();
}

// all game logic is here
function update() {
    console.log('update game frames ...')




    window.requestAnimationFrame(update)
}
