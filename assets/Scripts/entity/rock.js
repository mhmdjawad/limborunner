import Point from "../module/Point.js";
export default class Rock extends Point{
    constructor(that){
        super(that.center.x,that.center.y);
        this.that = that;
        this.that.shots.push(this);
        this.life = that.level;
        this.speed = that.level;
        this.dir = this.that.dir;
    }
    draw(ctx){
        super.drawCircle(ctx,4,"red");
    }
    update(time){
        super.move( this.dir ,this.speed + 10);
    }
}