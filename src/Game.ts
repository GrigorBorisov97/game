import { Player } from './Player'
import { GameInterface } from './Interfaces';

class Game implements GameInterface
{   
    gameWidth: number;
    gameHeight: number;
    player: Player;
    gameObjects: Array<object> = [];
  
    ctx: CanvasRenderingContext2D;
    images: { [key: string]: HTMLImageElement } = {};

    constructor(gameWidth: number, gameHeight: number) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    start(): void {
        this.preloadAssets();

        this.player = new Player(this);
        // new terrain

        this.gameObjects = [this.player];
    }

    update(deltaTime: number): void {
        this.player.update(deltaTime);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.player.draw(ctx);
    }

    private preloadAssets() {
        this.loadImage('playerLeft', '../assets/images/player_left.png');
        this.loadImage('playerRight', '../assets/images/player_right.png');
        this.loadImage('stone1', '../assets/images/patterns/1.jpg');
        this.loadImage('stone2', '../assets/images/patterns/2.jpg');
        this.loadImage('stone3', '../assets/images/patterns/3.jpg');
        this.loadImage('stone4', '../assets/images/patterns/4.jpg');
    }

    private loadImage(name: string, path: string): void {
        var img = new Image();
        img.src = path;
        this.images[name] = img;      
    }

    private loadSound(name: string, path: string): void {
        // ...
    }

    
 

}

export default Game;