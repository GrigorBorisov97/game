import { stoneObjectInterface } from './Interfaces'

export default class ImageClass {
    
    constructor(source: string){
        var image = new Image();
        image.src = source;
        return image;
    }

}
