import { GameInterface } from "./Interfaces";


export default class Sound {

    game: GameInterface;
    bodyElement: HTMLBodyElement;
    sounds: { [key: string]: any } = {};
    volume: number = 1;

    constructor(game: GameInterface) {
        this.game = game;
        this.bodyElement = document.querySelector("body");
        
        this.load();
    }

    load(): void {
        this.buildSoundHtmlElement("jump", "../assets/sounds/jump.mp3");
        this.buildSoundHtmlElement("megaJump", "../assets/sounds/megaJump.mp3");
    }

    buildSoundHtmlElement(name: string, source: string) {
        var soundFile = document.createElement("audio");
        soundFile.preload = "auto";
        soundFile.volume = this.volume;
        var src = document.createElement("source");
        src.src = source;
        soundFile.appendChild(src);
        this.bodyElement.appendChild(soundFile);
        this.sounds[name] = soundFile;
    }

}

