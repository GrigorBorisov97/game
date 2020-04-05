
import StoneImage from './image'

export class Terrain {

    createBackground = (width: number, height:number,color:string ) => {
        
    }

    refreshStone = (gameEngineInstance: any, stones: any) : object[] => {
        let returnStonesCordinates: object[] = [];
        stones.map((stone:any) => {
            gameEngineInstance.ctx.drawImage(gameEngineInstance.images.stone1, stone.x,stone.y, stone.width, stone.height);
            returnStonesCordinates.push({x: stone.x, y: stone.y, width: stone.width, height: stone.height});
        })
        return returnStonesCordinates;
    }

    addStone = () => {
        
    }
}