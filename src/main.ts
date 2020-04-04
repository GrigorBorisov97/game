import { Terrain } from './Terrain';
import GameEngine from './GameEngine';
// import * as Const from './Const';
import { Input } from './Input';
import { Player } from './Player';
 

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
    player: new Player(),
}
console.log(gl)

var game = new GameEngine('game', gl.canvas.width, gl.canvas.height, 
                            { preload: preload, create: create, update: update });
game.run();
 
// preload some image, audio ...
function preload() {
    
    game.loadImage('playerLeft', '../assets/images/player_left.png');
    game.loadImage('playerRight', '../assets/images/player_right.png');
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
        var lastDirection = gl.player.direction;
        if (gl.input.arrowLeft) { 
            if (plX+gl.player.width<0) {
                plX = gl.canvas.width;
            } 
            gl.player.direction = 'left';
            plX -= gl.player.speed * (lastDirection == 'right' ? 2 : 1);
        }
        if (gl.input.arrowRight) { 
            if (plX>gl.canvas.width) {
                plX = 0-gl.player.width;
            }
            gl.player.direction = 'right';
            plX += gl.player.speed * (lastDirection == 'left' ? 2 : 1);
        }
        gl.player.x = plX;

        game.ctx.drawImage(gl.player.direction == 'left' ? game.images.playerLeft : game.images.playerRight, plX,plY, gl.player.width, gl.player.height);

    }// else it is in pause
    
    gl.input.reset();
    gl.time = new Date().getTime();
    // just update the frames and call update function 60 times in one secund
    window.requestAnimationFrame(update)
}
