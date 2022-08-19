import Point from './Point.js';

const SIDES = {
    TOP :       Symbol('TOP'),
    BOTTOM :    Symbol('BOTTOM'),
    RIGHT :     Symbol('RIGHT'),
    LEFT :      Symbol('LEFT'),
}

export default class Rectangle{
    constructor(center,width,height,fill){
        if(!Rectangle.SIDES) Rectangle.SIDES = SIDES;
        this.container  =   null;
        this.center     =   center  || new Point(0,0);
        this.width      =   width   || 0;
        this.height     =   height  || 0;
        this.fill       =   fill    || null;
        this.rotation   =   0;
    }
    
    rotateCW(image,times,passed = 0){
        if(times <= 0) return image;
        if(times >= 8) times -= 8;
        if(times < 0) times += 8;
        let buffer = document.createElement('canvas');
        buffer.width = this.entityManager.size;
        buffer.height = this.entityManager.size;
        let context = buffer.getContext('2d');
        if(times % 2 == 0){
            context.setTransform(0,1,-1,0,image.width,0);
            context.drawImage(image,0,0);
            context.setTransform(1,0,0,1,0,0);
            return this.rotateCW(buffer,times-2,passed+2);
        }
        else{
            context.rotate(Math.PI/4);
            context.drawImage(image,8,-16);
            return this.rotateCW(buffer,times-1,passed++);
        }
    }
    draw(ctx){
        if(this.fill){
            ctx.fillStyle = this.fill;
            ctx.fillRect(
                this.center.x - this.width/2, 
                this.center.y - this.height/2,
                this.width,
                this.height);
        }
    }
    drawCenter(ctx,color){
        ctx.fillStyle = color;
            ctx.fillRect(
                this.center.x - 1, 
                this.center.y - 1,
                2,
                2);
    }
    stroke(ctx,color="red"){
        ctx.strokeStyle = color;
        ctx.beginPath();
        //top-left
        ctx.moveTo(this.center.x - this.width/2,this.center.y- this.height/2);
        //top-right
        ctx.lineTo(this.center.x + this.width/2,this.center.y- this.height/2);
        //bottom-left
        ctx.lineTo(this.center.x + this.width/2,this.center.y+ this.height/2);
        //bottom-right
        ctx.lineTo(this.center.x - this.width/2,this.center.y+ this.height/2);
        //top-left
        ctx.lineTo(this.center.x - this.width/2,this.center.y- this.height/2);
        ctx.stroke();
    }
    snapToGrid(aspect = null){
        if(aspect == null){aspect = this.height;}
        //get top
        this.center.x = this.center.x - this.width/2;
        this.center.y = this.center.y - this.height/2;
        //snap top to grid
        let x_s = this.center.x / aspect;
        let y_s = this.center.y / aspect;
        x_s = (x_s%1 <= 0.5) ? Math.floor(x_s) : Math.ceil(x_s);
        y_s = (y_s%1 <= 0.5) ? Math.floor(y_s) : Math.ceil(y_s);
        this.center.x = x_s * aspect;
        this.center.y = y_s * aspect;
        //get center
        this.center.x = this.center.x + this.width/2;
        this.center.y = this.center.y + this.height/2;
    }
    getTop(){
        let top = {
            x : this.center.x - this.width/2,
            y : this.center.y - this.height/2,
        }
        return new Point(top.x, top.y);
    }
    centerFrom(top){
        this.center.x = top.x + this.width/2;
        this.center.y = top.y + this.height/2;
    }
    getTop(){
        return this.center.y - this.height/2;
    }
    getLeft(){
        return this.center.x - this.width/2;
    }
    getRight(){
        return this.center.x + this.width/2;
    }
    getBottom(){
        return this.center.y + this.height/2;
    }
    intersects(other) {
		return !(this.getLeft() > other.getRight() ||
			this.getRight() < other.getLeft() ||
			this.getTop() > other.getBottom() ||
			this.getBottom() < other.getTop());
    }
    containsWhole(other) {
		return other.getLeft() >= this.getLeft() &&
			other.getRight() <= this.getRight() &&
			other.getBottom() <= this.getBottom() &&
			other.getTop() >= this.getTop();
	}
}