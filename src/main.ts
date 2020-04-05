import { Terrain } from './Terrain';
import GameEngine from './GameEngine';
// import * as Const from './Const';
import { Input } from './Input';
import { Player } from './Player';
 

// set global object
var gl: any = {
    canvas: {
        width: 360,
        height: 530,
        background: '#595959'
    },
    time: new Date().getTime(),
    running: true,
    stones: [],
    terrain: new Terrain(),
    input: new Input(),
    player: new Player(),
    a: 0,
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
    game.loadImage('stone2', '../assets/images/patterns/2.jpg');
    game.loadImage('stone3', '../assets/images/patterns/3.jpg');
    game.loadImage('stone4', '../assets/images/patterns/4.jpg');
}

// create objects like player, terrain ...
function create() {
    //create background
    gl.terrain.createBackground(gl.canvas.width, gl.canvas.height, gl.canvas.background);

    // push first stones
    // gl.stones.push({x: 30, y: 395, width: 80, height: 42});
    // gl.stones.push({x: 260, y: 425, width: 80, height: 42});

    for(let i = 0; i < gl.canvas.width; i += 80){      
        gl.stones.push({x: i, y: gl.canvas.height - 45, width: 80, height: 42});
    }

    gl.stones.push({x: 100, y: 300, width: 80, height: 42});
    gl.stones.push({x: 100, y: 200, width: 80, height: 42});
}

// all game logic is here
function update() {

   

    
    if (gl.running) {
        
        game.ctx.clearRect(0, 0, gl.canvas.width, gl.canvas.height);
        game.ctx.fillStyle = "blue";


        // Terrain logic
        gl.stones = gl.terrain.refreshStone(game, gl.stones, gl.canvas);

        if(gl.player.y < (window.innerHeight / 8) && gl.player.jumpCurrentIndex < 50){
            gl.stones = gl.terrain.moveStoneDown(gl.stones, gl.player.acceleration);
        }

        /*  
        *   Player logic
        */

         // down top calculations
        if (gl.player.jumpLength > 0) {
            gl.player.jumpCurrentIndex++;
            gl.player.initY = gl.player.y;
            // lele ....

            var readyForJump = gl.stones.some(filterArrayStone);

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
                gl.player.x = gl.canvas.width;
            } 
            gl.player.direction = 'left';
            gl.player.x -= gl.player.speed * (lastDirection == 'right' ? 2 : 1);
        }
        if (gl.input.arrowRight) { 
            if (gl.player.x>gl.canvas.width) {
                gl.player.x = 0-gl.player.width;
            }
            gl.player.direction = 'right';
            gl.player.x += gl.player.speed * (lastDirection == 'left' ? 2 : 1);
        }
        
        // draw player
        game.ctx.drawImage(gl.player.direction == 'left' ? game.images.playerLeft : game.images.playerRight, gl.player.x, gl.player.y, gl.player.width, gl.player.height);

    }// else it is in pause


    gl.a++;
    gl.input.reset();
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