
const canvas = <HTMLCanvasElement> document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

interface stoneObjectInterface{
    type: string,
    x: number,
    y: number,
    scale: number
}

export class Terrain {
    stone: Array<stoneObjectInterface>;

    constructor(){
        this.stone = [];
    }

    buildScreen = () => {
        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }

    addStone = () => {

    }
}