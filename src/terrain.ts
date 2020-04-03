
import StoneImage from './image'
import { stoneObjectInterface } from './Interfaces'
import { ctx } from './Const'

export class Terrain {
    stones: Array<stoneObjectInterface>;

    constructor(){
        this.stones = [{
            type: 3,
            x: 10,
            y: 10,
            scale: 1
        }];
    }

    buildScreen = () => {
        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }

    addStone = () => {
        this.stones.map(stone => {
            new StoneImage(stone)
        })
    }
}