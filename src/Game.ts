import { GameInterface } from './Interfaces';
import { Input } from './Input';
import { Terrain } from './Terrain';
import { Player } from './Player'
import Sound from './Sound';
import ImageClass from './image';

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
    images: { [key: string]: any } = {};

    selectedPlayer = 1;

    input: any;
    score: number = 0;
    isReloading: boolean = false;
    level: number = 1;
     
    playerDistance: number = 100;
    canvas: any;
  
    click = {x: 0, y: 0};
    c: number = 0;


    constructor(gameWidth: number, gameHeight: number, canvas: any) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.canvas = canvas;

        this.loadAssets();
    }

    start(): void {

        this.input = new Input(this)

        this.player = new Player(this);
        this.terrain = new Terrain(this);

        // this.gameObjects = [this.player];
    }

    loadAssets() {
        this.sounds['jump'] = new Sound("../assets/sounds/jump.mp3");
        this.sounds['megaJump'] = new Sound("../assets/sounds/megaJump.mp3");

        this.images['start_bg'] = new ImageClass('../assets/images/bg5.jpg');
        this.images['players'] = [];

        this.images['players']['1'] = new ImageClass('../assets/images/1/1.png');
        this.images['players']['2'] = new ImageClass('../assets/images/1/2.png');
        this.images['players']['3'] = new ImageClass('../assets/images/1/3.png');
        this.images['players']['4'] = new ImageClass('../assets/images/1/4.png');
        this.images['players']['5'] = new ImageClass('../assets/images/1/5.png');
        this.images['players']['6'] = new ImageClass('../assets/images/1/6.png');
        this.images['players']['7'] = new ImageClass('../assets/images/1/7.png');

        this.images['arrow_right'] = new ImageClass('../assets/images/icons/arrow-right.png');
        this.images['arrow_left'] = new ImageClass('../assets/images/icons/arrow-left.png');
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
            this.click = {x:0,y:0};
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
       //  ctx.drawImage(this.images['start_bg'],0,0, this.gameWidth * 2, this.gameHeight);   

        ctx.font = "22px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("SUPER GRI60", 100, 70);

        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("START GAME", 80, 460);

        // check for game start
        if (this.click.x > 80 && this.click.x < this.gameWidth - 80 && this.click.y > 420 && this.click.y < 510) {
            this.gameState = GAME_STATE.RUNNING;
           //  this.selectedPlayer = this.c+2;
           if (this.c == 1) {
            this.selectedPlayer = 1;
           }
           if (this.c == 0) {
            this.selectedPlayer = 2;
           }
           if (this.c == -1) {
            this.selectedPlayer = 3;
           }
           if (this.c == -2) {
            this.selectedPlayer = 4;
           }
           if (this.c == -3) {
            this.selectedPlayer = 5;
           }
           if (this.c == -4) {
            this.selectedPlayer = 6;
           }
           if (this.c == -5) {
            this.selectedPlayer = 7;
           }
        }

        // check for move players
        if (this.click.x > 30 && this.click.x < 80 && this.click.y > 320 && this.click.y < 360) {
            if (this.c > -5 ) this.c--;
        }
        if (this.click.x > this.gameWidth - 60 && this.click.x < this.gameWidth - 20 && this.click.y > 220 && this.click.y < 360) {
            if (this.c < 1 ) this.c++;
        }
        var cc = this.c;
        this.images['players'].map((pl: any) => {
            ctx.drawImage(pl , this.playerDistance * cc, 150, 120, 120);
            cc++;
        });

        ctx.strokeStyle = "green";
        ctx.beginPath();
        ctx.moveTo(100, 135);
        ctx.lineTo(230, 135);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(100, 285);
        ctx.lineTo(230, 285);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(100, 135);
        ctx.lineTo(100, 285);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(230, 135);
        ctx.lineTo(230, 285);
        ctx.stroke();


        ctx.drawImage(this.images['arrow_left'] , 20, 320, 42, 42);
        ctx.drawImage(this.images['arrow_right'] , this.gameWidth - 60, 320, 42, 42);
    }

}

export default Game;