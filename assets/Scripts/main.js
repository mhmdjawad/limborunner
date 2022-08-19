import GameBase     from "./module/GameBase.js";
import SceneManager from './scene/SceneManager.js';
class Game extends GameBase{
    constructor(){
        super(GLOBAL.CANVAS);
        this.SceneManager = new SceneManager(this.EventManager,this);
    }
    async start(){
        super.start();
        this.SceneManager.toLoadingScene();
        this.Timer.start();
    }
    update(time) {
        super.update(time);
        if(this.Timer.isPaused == false){
            if(this.SceneManager){
                this.SceneManager.update(time);
                this.SceneManager.draw(this.ctx);
            }
            else{
                this.Timer.stop();
            }
        }
    }
    drawTime(t){
        let framesCount = this.framesPassedTillNow.toString().padStart(8,'0');
        let tx = this.canvas.width - this.timeHMS.length * 8 - 4;
        let fx = this.canvas.width - framesCount.length * 8 - 4;
        if(this.fontHandler){
            this.fontHandler.print(this.timeHMS,   this.ctx,tx,4);
            this.fontHandler.print(framesCount,    this.ctx,fx,20);
        }
    }
}
document.addEventListener('DOMContentLoaded', function () {
    window.game = new Game();
    setTimeout(() => {
        window.game.start();
    }, 500);
}, false);