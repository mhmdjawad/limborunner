import Point from "../module/Point.js";
import Mob from '../mob/mob.js';
import Rock from './rock.js';
import Brick from "./brick.js";
export default class Player extends Mob{
    constructor(game){
        super(game);
        this.life = 100;
        this.level = 1;
        this.ammo = 100;
        this.center = this.destination = this.latestDestination = new Point(0,0);
        this.shots = [];
        this.playersprite = this.getSprite();
        this.width = this.playersprite.width;
        this.height = this.playersprite.height;
        this.dir = DIRECTION.UP;
    }
    getSprite(){
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
            s.y >= 0 && s.y <= this.game.mapoverlay.height && 
            s.x >= 0 && s.x <= this.game.mapoverlay.width && 
            s.life > 0);
        [...this.shots].forEach(obj=>{
            if(obj.update) obj.update(time);
        });
    }
    fire(){
        // this.shotsCount--;
        if(this.ammo <= 0) {
            if(this.game.score <= 0) return;
            this.ammo = 50;
            this.game.score--;
        }
        // if(this.shots.length > 3) return;
        new Rock(this);
        this.ammo--;
    }
    buyammo(){
        if(this.game.score <= 0) return;
        this.ammo += 50;
        this.game.score--;
    }
    placewall(){
        if(this.game.score <= 0) return;
        let to = this.center.clone();
        to.move(this.dir,this.width);
        this.game.Objects.push(new Brick(this.game,to));
        this.game.score--;
    }
    possibleMoves(){
        let c = this.center;
    }
}