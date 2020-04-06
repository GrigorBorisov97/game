
export interface GameInterface {
    gameWidth: number;
    gameHeight: number;
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
    arrowLeft: boolean;
    arrowRight: boolean;
    arrowUp: boolean;
}
