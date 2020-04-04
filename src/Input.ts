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
        // this.bodyElement.addEventListener("click", stopAnimation, false);
        this.bodyElement.addEventListener("keydown", event => {
            if (event.keyCode === 37) {
                this.arrowLeft = true;
            } else if (event.keyCode === 39) {
                this.arrowRight = true;
            } else if (event.keyCode === 38) {
                this.arrowUp = true;
            }
            // do something
          }, false);
    }

    reset() {
        this.arrowLeft = false;
        this.arrowRight = false;
        this.arrowUp = false;
    }

}
