import { EnvInterface } from './Interfaces'

class GameEngine
{   
    id: string;
    width: number;
    height: number;
    env: EnvInterface;
    ctx: CanvasRenderingContext2D;

    // env:any need fix...
    constructor(id: string, width: number, height: number, env: EnvInterface) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.env = env;

        this.setUp();
    }

    private setUp() {
        this.createCanvas();
        this.env.preload();
        this.env.create();
        window.requestAnimationFrame(this.env.update);
    }

    private createCanvas() {
        const canvas = <HTMLCanvasElement> document.getElementById(this.id);
        canvas.width = this.width;
        canvas.height = this.height;
        this.ctx = canvas.getContext('2d');
    }

}

export default GameEngine;