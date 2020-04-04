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

