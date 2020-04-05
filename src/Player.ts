

export class Player {

    x: number = 200;
    y: number = 450;
    initY: number = 450;
    width: number =  100;
    height: number =  100;
    direction: string =  'left';
    speed:  number = 12;
    jump: Array<number> = [];
    jumpLength: number = 0;
    jumpCurrentIndex: number = 0;
    max: number = 50;

    constructor() {
        this.setStandartJumpPath();
    }

    setStandartJumpPath() {
        this.jump = [];
        this.jumpLength = 0;
        var tmp: number = this.max;
        for(var i=0;i<this.max;i++) {
            tmp = tmp+4;
            this.jump.push(this.initY - tmp);  
        }
        for(var i=this.max;i>0;i--) {
            tmp = tmp-4;
            this.jump.push(this.initY - tmp);
        }
        this.jumpLength = this.jump.length-1;
    }

    setDownJumpPaht() {
        this.jump = [];
        this.jumpLength = 0;
        var tmp: number = 0;
        for(var i=0;i<this.max;i++) {
            tmp = tmp+4;
            this.jump.push(this.initY + tmp);
        }
        this.jumpLength = this.jump.length-1;
    }

    jumpResetPath(dir: number) {
        if (dir == 1) {
            this.setStandartJumpPath();
        } else if (dir == 2) {
            this.setDownJumpPaht();
        }
    }

}
