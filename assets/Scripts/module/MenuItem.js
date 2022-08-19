export default class MenuItem{
	constructor(scene,title,x,y,_callback, width = null, height = null){
		this.scene = scene;
		this.title = title;
		this.x = x;
		this.y = y;
		this.center = false;
		this.selected =  false;
		this.activate = _callback;
		this.width = width || GLOBAL.CANVAS_WIDTH;
		this.height = height || this.scene.FontHandler.size;
	}
	draw(context){
		if(this.selected){
			context.fillStyle = "#20ff0066";
			context.fillRect(
				this.x - 4, 
				this.y - 4, 
				this.width + 4, 
				this.height + 8);
		}

		context.fillStyle = "blue";
		context.font = "16px ";
		// context.fillText(this.title,this.x,this.y);
		this.scene.FontHandler.print(this.title, context, this.x, this.y,this.center);
	}
	update(){

	}
	inersect(x,y){
		let intersectX = false;
		let intersectY = false;
		if(x >= this.x && x <= this.x+this.width){
			intersectX = true;
		}
		if(y >= this.y && y <= this.y+this.height){
			intersectY = true;
		}
		return intersectX && intersectY;
	}
}