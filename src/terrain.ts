import { GameInterface } from './Interfaces';

export class Terrain {
    game: any;
    images: { [key: string]: HTMLImageElement } = {};
    
    stoneSize:any = {
        width: 80,
        height: 42
    }
    stones:object[] = [];
    canvas: any;

    constructor(game: GameInterface){
        this.game = game;
        this.preloadImages();



        this.canvas = {
            width: 360,
            height: 530,
            background: '#595959'
        };

        // push first stones
        for(let i = 0; i < this.game.gameWidth; i += 80){      
            this.stones.push({x: i, y: this.game.gameHeight - 45, width: this.stoneSize.width, height: this.stoneSize.height});
        }

        this.stones.push({x: 200, y: 300, width: this.stoneSize.width, height: this.stoneSize.height});
        this.stones.push({x: 100, y: 200, width: this.stoneSize.width, height: this.stoneSize.height});
    }

    update(deltaTime: number) {
        if(this.game.player.position.y < (window.innerHeight / 8) && this.game.player.jumpCurrentIndex < 50){
            this.moveStoneDown(this.game.player.acceleration);
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.stones.map((stone:any) => {
            ctx.drawImage(this.images.stone1, stone.x,stone.y, stone.width, stone.height);
        });

        let lastStone:any = this.stones[this.stones.length - 1];

        if(lastStone.y > 150){
            this.addStone();
        }
    }

    addStone = (): void => {
        this.stones.push({x: (Math.random() * this.canvas.width), y: 0, width: this.stoneSize.width, height: this.stoneSize.height});
    }

    moveStoneDown = (acceleration: number) => {
        this.stones.map((stone:any) => {
            stone.y += acceleration;
        })
    }

    private preloadImages() {
        this.loadImage('stone1', '../assets/images/patterns/1.jpg');
        this.loadImage('stone2', '../assets/images/patterns/2.jpg');
    }
    private loadImage(name: string, path: string): void {
        var img = new Image();
        img.src = path;
        this.images[name] = img;    
    }
}