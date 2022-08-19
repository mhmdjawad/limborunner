import KeyboardAndMouse     from '../handler/KeyboardAndMouse.js'
import Player               from '../entity/player.js';
import Point from '../module/Point.js';
import Rectangle from '../module/Rectangle.js';
import PixelFont from '../handler/PixelFont.js';
export default class GameScene{
    constructor(sceneManager){
        window.scene = this;
        this.sceneManager = sceneManager;
        this.sceneManager.eventManager.addSubscriber(this,[
			KeyboardAndMouse.Event.TOUCH,
			KeyboardAndMouse.Event.CLICK,
			KeyboardAndMouse.Event.MOUSEDOWN,
			KeyboardAndMouse.Event.KEYDOWN
		]);
        this.FontHandler = new PixelFont(16,'#ffffff');
        this.level = 1;
        this.player = Player.makePlayer();
        this.player.setPosition(new Point(32*2,GLOBAL.CANVAS_HEIGHT-32));
        this.Objects = [this.player];
    }
    update(time) {
        this.player.update(time);
    }
    newgame(){
        
    }
    notify(e){
		if(e.name == KeyboardAndMouse.Event.KEYDOWN || e.name == KeyboardAndMouse.Event.KEYPRESS){
			this.keydown(e.event);
		}
		else{
			console.log(e);		///but we are only listning to click and touch
		}
	}
    draw(ctx) {
		ctx.clearRect(0,0,GLOBAL.CANVAS_WIDTH,GLOBAL.CANVAS_HEIGHT);
		ctx.fillStyle = "#000";
		ctx.fillRect(0,0,GLOBAL.CANVAS_WIDTH,GLOBAL.CANVAS_HEIGHT);
		[...this.Objects].forEach(obj=>{
			if(obj.draw) obj.draw(ctx);
		});
        // this.FontHandlerW.print("ROCKS " + this.player.shotsCount, ctx, 0, GLOBAL.CANVAS_HEIGHT/2 + 32, false);
	}
	keydown(key){
		if(key.which) key = key.which;
		if(key == KeyboardAndMouse.key.LEFT){
            this.player.moveleft();
        }
        else if(key == KeyboardAndMouse.key.RIGHT){
            this.player.moveright();
        }
        else if(key == KeyboardAndMouse.key.UP){
            this.player.moveup();
        }
        else if(key == KeyboardAndMouse.key.DOWN){
            this.player.movedown();
        }
        else if(key == KeyboardAndMouse.key.SPACE){
            this.player.fire();
        }
		else if(key == KeyboardAndMouse.key.X || key == KeyboardAndMouse.key.ENTER){
            if(this.sceneManager._main.Timer.isPaused == false){
                this.sceneManager._main.Timer.isPaused = true;
            }
            else{
                this.sceneManager._main.Timer.isPaused = false;
            }
		}
	}
}