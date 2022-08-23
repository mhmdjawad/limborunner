import KeyboardAndMouse     from '../handler/KeyboardAndMouse.js'
import Player               from '../entity/player.js';
import Monster               from '../entity/monster.js';
import Point from '../module/Point.js';
import Rectangle from '../module/Rectangle.js';
import PixelFont from '../handler/PixelFont.js';
import SpriteMaker from '../sprite/SpriteMaker.js';
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
        this.mobs = [];

        this.player.setPosition(new Point(32,GLOBAL.CANVAS_HEIGHT-16));
        this.Objects = [this.player];
        let grass = SpriteMaker.imageToCanvas(GLOBAL.Assets.images['grass.gif']);
		let stone = SpriteMaker.imageToCanvas(GLOBAL.Assets.images['stone.gif']);
		let dirt = SpriteMaker.imageToCanvas(GLOBAL.Assets.images['dirt.gif']);
		let water = SpriteMaker.imageToCanvas(GLOBAL.Assets.images['water.gif']);
        
        grass = SpriteMaker.magnify(grass,3);
        stone = SpriteMaker.magnify(stone,3);
        dirt = SpriteMaker.magnify(dirt,3);
        water = SpriteMaker.magnify(water,3);
        
        //let map1 = SpriteMaker.imageToCanvas(GLOBAL.Assets.images['map2.gif']);
        let map1 = document.createElement('canvas');
        map1.length = map1.width = 40;
        let map1c = map1.getContext('2d');
        map1c.fillStyle = "#000";
        map1c.fillRect(0,0,40,40);
        this.mapoverlay = SpriteMaker.pxielToCanvas( map1,{
            // "#fbf236" : '_',
            // "#99e550" : grass,
            // "#5b6ee1" : water,
            // "#847e87" : stone,
            // "#8f563b" : [stone,dirt],
            // "#ffffff" : [grass,stone,dirt,water],
            // "#000" : [grass,stone,dirt,water]
            "#000" : [grass,dirt]
        },grass.width,grass.height);

    }
    gameplayField(ctx){
        ctx.globalAlpha = 0.3;
        ctx.drawImage(this.mapoverlay,
			0,
			0,
			this.mapoverlay.width,
			this.mapoverlay.height
		);
        ctx.globalAlpha = 1;
    }
    update(time) {
        this.player.update(time);
        [...this.mobs].forEach(obj=>{
            if(obj.update) obj.update(time);
        });
        this.player.shots.forEach(x => {
            [...this.mobs].forEach(obj=>{
                if(x.distanceTo(obj.center) <= 32){
                    obj.life -= x.life;
                    x.life = 0;
                }
            });
        });
        this.mobs = this.mobs.filter(s => s.life > 0);
        if(this.mobs < 40 && time % 10 == 0){
            this.addMob();
        }
    }
    newgame(){
        
    }
    notify(e){
		if(e.name == KeyboardAndMouse.Event.KEYDOWN || e.name == KeyboardAndMouse.Event.KEYPRESS){
			this.keydown(e.event);
		}
		else{
			console.log(e);
		}
	}
    draw(ctx) {
		ctx.clearRect(0,0,GLOBAL.CANVAS_WIDTH,GLOBAL.CANVAS_HEIGHT);
		ctx.fillStyle = "#000";
		ctx.fillRect(0,0,GLOBAL.CANVAS_WIDTH,GLOBAL.CANVAS_HEIGHT);
        this.gameplayField(ctx);
        [...this.Objects].forEach(obj=>{
			if(obj.draw) obj.draw(ctx);
		});
        [...this.mobs].forEach(obj=>{
			if(obj.draw) obj.draw(ctx);
		});
        // this.FontHandlerW.print("ROCKS " + this.player.shotsCount, ctx, 0, GLOBAL.CANVAS_HEIGHT/2 + 32, false);
	}
    addMob(){
        let mob = new Monster(this);
        let randx = randInt(GLOBAL.TILESIZE * 3 , GLOBAL.CANVAS_WIDTH - GLOBAL.TILESIZE  * 3);
        let randy = randInt(GLOBAL.TILESIZE * 3 , GLOBAL.CANVAS_HEIGHT - GLOBAL.TILESIZE  * 6);
        mob.setPosition(new Point(randx,randy));
        this.mobs.push(mob);
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
        else if(key == KeyboardAndMouse.key.O){
            this.addMob();
        }
        else if(key == KeyboardAndMouse.key.ESCAPE){
            this.sceneManager.toMainMenuScene();
        }
        else if(key == KeyboardAndMouse.key.BACKSPACE){
            this.sceneManager.toMainMenuScene();
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