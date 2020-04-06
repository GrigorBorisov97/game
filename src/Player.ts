import { GameInterface } from './Interfaces';

export class Player {

    game: any;
    position = {
        x: 200,
        y: 450
    }
    images: { [key: string]: HTMLImageElement } = {};


    x: number = 200;
    y: number = 450;
    initY: number = 450;
    width: number =  100;
    height: number =  100;
    direction: string =  'left';
    speed:  number = 12;
    jump: Array<number> = [];
    jumpLength: number = 0;
    jumpCurrentIndex: number = 0;
    max: number = 50;
    goingDown: boolean = false;
    acceleration: number = 4;
    

    constructor(game: GameInterface) {
        this.game = game;
        
        this.preloadImages();
        this.setStandartJumpPath();
    }

    update(deltaTime: number) {

        if (this.jumpLength > 0) {
           this.jumpCurrentIndex++;
           this.initY = this.position.y;
            // lele ....
            // var readyForJump = gl.terrain.stones.some(filterArrayStone);
            var readyForJump = false;
            if (readyForJump) {
               this.jumpCurrentIndex = 0;
               this.jumpResetPath(1);
            } else if (this.jumpCurrentIndex > this.jumpLength) {
                this.jumpCurrentIndex = 0;
                if ( ! readyForJump   ) {
                    this.jumpResetPath(2);
                }
            }
            this.position.y = this.jump[this.jumpCurrentIndex];
        }
      

        // left and right for player
        var lastDirection = this.direction;
        if (this.game.input.arrowLeft) { 
            if ( this.position.x + this.width < 0 ) {
                this.x = this.game.gameWidth;
            } 
            this.direction = 'left';
            this.position.x -= this.speed * (lastDirection == 'right' ? 0.6 : 0.3);
        }
        if (this.game.input.arrowRight) { 
            if (this.position.x> this.game.gameWidth) {
                this.position.x = 0 - this.width;
            }
            this.direction = 'right';
            this.position.x += this.speed * (lastDirection == 'left' ? 0.6 : 0.3);
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.direction == 'left' ? 
                        this.images.playerLeft : 
                        this.images.playerRight, 
                        this.position.x, 
                        this.position.y, 
                        this.width, 
                        this.height
        );
    }


    setStandartJumpPath() {
        this.jump = [];
        this.jumpLength = 0;
        var tmp: number = this.max;
        for(var i=0;i<this.max;i++) {
            tmp = tmp + this.acceleration;
            this.goingDown = true;
            this.jump.push(this.initY - tmp);  
        }
        for(var i=this.max;i>0;i--) {
            tmp = tmp - this.acceleration;
            this.goingDown = false;
            this.jump.push(this.initY - tmp);
        }
        this.jumpLength = this.jump.length-1;
    }

    setDownJumpPaht() {
        this.jump = [];
        this.jumpLength = 0;
        var tmp: number = 0;
        for(var i=0;i<this.max;i++) {
            tmp = tmp + this.acceleration;
            this.jump.push(this.initY + tmp);
        }
        this.jumpLength = this.jump.length-1;
    }

    jumpResetPath(dir: number) {
        if (dir == 1) {
            this.setStandartJumpPath();
        } else if (dir == 2) {
            this.setDownJumpPaht();
        }
    }

    preloadImages() {
        this.loadImage('playerLeft', '../assets/images/player_left.png');
        this.loadImage('playerRight', '../assets/images/player_right.png');
    }

    private loadImage(name: string, path: string): void {
        var img = new Image();
        img.src = path;
        this.images[name] = img;    
    }

}
