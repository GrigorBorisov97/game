import { Terrain } from './Terrain';
import GameEngine from './GameEngine';
// import * as Const from './Const';
import { Input } from './Input';
import { Player } from './Player';
 

// set global object
var gl: any = {
    time: new Date().getTime(),
    running: true,
    terrain: new Terrain(),
    input: new Input(),
    player: new Player(),
    a: 0,
}

var game = new GameEngine('game', gl.terrain.canvas.width, gl.terrain.canvas.height, 
                            { preload: preload, create: create, update: update });
game.run();
 
// preload some image, audio ...
function preload() {
    
    game.loadImage('playerLeft', '../assets/images/player_left.png');
    game.loadImage('playerRight', '../assets/images/player_right.png');
    game.loadImage('stone1', '../assets/images/patterns/1.jpg');
    game.loadImage('stone2', '../assets/images/patterns/2.jpg');
    game.loadImage('stone3', '../assets/images/patterns/3.jpg');
    game.loadImage('stone4', '../assets/images/patterns/4.jpg');
}

// create objects like player, terrain ...
function create() {

}

// all game logic is here
function update() {

    if (gl.running) {
        // reload screen
        if(gl.player.y > gl.terrain.canvas.height){
            gl.running = false;
            window.location.reload();
        }
        
        game.ctx.clearRect(0, 0, gl.terrain.canvas.width, gl.terrain.canvas.height);
        game.ctx.fillStyle = "blue";


        // Terrain logic
        gl.terrain.refreshStone(game);

        if(gl.player.y < (window.innerHeight / 8) && gl.player.jumpCurrentIndex < 50){
            gl.terrain.moveStoneDown(gl.player.acceleration);
        }

        /*  
        *   Player logic
        */

         // down top calculations
        if (gl.player.jumpLength > 0) {
            gl.player.jumpCurrentIndex++;
            gl.player.initY = gl.player.y;
            // lele ....
            var readyForJump = gl.terrain.stones.some(filterArrayStone);

            if (readyForJump) {
                gl.player.jumpCurrentIndex = 0;
                gl.player.jumpResetPath(1);
            } else if (gl.player.jumpCurrentIndex > gl.player.jumpLength) {
                gl.player.jumpCurrentIndex = 0;
                if ( ! readyForJump   ) {
                    gl.player.jumpResetPath(2);
                }
            }
            gl.player.y = gl.player.jump[gl.player.jumpCurrentIndex];
        }
        
        // left and right for player
        var lastDirection = gl.player.direction;
        if (gl.input.arrowLeft) { 
            if (gl.player.x+gl.player.width<0) {
                gl.player.x = gl.terrain.canvas.width;
            } 
            gl.player.direction = 'left';
            gl.player.x -= gl.player.speed * (lastDirection == 'right' ? 0.6 : 0.3);
        }
        if (gl.input.arrowRight) { 
            if (gl.player.x>gl.terrain.canvas.width) {
                gl.player.x = 0-gl.player.width;
            }
            gl.player.direction = 'right';
            gl.player.x += gl.player.speed * (lastDirection == 'left' ? 0.6 : 0.3);
        }
        
        // draw player
        game.ctx.drawImage(gl.player.direction == 'left' ? game.images.playerLeft : game.images.playerRight, gl.player.x, gl.player.y, gl.player.width, gl.player.height);

    }// else it is in pause


    gl.a++;
    gl.time = new Date().getTime();
    // just update the frames and call update function 60 times in one secund
    window.requestAnimationFrame(update)
}

function isReadyForNewJump(sX: number, sY: number, pX: number, pY: number): boolean {
    if ( (pX > sX && pX < sX+45) && (pY < sY && pY > sY-45)) {
        return true;
    }

    return false;
}

function filterArrayStone(stone:any, index:number, array:any):boolean {
    return isReadyForNewJump(stone.x,stone.y, gl.player.x +30, gl.player.y + 30);
}