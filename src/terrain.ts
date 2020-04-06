
export class Terrain {
    stoneSize:any = {
        width: 80,
        height: 42
    }
    stones:object[] = [];
    canvas: any;

    constructor(){
        this.canvas = {
            width: 360,
            height: 530,
            background: '#595959'
        };

        // push first stones
        for(let i = 0; i < this.canvas.width; i += 80){      
            this.stones.push({x: i, y: this.canvas.height - 45, width: this.stoneSize.width, height: this.stoneSize.height});
        }

        this.stones.push({x: 200, y: 300, width: this.stoneSize.width, height: this.stoneSize.height});
        this.stones.push({x: 100, y: 200, width: this.stoneSize.width, height: this.stoneSize.height});
    }

    createBackground = (width: number, height:number,color:string ) => {
        
    }

    refreshStone = (gameEngineInstance: any) :void  => {
        this.stones.map((stone:any) => {
            gameEngineInstance.ctx.drawImage(gameEngineInstance.images.stone1, stone.x,stone.y, stone.width, stone.height);
        })

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
}