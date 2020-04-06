import { GameInterface } from './Interfaces';

export class Player {

    game: any;
    position = {
        x: 200,
        y: 45
    }
    images: { [key: string]: HTMLImageElement } = {};
    width: number =  80;
    height: number =  80;
    direction: string =  'left';
    speed:  number = 6;
    // if player is going down
    goingDown: boolean = false;
    gravity: number = 0.6;
    //the up-power will set when is on block and decrease till go down
    upPower: number = 0;
    // player is on the top
    onTop: boolean = false;
    

    constructor(game: GameInterface) {
        this.game = game;
        
        this.preloadImages();
        // this.setStandartJumpPath();
    }

    update(deltaTime: number) {
        //stop player if he is on the top and call moveStone function
        this.position.y < 100 ? this.onTop = true : this.onTop = false;
        
        if(this.onTop && this.upPower > 0){
            this.game.terrain.moveStoneDown(this.upPower);
            this.game.score++;
        }

        else{
            // minus because the 'y' start from top
            this.position.y -= this.upPower;
        }

        //will be chenged with block

        let filterStone = (stone:any, index:number, array:any): boolean => {
            if ( (this.position.x > stone.x - 35 && this.position.x < stone.x+45) && 
                (this.position.y < stone.y + 20 && this.position.y > stone.y-45) && 
                this.upPower < 0
            )
            {
                return true;
            }
            return false;
        }

        if(this.game.terrain.stones.some(filterStone)){
            this.upPower = 16;
        }

        //the gravity ...
        this.upPower -= this.gravity;


        // left and right for player
        var lastDirection = this.direction;
        if (this.game.input.arrowLeft) { 
            if ( this.position.x + this.width < 0 ) {
                this.position.x = this.game.gameWidth;
            } 
            this.direction = 'left';
            this.position.x -= this.speed * (lastDirection == 'right' ? 2 : 1);
        }
        if (this.game.input.arrowRight) { 
            if (this.position.x> this.game.gameWidth) {
                this.position.x = 0 - this.width;
            }
            this.direction = 'right';
            this.position.x += this.speed * (lastDirection == 'left' ? 2 : 1);
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

    private preloadImages() {
        this.loadImage('playerLeft', '../assets/images/player_left.png');
        this.loadImage('playerRight', '../assets/images/player_right.png');
    }

    private loadImage(name: string, path: string): void {
        var img = new Image();
        img.src = path;
        this.images[name] = img;    
    }

}
