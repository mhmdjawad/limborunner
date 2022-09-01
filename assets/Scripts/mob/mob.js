import Point from '../module/Point.js';
const isOverlapping = (pA, sA, pB, sB)=> abs(pA.x - pB.x)*2 < sA.x + sB.x & abs(pA.y - pB.y)*2 < sA.y + sB.y;
export default class Mob{
    constructor(game){
        this.game = game;
        this.location = new Point(0,0);
        this.sprite = this.getSprite();
        this.objects = [];
    }
    getSprite(){
        let canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = "red";
        ctx.fillRect(0,0,32,32);
        return canvas;
    }
    update(time){
        if(!this.game.isPaused()){
            if(this.destination.length > 0){
                this.location = this.destination[0];
                delete(this.destination[0]);
            }
        }
    }
    draw(ctx){
        ctx.drawImage(this.sprite,
            this.location.x - this.sprite.width/2, 
            this.location.y - this.sprite.height/2,
            this.sprite.width,
            this.sprite.height
            );
        [...this.objects].forEach(obj=>{
            if(obj.draw) obj.draw(ctx);
        });
    }
    moveTo(point){
        let enitityExist = this.game.haveEntityAt(point);
        if(!enitityExist){
            this.destination.push(point);
        }
    }
    move(dir){
        let to = this.center.clone();
        to.move(dir,this.width);
        this.location.push(to);
    }
}

class Player extends Mob{
    
}