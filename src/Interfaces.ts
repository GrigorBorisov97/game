
export interface GameInterface {
    gameWidth: number;
    gameHeight: number;
    togglePause(): void;
    canvas: any;
    click: any;
}

export interface stoneObjectInterface{
    type: number,
    x: number,
    y: number,
    scale: number
}

export interface EnvInterface {
    preload(): void;
    create(): void;
    update(): void;
}

export interface InputInterface {
    bodyElement: HTMLBodyElement;
    moveLeft: boolean;
    moveRight: boolean;
    moveUp: boolean;
}
