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
        for(let i = 0; i < this.game.gameWidth; i += 60){      
            this.stones.push({x: i, y: this.game.gameHeight - 45, width: this.stoneSize.width, height: this.stoneSize.height, type: 1, haveSpring: false});
        }

        this.stones.push({x: 0, y: 300, width: this.stoneSize.width, height: this.stoneSize.height, type: 1, haveSpring: false});
        this.stones.push({x: 100, y: 200, width: this.stoneSize.width, height: this.stoneSize.height, type: 1, haveSpring: true});
    }

    update(deltaTime: number) {
        this.moveStoneDown(this.game.level * 0.33);
        if(this.game.player.position.y < (window.innerHeight / 8) && this.game.player.jumpCurrentIndex < 50){
            this.moveStoneDown(this.game.player.acceleration);
        }
    }

    draw(ctx: CanvasRenderingContext2D, level: number) {
        ctx.drawImage(this.images.background, 0,0, this.game.gameWidth * 2, this.game.gameHeight);

        this.stones.map((stone:any) => {
            ctx.drawImage(
                stone.haveSpring ? this.images['spring'] : this.images[`stone${stone.type}`], 
                stone.x,stone.y, stone.width, stone.height);
        });

        let lastStone:any = this.stones[this.stones.length - 1];

        if(lastStone.y > 120){
            this.addStone(level);
        }
    }

    addStone = (level: number): void => {
        this.stones.push({x: (Math.random() * (this.canvas.width - this.stoneSize.width)), y: -this.stoneSize.height, width: this.stoneSize.width, height: this.stoneSize.height, type: level,haveSpring: (Math.floor(Math.random() * 10)) == 5 ? true : false});
    }

    moveStoneDown = (acceleration: number) => {
        this.stones.map((stone:any) => {
            stone.y += acceleration;
        })
    }

    private preloadImages() {
        for(let i = 1; i < 10; i++){
            this.loadImage(`stone${i}`, `../assets/images/patterns/${i}.png`);
        }
        this.loadImage('spring', '../assets/images/spring.png');
        this.loadImage('background', '../assets/images/background.jpg');
    }

    private loadImage(name: string, path: string): void {
        var img = new Image();
        img.src = path;
        this.images[name] = img;    
    }

}
