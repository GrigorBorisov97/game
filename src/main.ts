import Game from './Game';

const GAME_WIDTH = 360;
const GAME_HEIGHT = 530;

const canvas = <HTMLCanvasElement> document.getElementById('game');
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
const ctx = canvas.getContext('2d');

var game = new Game(GAME_WIDTH, GAME_HEIGHT);
game.start();

var lastTime: number = 0;

function update(timestamp: number): void {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    game.update(deltaTime);

    game.draw(ctx);

    window.requestAnimationFrame(update)
}

window.requestAnimationFrame(update);
 