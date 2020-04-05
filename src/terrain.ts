
import StoneImage from './image'

export class Terrain {

    createBackground = (width: number, height:number,color:string ) => {
        
    }

    refreshStone = (gameEngineInstance: any, stones: any) => {
        stones.map((stone:any) => {

            gameEngineInstance.ctx.drawImage(gameEngineInstance.images.stone1, stone.x,stone.y, stone.width, stone.height);

        })
    }

    addStone = () => {
        
    }
}