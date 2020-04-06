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
            this.stones.push({x: i, y: this.game.gameHeight - 45, width: this.stoneSize.width, height: this.stoneSize.height, type: 1});
        }

        this.stones.push({x: 0, y: 300, width: this.stoneSize.width, height: this.stoneSize.height, type: 1});
        this.stones.push({x: 100, y: 200, width: this.stoneSize.width, height: this.stoneSize.height, type: 1});
    }

    update(deltaTime: number) {
        if(this.game.player.position.y < (window.innerHeight / 8) && this.game.player.jumpCurrentIndex < 50){
            this.moveStoneDown(this.game.player.acceleration);
        }
    }

    draw(ctx: CanvasRenderingContext2D, level: number) {
        this.stones.map((stone:any) => {
            ctx.drawImage(this.images[`stone${stone.type}`], stone.x,stone.y, stone.width, stone.height);
        });

        let lastStone:any = this.stones[this.stones.length - 1];

        if(lastStone.y > 120){
            this.addStone(level);
        }
    }

    addStone = (level: number): void => {
        this.stones.push({x: (Math.random() * (this.canvas.width - this.stoneSize.width)), y: -this.stoneSize.height, width: this.stoneSize.width, height: this.stoneSize.height, type: level});
    }

    moveStoneDown = (acceleration: number) => {
        this.stones.map((stone:any) => {
            stone.y += acceleration;
        })
    }

    private preloadImages() {
        for(let i = 1; i < 10; i++){
            this.loadImage(`stone${i}`, `../assets/images/patterns/${i}.jpg`);
        }
    }

    private loadImage(name: string, path: string): void {
        var img = new Image();
        img.src = path;
        this.images[name] = img;    
    }
}