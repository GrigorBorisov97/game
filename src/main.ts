import { Terrain } from './Terrain';
import GameEngine from './GameEngine';
 

let terrain = new Terrain;
terrain.buildScreen();
terrain.addStone();


const game = new GameEngine('game', 500, 800, { preload: preload, create: create, update: update });

var gl = {
    terrain: {},
    stones: {},
    running: true,
}

var running = true;

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
    if (gl.running) {
        console.log('update game frames ...');
        // game logic is here ...
        
    }// else it is in pause
    
    // just update the frames and call update function 60 times in one secund
    window.requestAnimationFrame(update)
}
