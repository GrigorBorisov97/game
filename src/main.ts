import { Terrain } from './Terrain';
import GameEngine from './GameEngine';
// import * as Const from './Const';
import { Input } from './Input';
 

let terrain = new Terrain;
terrain.buildScreen();
terrain.addStone();


// set global object
var gl = {
    terrain: {},
    stones: {},
    time: new Date().getTime(),
    running: true,
    input: new Input(),
}
console.log(gl)

const game = new GameEngine('game', 500, 800, { preload: preload, create: create, update: update });


// preload some image, audio ...
function preload() {

    // game.load.image('img_name', 'path/to/image.jpg');
    // game.load.audio('audio_name', 'path/to/audio.mp3');
}

// create objects like player, terrain ...
function create() {
    
    // gl.terrain = new Terrain();
}

// all game logic is here
function update() {
    if (gl.running) {
        // game logic is here ...

         
        
    }// else it is in pause
    
    gl.input.reset();
    gl.time = new Date().getTime();
    // just update the frames and call update function 60 times in one secund
    window.requestAnimationFrame(update)
}
