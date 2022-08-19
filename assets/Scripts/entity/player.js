import Point from "../module/Point.js";
import Rectangle from '../module/Rectangle.js';
import Rock from './rock.js';
export default class Player extends Rectangle{
    constructor(){
        super();
        this.width = this.height = 32;
        this.life = 100;
        this.level = 1;
        this.center = this.destination = this.latestDestination = new Point(0,0);
        this.shots = [];
        this.fill = "white";
    }
    static makePlayer(type){
        switch(type){
            default: return new Player;
        }
    }
    setPosition(point){
        this.center = this.destination = this.latestDestination = point;
    }
    draw(ctx){
        super.draw(ctx);
        [...this.shots].forEach(obj=>{
            if(obj.draw) obj.draw(ctx);
        });
    }
    update(time){
        this.shots = this.shots.filter(s => s.y >= 0 && s.y <= GLOBAL.CANVAS_HEIGHT && s.life > 0);
        [...this.shots].forEach(obj=>{
            if(obj.update) obj.update(time);
        });
    }
    fire(){
        this.shotsCount--;
        if(this.shots.length > 3) return;
        let rock = new Rock(this);
    }
    moveleft(){
        this.destination.move(DIRECTION.LEFT,32);
        if(this.destination.x <= 16){
            this.destination.x = 16;
        }
        if(this.destination.x >= GLOBAL.CANVAS_WIDTH - 16){
            this.destination.x = GLOBAL.CANVAS_WIDTH - 16;
        }
    }
    moveright(){
        this.destination.move(DIRECTION.RIGHT,32);
        if(this.destination.x >= GLOBAL.CANVAS_WIDTH - 16){
            this.destination.x = GLOBAL.CANVAS_WIDTH - 16;
        }
        if(this.destination.x >= GLOBAL.CANVAS_WIDTH - 16){
            this.destination.x = GLOBAL.CANVAS_WIDTH - 16;
        }
    }
    moveup(){
        this.destination.move(DIRECTION.UP,32);
        if(this.destination.y >= GLOBAL.CANVAS_HEIGHT - 16){
            this.destination.y = GLOBAL.CANVAS_HEIGHT - 16;
        }
        if(this.destination.y >= GLOBAL.CANVAS_HEIGHT - 16){
            this.destination.y = GLOBAL.CANVAS_HEIGHT - 16;
        }
    }
    movedown(){
        this.destination.move(DIRECTION.DOWN,32);
        if(this.destination.y >= GLOBAL.CANVAS_HEIGHT - 16){
            this.destination.y = GLOBAL.CANVAS_HEIGHT - 16;
        }
        if(this.destination.y >= GLOBAL.CANVAS_HEIGHT - 16){
            this.destination.y = GLOBAL.CANVAS_HEIGHT - 16;
        }
    }
}