import Point from "../module/Point.js";
import Rectangle from '../module/Rectangle.js';
import Rock from './rock.js';
export default class Player extends Rectangle{
    constructor(){
        super();
        this.life = 100;
        this.level = 1;
        this.center = this.destination = this.latestDestination = new Point(0,0);
        this.shots = [];
        this.fill = "white";
        this.playersprite = SpriteMaker.imageToCanvas(GLOBAL.Assets.images['hero1.gif']);
        this.playersprite = SpriteMaker.magnify(this.playersprite,2);
        this.playersprite = SpriteMaker.transformCanvasColors(this.playersprite,{"#ffffff":"_"});
        this.width = this.playersprite.width;
        this.height = this.playersprite.height;
        this.dir = DIRECTION.UP;
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
        //super.draw(ctx);
        ctx.drawImage(this.playersprite,
            this.center.x - this.width/2, 
            this.center.y - this.height/2,
            this.width,
            this.height
            );
        [...this.shots].forEach(obj=>{
            if(obj.draw) obj.draw(ctx);
        });
    }
    update(time){
        this.shots = this.shots.filter(s => 
            s.y >= 0 && s.y <= GLOBAL.CANVAS_HEIGHT && 
            s.x >= 0 && s.x <= GLOBAL.CANVAS_WIDTH && 
            s.life > 0);
        [...this.shots].forEach(obj=>{
            if(obj.update) obj.update(time);
        });
    }
    fire(){
        this.shotsCount--;
        if(this.shots.length > 3) return;
        new Rock(this);
    }
    moveleft(){
        this.destination.move(DIRECTION.LEFT,this.width);
        this.dir = DIRECTION.LEFT;
        this.collisionNormalizer();
    }
    moveright(){
        this.destination.move(DIRECTION.RIGHT,this.width);
        this.dir = DIRECTION.RIGHT;
        this.collisionNormalizer();
    }
    moveup(){
        this.dir = DIRECTION.UP;
        this.destination.move(DIRECTION.UP,this.width);
        this.collisionNormalizer();
    }
    movedown(){
        this.dir = DIRECTION.DOWN;
        this.destination.move(DIRECTION.DOWN,this.width);
        this.collisionNormalizer();
    }
    collisionNormalizer(){
        if(this.destination.y >= GLOBAL.CANVAS_HEIGHT - this.width){
            this.destination.y = GLOBAL.CANVAS_HEIGHT - this.width;
        }
        if(this.destination.y >= GLOBAL.CANVAS_HEIGHT - this.width){
            this.destination.y = GLOBAL.CANVAS_HEIGHT - this.width;
        }
        if(this.destination.y >= GLOBAL.CANVAS_HEIGHT - this.width){
            this.destination.y = GLOBAL.CANVAS_HEIGHT - this.width;
        }
        if(this.destination.y >= GLOBAL.CANVAS_HEIGHT - this.width){
            this.destination.y = GLOBAL.CANVAS_HEIGHT - this.width;
        }
        if(this.destination.x >= GLOBAL.CANVAS_WIDTH - this.width){
            this.destination.x = GLOBAL.CANVAS_WIDTH - this.width;
        }
        if(this.destination.x >= GLOBAL.CANVAS_WIDTH - this.width){
            this.destination.x = GLOBAL.CANVAS_WIDTH - this.width;
        }
        if(this.destination.x <= this.width){
            this.destination.x = this.width;
        }
        if(this.destination.x >= GLOBAL.CANVAS_WIDTH - this.width){
            this.destination.x = GLOBAL.CANVAS_WIDTH - this.width;
        }
    }
}