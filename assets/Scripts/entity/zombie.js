import Point from "../module/Point.js";
import Mob from '../mob/mob.js';
import Rock from './rock.js';
import Brick from "./brick.js";
export default class Zombie extends Mob{
    constructor(game){
        super(game);
        this.life = 3;
        this.level = 1;
        this.center = this.destination = this.latestDestination = new Point(0,0);
        this.shots = [];
        this.sprite = this.getSprite();
        this.width = this.sprite.width;
        this.height = this.sprite.height;
        this.dir = DIRECTION.UP;
        this.speed = 50;
        this.cooldownact = this.speed;
        this.canAttack = true;
    }
    getSprite(){
        let sprite = SpriteMaker.imageToCanvas(GLOBAL.Assets.images['zombie.gif']);
        sprite = SpriteMaker.magnify(sprite,2);
        sprite = SpriteMaker.transformCanvasColors(sprite,{"#ffffff":"_"});
        if(this.canAttack == false){
            sprite = SpriteMaker.transformCanvasColors(sprite,{"#6abe30":"#6a6230"});
        }
        return sprite;
    }
    setPosition(point){
        this.center = this.destination = this.latestDestination = point;
    }
    draw(ctx){
        ctx.drawImage(this.sprite,
            this.center.x - this.width/2, 
            this.center.y - this.height/2);
        [...this.shots].forEach(obj=>{
            if(obj.draw) obj.draw(ctx);
        });
        /*let to = this.center.clone();
        to.move(this.dir,this.width);
        ctx.fillStyle = "#4b58b57a";
        ctx.fillRect(
            to.x - this.width/2, 
            to.y - this.height/2,
            this.width,
            this.height);*/
    }
    update(time){
        this.shots = this.shots.filter(s => 
            s.y >= 0 && s.y <= this.game.mapoverlay.height && 
            s.x >= 0 && s.x <= this.game.mapoverlay.width && 
            s.life > 0);
        [...this.shots].forEach(obj=>{
            if(obj.update) obj.update(time);
        });
        this.cooldownact--;
        if(this.cooldownact <= 0){
            this.cooldownact = this.speed;
            if(rand() > 0.85) this.fire();
            if(rand() > 0.95) this.placewall();
            let pm = this.getPossibleMoves();
            if(pm.length > 0){
                this.dir = pm[randInt(0,pm.length)];
                this.move(this.dir);
            }
        }
    }
    fire(){
        if(this.canAttack)
            new Rock(this);
    }
    placewall(){
        let to = this.center.clone();
        to.move(this.dir,this.width);
        this.game.Objects.push(new Brick(this.game,to));
    }
}