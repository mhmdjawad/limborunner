import Point from "../module/Point.js";
export default class Rock extends Point{
    constructor(that){
        super(that.center.x,that.center.y);
        this.that = that;
        this.that.shots.push(this);
        this.life = that.level;
        this.speed = that.level;
    }
    draw(ctx){
        super.drawCircle(ctx,4,"red");
    }
    update(time){
        if(this.that.type == "CAT"){
            super.move( DIRECTION.UP,this.speed + 10);
        }
        else if(this.that.type == "DOG"){
            super.move( DIRECTION.DOWN,this.speed + 10);
        }
    }
}