
import StoneImage from './image'

export class Terrain {

    createBackground = (width: number, height:number,color:string ) => {
        
    }

    refreshStone = (gameEngineInstance: any, stones: any,canvas: any) : object[] => {
        let returnStonesCordinates: object[] = [];
        stones.map((stone:any) => {
            gameEngineInstance.ctx.drawImage(gameEngineInstance.images.stone1, stone.x,stone.y, stone.width, stone.height);
            returnStonesCordinates.push({x: stone.x, y: stone.y, width: stone.width, height: stone.height});
        })

        let lastStone:any = returnStonesCordinates[returnStonesCordinates.length - 1];

        
        if(lastStone.y > 150){
            // console.log(lastStone)
            returnStonesCordinates.push({x: (Math.random() * canvas.width), y: -50, width: lastStone.width, height: lastStone.height});
        }
        return returnStonesCordinates;
    }

    addStone = (canvas: any, size: any): object => {
        return {x: 200, y: 0, width: 80, height: 42}
    }

    moveStoneDown = (stones: any, acceleration: number) => {
        let returnStonesCordinates: object[] = [];
        stones.map((stone:any) => {
            returnStonesCordinates.push({x: stone.x, y: stone.y + acceleration, width: stone.width, height: stone.height});
        })


        return returnStonesCordinates;
    }
}