import { InputInterface, GameInterface } from './Interfaces';

export class Input implements InputInterface{

    bodyElement: HTMLBodyElement;
    game: GameInterface;
    moveLeft: boolean = false;
    moveRight: boolean = false;
    moveUp: boolean = false;

    constructor(game: GameInterface) {
        this.game = game;
        this.bodyElement = document.querySelector("body");
         
        this.listen();
    }

    setMovement(key: string, state: boolean) {
        switch (key) {
            case 'ArrowLeft':
            case 'a':
                this.moveLeft = state;
                break;
            case 'ArrowUp':
            case 'w':
                this.moveUp = state;
                break;
            case 'ArrowRight':
            case 'd':
                this.moveRight = state;
                break;
            case "ArrowDown":
            case 's':
                
                break;
            case ' ':
            case 'Enter':
                this.game.togglePause();
                break;
        }
    }

    listen() {
        this.bodyElement.addEventListener("keypress", event => {
            this.setMovement(event.key, true);
        }, false);

        this.bodyElement.addEventListener("keyup", event => {
            this.setMovement(event.key, false);
        }, false);

        this.bodyElement.addEventListener("keydown", (event) => {
            this.setMovement(event.key, true);
        }, false);

        document.addEventListener('click', (e) => {
            var x;
            var y;
            if (e.pageX || e.pageY) { 
                x = e.pageX;
                y = e.pageY;
            }
            else { 
                x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
                y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
            } 
            x -= this.game.canvas.offsetLeft;
            y -= this.game.canvas.offsetTop;

            this.game.click = {
                x: x,
                y: y
            }
        }, false);
    }

}
