import { GameInterface } from './Interfaces';
import { Input } from './Input';
import { Terrain } from './Terrain';
import { Player } from './Player'
import Sound from './Sound';

const GAME_STATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3
}

class Game implements GameInterface
{   
    gameWidth: number;
    gameHeight: number;

    player: Player;
    terrain: Terrain;
    sound: Sound;
    gameObjects: Array<object> = [];

    gameState: Number;
  
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
        this.gameState = GAME_STATE.RUNNING;

        this.input = new Input(this)

        this.player = new Player(this);
        this.terrain = new Terrain(this);
        this.sound = new Sound(this);

        // this.gameObjects = [this.player];
    }

    update(deltaTime: number): void {
        if (this.gameState == GAME_STATE.PAUSED) return;

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

}

export default Game;