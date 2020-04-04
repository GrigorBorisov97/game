import { Terrain } from './Terrain';
import GameEngine from './GameEngine';
// import * as Const from './Const';
import { Input } from './Input';
 

let terrain = new Terrain;
terrain.buildScreen();
terrain.addStone();


// set global object
var gl: any = {
    canvas: {
        width: 360,
        height: 520,
    },
    time: new Date().getTime(),
    running: true,
    terrain: {},
    stones: {},
    input: new Input(),
    player: {
        x: 200,
        y: 420,
        width: 100,
        height: 100,
    },
}
console.log(gl)

var game = new GameEngine('game', gl.canvas.width, gl.canvas.height, 
                            { preload: preload, create: create, update: update });
game.run();
 
// preload some image, audio ...
function preload() {
    
    game.loadImage('player', '../assets/images/player.png');
    game.loadImage('stone1', '../assets/images/patterns/1.jpg');
     
}

// create objects like player, terrain ...
function create() {
    
    // gl.terrain = new Terrain();
}

// all game logic is here
function update() {
    if (gl.running) {
        game.ctx.clearRect(0, 0, gl.canvas.width, gl.canvas.height);

        // Terrain logic

        game.ctx.drawImage(game.images.stone1, 30,30, 50, 50);

        // Player logic
        var plX: number = gl.player.x;
        var plY: number = gl.player.y;
        if (gl.input.arrowLeft) { 
            plX -= 7; 
            if (plX+gl.player.width<0) {
                plX = gl.canvas.width;
            } 
        }
        if (gl.input.arrowRight) { 
            plX += 7; 
            if (plX>gl.canvas.width) {
                plX = 0-gl.player.width;
            }
        }
        gl.player.x = plX;

        game.ctx.drawImage(game.images.player, plX,plY, gl.player.width, gl.player.height);

    }// else it is in pause
    
    gl.input.reset();
    gl.time = new Date().getTime();
    // just update the frames and call update function 60 times in one secund
    window.requestAnimationFrame(update)
}
