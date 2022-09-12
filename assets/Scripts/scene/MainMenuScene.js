import KeyboardAndMouse     from '../handler/KeyboardAndMouse.js'
import MenuItem             from '../module/MenuItem.js';
import PixelFont 			from '../handler/PixelFont.js';
import SpriteMaker 			from '../sprite/SpriteMaker.js';
import {Paint} 				from '../lib/Helpers.js';
export default class MainMenuScene{
	constructor(sceneManager){
		window.scene = this;
		this.sceneManager = sceneManager;
		this.sceneManager.eventManager.addSubscriber(this,[
			KeyboardAndMouse.Event.TOUCH,
			KeyboardAndMouse.Event.CLICK,
			KeyboardAndMouse.Event.MOUSEDOWN,
			KeyboardAndMouse.Event.KEYDOWN
		]);
		this.y = Math.floor(this.sceneManager._main.canvas.height);
		this._speed = 5;
		this.arrived = false;
		this.FontHandler = new PixelFont(16,'#ffffff');
		this.FontHandlerGreen = new PixelFont(8*4,'green');
		this.FontHandlerRed = new PixelFont(8*4,'red');
		this.FontHandlerBlue = new PixelFont(8*4,'#0000ff');
		this.FontHandlerWhite = new PixelFont(8*4,'#ffffff');
		let menuXY = {
			x : GLOBAL.TILESIZE * 5,
			y : GLOBAL.TILESIZE * 15,
			h : this.FontHandler.size + GLOBAL.TILESIZE,
			r : 0
        };
        let self = this;
		this.menuItems = [
			new MenuItem(this,"New Game"		, menuXY.x, menuXY.y + menuXY.h * menuXY.r++, function(){
				self.sceneManager.toGame();
			}),
			new MenuItem(this,"LEADERBOARD"		, menuXY.x, menuXY.y + menuXY.h * menuXY.r++, function(){
				self.sceneManager.toLeaderboard();
			})
		];
		this.menuItemSelected = 0;
		this.menuItemSelected = this.menuItemSelected % this.menuItems.length
		this.copyright = this.getCopyright();
		this.buffer = this.getBuffer();
		this.Objects = [];
		this.started = false;
		this.board = {
			w : GLOBAL.CANVAS_WIDTH,
			h : GLOBAL.CANVAS_HEIGHT,
		};
		this.y=0;
        
	}
	async start(){
		if(this.started == true) return;
		this.started = true;
	}
	update(time) {
		if(!this.arrived){
			if(this.y > 0){
				this.y -= this._speed;
			} else {
				this.arrived = true;
				this.y = 0;
			}
		}
		if(this.arrived){
			this.start();
		}
		[...this.Objects].forEach(obj=>{
			if(obj.update) obj.update(time);
		});
	}
	notify(e){
		let clientX,clientY;
		clientX = clientY = Infinity;
		let event = e.event;
		if(e.name == KeyboardAndMouse.Event.KEYDOWN || e.name == KeyboardAndMouse.Event.KEYPRESS){
			this.keydown(e.event);
		}
		else{
			//console.log(e);
		}
        this.y = 0;
        this.buffer = this.getBuffer();
	}
	keydown(key){
		if(key.which) key = key.which;
		let speed = 5;
		if(key == KeyboardAndMouse.key.UP){
			this.menuItemSelected--;
			if(this.menuItemSelected < 0) this.menuItemSelected = this.menuItems.length-1;
		}
		else if(key == KeyboardAndMouse.key.DOWN){
			this.menuItemSelected++;
		}
		else if(key == KeyboardAndMouse.key.X || key == KeyboardAndMouse.key.ENTER){
			setTimeout(this.menuItems[this.menuItemSelected].activate,500);
		}
		this.menuItemSelected = this.menuItemSelected % this.menuItems.length;
	}
	getBuffer(){
		let buffer = document.createElement('canvas');
		buffer.width = GLOBAL.CANVAS_WIDTH;
		buffer.height = GLOBAL.CANVAS_HEIGHT;
		let context = buffer.getContext('2d');
		[...this.menuItems].forEach(item=>{
			if(item == this.menuItems[this.menuItemSelected]){
				item.selected = true;
			}
			else{
				item.selected = false;
			}
			item.draw(context);
		});
		this.drawIntroImage(context);
		this.drawIntroGameLogo(context);
		this.drawCopyRights(context);
		this.drawLogo(context);
		return buffer;
	}
	drawCopyRights(context){
		let cr = {
            c : this.copyright,
            w : this.copyright.width,
            h : this.copyright.height
        };
        cr.x = context.canvas.width/2 - cr.w/2;
        cr.y = context.canvas.height - cr.h * 2;
		context.drawImage(cr.c,cr.x,cr.y,cr.w,cr.h);
	}
	drawLogo(context){
		let img = GLOBAL.Assets.images[GLOBAL.IMAGES.LOGO];
		if(img){
			let x = GLOBAL.CANVAS_WIDTH - img.width;
            context.drawImage(img,
                x,
                GLOBAL.CANVAS_HEIGHT - img.height - GLOBAL.TILESIZE*6,
                img.width,
                img.height
            );
		}
	}
	draw(ctx) {
		ctx.clearRect(0,0,GLOBAL.CANVAS_WIDTH,GLOBAL.CANVAS_HEIGHT);
		ctx.fillStyle = "#000";
		ctx.fillRect(0,0,GLOBAL.CANVAS_WIDTH,GLOBAL.CANVAS_HEIGHT);
		let buffer = this.buffer;
		ctx.drawImage(buffer,0,this.y,buffer.width,buffer.height);
		this.drawGridAndBoard(ctx);
		[...this.Objects].forEach(obj=>{
			if(obj.draw) obj.draw(ctx);
		});
	}
	drawIntroImage(context){
		/*this.FontHandlerRed.printLines([
			'LIMBO RUNNER',
			'GAME'
		],context,0,80,true);
		this.FontHandlerGreen.printLines([
			'LIMBO RUNNER',
			'GAME'
		],context,1,82,true);*/
		this.FontHandlerBlue.printLines([
			'LIMBO RUNNER',
			'GAME'
		],context,2,86,true);
		this.FontHandlerWhite.printLines([
			'LIMBO RUNNER',
			'GAME'
		],context,3,88,true);
	}
	drawIntroGameLogo(context){
		let L = this.FontHandler.chars['L'];
		let P01 = SpriteMaker.imageToCanvas(GLOBAL.Assets.images['grass.gif']);
		let P02 = SpriteMaker.imageToCanvas(GLOBAL.Assets.images['stone.gif']);
		
		let grass = SpriteMaker.imageToCanvas(GLOBAL.Assets.images['grass.gif']);
		let stone = SpriteMaker.imageToCanvas(GLOBAL.Assets.images['stone.gif']);
		let dirt = SpriteMaker.imageToCanvas(GLOBAL.Assets.images['dirt.gif']);
		let water = SpriteMaker.imageToCanvas(GLOBAL.Assets.images['water.gif']);
		let image;
		image = SpriteMaker.pxielToCanvas( this.FontHandler.chars['L'],{"#ffffff" : [grass,stone,dirt,water]},8,8);
		context.drawImage(image,
			GLOBAL.TILESIZE,
			GLOBAL.CANVAS_HEIGHT - image.height - GLOBAL.TILESIZE*6,
			image.width,
			image.height
		);
		image = SpriteMaker.pxielToCanvas( this.FontHandler.chars['I'],{"#ffffff" : [grass,stone,dirt,water]},8,8);
		context.drawImage(image,
			image.width,
			GLOBAL.CANVAS_HEIGHT - image.height - GLOBAL.TILESIZE*6,
			image.width,
			image.height
		);
		image = SpriteMaker.pxielToCanvas( this.FontHandler.chars['M'],{"#ffffff" : [grass,stone,dirt,water]},8,8);
		context.drawImage(image,
			image.width*2,
			GLOBAL.CANVAS_HEIGHT - image.height - GLOBAL.TILESIZE*6,
			image.width,
			image.height
		);
		image = SpriteMaker.pxielToCanvas( this.FontHandler.chars['B'],{"#ffffff" : [grass,stone,dirt,water]},8,8);
		context.drawImage(image,
			image.width*3,
			GLOBAL.CANVAS_HEIGHT - image.height - GLOBAL.TILESIZE*6,
			image.width,
			image.height
		);
		image = SpriteMaker.pxielToCanvas( this.FontHandler.chars['O'],{"#ffffff" : [grass,stone,dirt,water]},8,8);
		context.drawImage(image,
			image.width*4,
			GLOBAL.CANVAS_HEIGHT - image.height - GLOBAL.TILESIZE*6,
			image.width,
			image.height
		);
	}
    getCopyright(){
        let text = 'BY: MJZ';
        let buffer = document.createElement('canvas');
        buffer.width = text.length * this.FontHandler.size;
        buffer.height = this.FontHandler.size;
        let context = buffer.getContext('2d');
        this.FontHandler.print(text, context, 0, 0, false);
        return buffer;
    }
	drawGridAndBoard(context){
		let grass = SpriteMaker.imageToCanvas(GLOBAL.Assets.images['dirt.gif']);
        let dirt = SpriteMaker.imageToCanvas(GLOBAL.Assets.images['grass.gif']);
		grass = SpriteMaker.magnify(grass,4);
        dirt = SpriteMaker.magnify(dirt,4);
		let sprite = grass;
		context.globalAlpha = 0.3;
		for(let i = 0 ; i < 20 ;i++){
			for(let j = 0 ; j < 20 ; j++){
				if(((i % 2 ==0 || j %2 == 0) && !(i % 2 == 0 && j %2 == 0) )){
                    sprite = grass;
                }
                else{
                    sprite = dirt;
                }
				context.drawImage(sprite,
					i * sprite.width,
					j * sprite.height
				);
			}
		}
		context.globalAlpha = 1;
	}
}