import KeyboardAndMouse     from '../handler/KeyboardAndMouse.js';
import Player               from '../entity/player.js';
// import Monster              from '../entity/monster.js';
import Point                from '../module/Point.js';
import PixelFont            from '../handler/PixelFont.js';
import SpriteMaker          from '../sprite/SpriteMaker.js';
import Brick                from '../entity/brick.js';
import Zombie               from '../entity/zombie.js';

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
        this.player = new Player(this);
        this.score = 0;
        this.mobs = [];
        this.player.setPosition(new Point(16,GLOBAL.CANVAS_HEIGHT-16));
        this.Objects = [];
        this.mapoverlay = this.makeMapBg();
        for(let i = 0 ; i < randInt(10,30) ; i++){
            this.Objects.push(new Brick(this));
        }
    }
    makeMapBg(){
        let grass = SpriteMaker.imageToCanvas(GLOBAL.Assets.images['grass.gif']);
        let dirt = SpriteMaker.imageToCanvas(GLOBAL.Assets.images['dirt.gif']);
        grass = SpriteMaker.magnify(grass,4);
        dirt = SpriteMaker.magnify(dirt,4);
        let map1 = document.createElement('canvas');
        map1.height = 20; map1.width = 20;
        let map1c = map1.getContext('2d');
        map1c.fillStyle = "#000";
        map1c.fillRect(0,0,map1.width,map1.height);
        this.mapoverlay = SpriteMaker.pxielToCanvas( map1,{
            "#000" : [grass,dirt]
        },grass.width,grass.height);
        // document.body.append(this.mapoverlay);
        return this.mapoverlay;
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
            if(obj.shots){
                obj.shots.forEach(x => {
                    [...this.mobs].forEach(obj=>{
                        if(x.distanceTo(this.player.center) <= 32){
                            this.player.life -= x.life;
                            x.life = 0;
                        }
                    });
                    [...this.Objects].forEach(obj=>{
                        if(x.distanceTo(obj.center) <= 32){
                            obj.life -= x.life;
                            x.life = 0;
                        }
                    });
                });
            }
            
        });
        this.player.shots.forEach(x => {
            [...this.mobs].forEach(obj=>{
                if(x.distanceTo(obj.center) <= 32){
                    obj.life -= x.life;
                    x.life = 0;
                }
            });
            [...this.Objects].forEach(obj=>{
                if(x.distanceTo(obj.center) <= 32){
                    obj.life -= x.life;
                    x.life = 0;
                }
            });
        });
        let remaining = this.mobs.filter(s => s.life > 0);
        this.score += this.mobs.length - remaining.length;
        this.mobs = remaining;
        this.Objects = this.Objects.filter(s => s.life > 0);
        if(this.mobs.length < 10 && rand() > 0.4 ){
            this.addMob();
        }
        if(this.player.life <= 0){
            alert('game over final score is ' + this.score);
            this.sceneManager.toMainMenuScene();
        }
    }
    newgame(){
        
    }
    notify(e){
		if(e.name == KeyboardAndMouse.Event.KEYDOWN || e.name == KeyboardAndMouse.Event.KEYPRESS){
			this.keydown(e.event);
            if(!e.event.ctrlKey){
                e.event.preventDefault();
                e.event.stopPropagation();
            }
		}
		else{
			//console.log(e);
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
        this.player.draw(ctx);
        this.FontHandler.printLines([
			'LIFE ' + this.player.life,
            'AMMO ' + this.player.ammo,
            'SCORE ' + this.score,
		],ctx,5,80,false);
	}
    addMob(){
        let mob = new Zombie(this);
        let randx = 16 + 32 * randInt(0, game.canvas.width / 32 );
        let randy = 16 + 32 * randInt(0, game.canvas.height / 32 );
        mob.setPosition(new Point(randx,randy));
        this.mobs.push(mob);
    }
    isPaused(){ 
        return this.sceneManager._main.Timer.isPaused;
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
        else if(key == KeyboardAndMouse.key.B){
            this.player.placewall();
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