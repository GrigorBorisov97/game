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

var game = new GameEngine('game', 500, 800, { preload: preload, create: create, update: update });
game.run();
 
// preload some image, audio ...
function preload() {
    
    game.loadImage('player', '../assets/images/player.png');
    game.loadImage('sound', '../assets/images/patterns/1.jpg');
     
}

// create objects like player, terrain ...
function create() {
    
    // gl.terrain = new Terrain();
}

// all game logic is here
function update() {
    if (gl.running) {

        
    }// else it is in pause
    
    gl.input.reset();
    gl.time = new Date().getTime();
    // just update the frames and call update function 60 times in one secund
    window.requestAnimationFrame(update)
}
