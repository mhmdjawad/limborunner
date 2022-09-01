import Point from "../module/Point.js";
import Mob from '../mob/mob.js';
import Rock from './rock.js';
import Brick from "./brick.js";
export default class Player extends Mob{
    constructor(game){
        super(game);
        this.life = 100;
        this.level = 1;
        this.center = this.destination = this.latestDestination = new Point(0,0);
        this.shots = [];
        this.playersprite = this.getSprite();
        this.width = this.playersprite.width;
        this.height = this.playersprite.height;
        this.dir = DIRECTION.UP;
    }
    static getSprite(){
        let sprite = SpriteMaker.imageToCanvas(GLOBAL.Assets.images['hero1.gif']);
        sprite = SpriteMaker.magnify(sprite,2);
        sprite = SpriteMaker.transformCanvasColors(sprite,{"#ffffff":"_"});
        return sprite;
    }
    setPosition(point){
        this.center = this.destination = this.latestDestination = point;
    }
    draw(ctx){
        ctx.drawImage(this.playersprite,
            this.center.x - this.width/2, 
            this.center.y - this.height/2);
        [...this.shots].forEach(obj=>{
            if(obj.draw) obj.draw(ctx);
        });
        let to = this.center.clone();
        to.move(this.dir,this.width);
        ctx.fillStyle = "#4b58b57a";
        ctx.fillRect(
            to.x - this.width/2, 
            to.y - this.height/2,
            this.width,
            this.height);
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
    move(dir){
        if(this.dir == dir){
            this.destination.move(dir,this.width);
            this.collisionNormalizer();
        }
        this.dir = dir;
    }
    moveleft(){
        this.move(DIRECTION.LEFT);
    }
    moveright(){
        this.move(DIRECTION.RIGHT);
    }
    moveup(){
        this.move(DIRECTION.UP);
    }
    movedown(){
        this.move(DIRECTION.DOWN);
    }
    fire(){
        this.shotsCount--;
        if(this.shots.length > 3) return;
        new Rock(this);
    }
    placewall(){
        let to = this.center.clone();
        to.move(this.dir,this.width);
        this.game.Objects.push(new Brick(this.game,to));
    }
}