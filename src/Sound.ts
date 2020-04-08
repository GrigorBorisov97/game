import { GameInterface } from "./Interfaces";


export default class Sound {

    bodyElement: HTMLBodyElement;
    source: string;
    volume: number = 1;
    soundFile: any; 

    constructor(source: string) {
        this.source = source;
        this.bodyElement = document.querySelector("body");
        
       this.load();
    }

    load(): void {
        var soundFile = document.createElement("audio");
        soundFile.preload = "auto";
        soundFile.volume = this.volume;
        var src = document.createElement("source");
        src.src = this.source;
        soundFile.appendChild(src);
        this.bodyElement.appendChild(soundFile);
        this.soundFile = soundFile;
    }

    play() {
        this.soundFile.play();
    }

}

