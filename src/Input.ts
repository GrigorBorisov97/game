import { InputInterface } from './Interfaces';

export class Input implements InputInterface{

    bodyElement: HTMLBodyElement;
  
    arrowLeft: boolean;
    arrowRight: boolean;
    arrowUp: boolean;

    constructor() {
        this.bodyElement = document.querySelector("body");
         
        this.listen();
    }

    listen() {
        /*
            НОВИТЕ 
            КОНТРОЛИ
            СА
            А,D,W
            !!!
        */

        // this.bodyElement.addEventListener("click", stopAnimation, false);
        this.bodyElement.addEventListener("keypress", event => {
            // console.log(event)
            if (event.code === 'KeyA') {
                this.arrowLeft = true;
            } else if (event.code === 'KeyD') {
                this.arrowRight = true;
            } else if (event.code === 'KeyW') {
                this.arrowUp = true;
            }
            // do something
        }, false);

        this.bodyElement.addEventListener("keyup", event => {
            if (event.code === 'KeyA') {
                this.arrowLeft = false;
            } else if (event.code === 'KeyD') {
                this.arrowRight = false;
            } else if (event.code === 'KeyW') {
                this.arrowUp = false;
            }
            // do something
        }, false);
    }
    
}
