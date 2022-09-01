import Point from "../module/Point.js";
import Mob from '../mob/mob.js';
import Rock from './rock.js';

export default class Monster extends Mob{
    constructor(gamescene){
        super();
        this.life = 3;
        this.level = 1;
        this.shots = [];
        this.center = this.destination = this.latestDestination = new Point(0,0);
        let mobtypes = ['zombie.gif','slime.gif'];
        let image = GLOBAL.Assets.images[mobtypes[randInt(0,mobtypes.length)]];
        this.sprite = SpriteMaker.imageToCanvas(image);
        this.sprite = SpriteMaker.magnify(this.sprite,2);
        this.sprite = SpriteMaker.transformCanvasColors(this.sprite,{"#ffffff":"_"});
        this.width = this.sprite.width;
        this.height = this.sprite.height;
        this.gamescene = gamescene;
        this.directions = [DIRECTION.DOWN, DIRECTION.UP, DIRECTION.LEFT, DIRECTION.RIGHT];
        this.dir = this.directions[randInt(0,this.directions.length)];
        this.cooldown = 0;
    }
    setPosition(point){
        this.center = this.destination = this.latestDestination = point;
    }
    draw(ctx){
        ctx.drawImage(this.sprite,
            this.center.x - this.width/2, 
            this.center.y - this.height/2,
            this.width,
            this.height
            );
        [...this.shots].forEach(obj=>{
            if(obj.draw) obj.draw(ctx);
        });
    }
    fire(){
        this.shotsCount--;
        if(this.shots.length > 3) return;
        new Rock(this);
    }
    update(time){
        this.shots = this.shots.filter(s => 
            s.y >= 0 && s.y <= GLOBAL.CANVAS_HEIGHT && 
            s.x >= 0 && s.x <= GLOBAL.CANVAS_WIDTH && 
            s.life > 0);
        [...this.shots].forEach(obj=>{
            if(obj.update) obj.update(time);
        });
        this.cooldown++;
        if(this.cooldown > 5){
            let playerlocation = this.gamescene.player.center;
            this.dir = getDirection(this.destination.getAngleTo(playerlocation));
            // console.log(`moving ${dir}`);
            //this.destination.move(this.dir,this.width);
            this.cooldown = 0;
        }
        
    }
}