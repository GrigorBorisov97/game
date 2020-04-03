import { stoneObjectInterface } from './Interfaces'
import { ctx } from './Const'

export default class StoneImage{
    base_image: HTMLImageElement;

    constructor(stone:stoneObjectInterface){
        this.base_image = new Image();
        this.base_image.src = 'img/base.png';
        this.base_image.onload = () => {
            ctx.drawImage(this.base_image, 0, 0);
        }
    }
}