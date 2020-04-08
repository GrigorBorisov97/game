import { GameInterface } from './Interfaces';
import { Input } from './Input';
import { Terrain } from './Terrain';
import { Player } from './Player'
import Sound from './Sound';

const GAME_STATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    INIT: 4,
    LOAD: 5,
}

class Game implements GameInterface
{   
    gameWidth: number;
    gameHeight: number;

    player: Player;
    terrain: Terrain;
    sounds: { [key: string]: Sound } = {};
    gameObjects: Array<object> = [];

    gameState: Number = GAME_STATE.INIT;
  
    ctx: CanvasDrawImage;
    images: { [key: string]: HTMLImageElement } = {};

    input: any;
    score: number = 0;
    isReloading: boolean = false;
    level: number = 1;

    constructor(gameWidth: number, gameHeight: number) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    
    start(): void {

        this.input = new Input(this)

        this.player = new Player(this);
        this.terrain = new Terrain(this);

        // this.gameObjects = [this.player];

        this.loadAssets();
    }

    loadAssets() {
        this.sounds['jump'] = new Sound("../assets/sounds/jump.mp3");
        this.sounds['megaJump'] = new Sound("../assets/sounds/megaJump.mp3");
    }

    update(deltaTime: number): void {
        if (this.gameState == GAME_STATE.PAUSED) return;
        if (this.gameState == GAME_STATE.INIT) return;

        this.player.update(deltaTime);
        this.terrain.update(deltaTime);

        if(this.player.position.y > this.gameHeight){
            if(!this.isReloading){
                window.location.reload();
                this.isReloading = true;
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        if (this.gameState == GAME_STATE.INIT) {
            this.initScreen(ctx);
            return;
        }


        this.terrain.draw(ctx, this.level);
        this.player.draw(ctx);

        //levels
        if(this.score / 200 == this.level && this.level < 9){
            this.level++;
        }

        // score
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.fillText((this.score * 9).toString(), 10, 30);

        if (this.gameState == GAME_STATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
        }
    }

    togglePause() {
        if (this.gameState == GAME_STATE.PAUSED) {
            this.gameState = GAME_STATE.RUNNING;
        } else {
            this.gameState = GAME_STATE.PAUSED;
        }
    }

    initScreen(ctx: CanvasRenderingContext2D): void {
        document.addEventListener('click', () => {
            this.gameState = GAME_STATE.RUNNING;
        }, false);


        var bg = new Image();
        bg.src = '../assets/images/bg5.jpg';
        bg = bg;
        ctx.drawImage(bg,0,0, this.gameWidth * 2, this.gameHeight);   

        ctx.font = "30px Arial";
        ctx.fillStyle = "WHITE";
        ctx.fillText("START GAME", 80, 390);

        ctx.font = "22px Arial";
        ctx.fillStyle = "WHITE";
        ctx.fillText("SUPER GRI60", 100, 90);
       
          
        // ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        // ctx.drawImage(bg, 0,0, this.gameWidth, this.gameHeight);
        // ctx.fillRect(0,0, this.gameWidth, this.gameHeight);
        
        // ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        //     ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        //     ctx.fill();


        // ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        // var startBtn = new Image();
        // startBtn.src = '../assets/images/start1.png';
        // ctx.drawImage(startBtn, this.gameWidth / 2 - 50 , this.gameHeight / 2 + 120, 100, 40);

        // ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        // var startBtn = new Image();
        // startBtn.src = '../assets/images/player.png';
        // ctx.drawImage(startBtn, this.gameWidth / 2 - 50 , this.gameHeight / 2 - 20, 100, 40);
        

    }

}

export default Game;