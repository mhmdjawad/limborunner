import KeyboardAndMouse     from '../handler/KeyboardAndMouse.js';
import Player               from '../entity/player.js';
import Point                from '../module/Point.js';
import PixelFont            from '../handler/PixelFont.js';
import SpriteMaker          from '../sprite/SpriteMaker.js';
import Zombie               from '../entity/zombie.js';
import Brick               from '../entity/brick.js';
export default class GameScene{
    constructor(sceneManager){
        window.scene = this;
        this.sceneManager = sceneManager;
        this.main = scene.sceneManager._main;
        this.sceneManager.eventManager.addSubscriber(this,[
			KeyboardAndMouse.Event.TOUCH, KeyboardAndMouse.Event.CLICK,
			KeyboardAndMouse.Event.MOUSEDOWN, KeyboardAndMouse.Event.KEYDOWN
		]);
        this.FontHandler = new PixelFont(16,'#ffffff');
        this.FontHandlerHeader = new PixelFont(64,'green');
        this.player = new Player(this);
        this.stage = 1;
        this.score = 0;
        this.initGame();
    }
    initGame(){
        this.gamestate = 0;
        this.mobs = [];
        this.Objects = [];
        this.level = new Level(this);
        this.mapoverlay = this.level.getMap();
        this.player.setPosition(new Point(16,this.mapoverlay.height-16));
        for(let i = 0 ; i < this.stage * randInt(20,50) ; i++){
            this.Objects.push(new Brick(this));
        }
        for(let i = 0 ; i < this.stage * randInt(20,50) ; i++){
            this.addMob();
        }
        for(let i = 0 ; i < this.stage * randInt(5,10) ; i++){
            this.addBuilderMob();
        }
    }
    update(time) {
        if(this.gamestate == 1){
            return;
        }
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
        if(this.player.life <= 0){
            alert('game over final score is ' + this.score);
            let name = prompt("enter name for score board","player");
            GLOBAL.Leaderboard.push(
                {
                    'name' : name,
                    'score' : this.score
                }
            );
            this.sceneManager.toMainMenuScene();
        }
        if(this.player.center.y <= 16){
            this.gamestate = 1;
        }
        if(this.mobs.length < 10 * this.stage && rand() > 0.4 ){
            this.addMob();
        }
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
		}
	}
    getBuffer(){
        let cvs = document.createElement('canvas');
        cvs.width = this.mapoverlay.width;
        cvs.height = this.mapoverlay.height;
        let ctx = cvs.getContext('2d');
        this.gameplayField(ctx);
        [...this.Objects].forEach(obj=>{
			if(obj.draw) obj.draw(ctx);
		});
        [...this.mobs].forEach(obj=>{
			if(obj.draw) obj.draw(ctx);
		});
        this.player.draw(ctx);
        return cvs;
    }
    gameplayField(ctx){
        // ctx.globalAlpha = 0.3;
        ctx.drawImage(this.mapoverlay,
			0,
			0,
			this.mapoverlay.width,
			this.mapoverlay.height
		);
        // ctx.globalAlpha = 1;
    }
    draw(ctx) {

        if(this.gamestate == 1){
            ctx.fillStyle = "#000";
            ctx.fillRect(0,0,this.main.canvas.width,this.main.canvas.height);
            this.drawStageCompleted(ctx);
            return;
        }
		ctx.clearRect(0,0,this.main.canvas.width,this.main.canvas.height);
		ctx.fillStyle = "#000";
		ctx.fillRect(0,0,this.main.canvas.width,this.main.canvas.height);
        let w = this.main.canvas.width / 2;
        let h = this.main.canvas.height / 2;
        let playerPos = this.player.center;
        let x = playerPos.x;
        let y = playerPos.y;
        x = Math.max(x-w,0);
        x = Math.min(x, this.main.canvas.width - w );
        x = 0;
        y = y - w;
        let sx,sy,sWidth,sHeight,dx,dy,dWidth,dHeight;
        sx          = x;
        sy          = y;
        dx          = 0;
        dy          = 0;
        sWidth      = w * 2;
        sHeight     = h * 2;
        dWidth      = w * 2;
        dHeight     = h * 2;
        let maxsy = scene.mapoverlay.height - game.canvas.height;
        if(sy > maxsy){
            sy = maxsy;
        }
        if(sy < 0){
            sy = 0;
        }
        window.sy = sy;
        ctx.drawImage(this.getBuffer(), 
            sx, 
            sy, 
            sWidth, 
            sHeight, 
            dx, 
            dy, 
            dWidth, 
            dHeight)
        this.FontHandler.printLines([
			'LIFE ' + this.player.life,
            'AMMO ' + this.player.ammo,
            'SCORE ' + this.score,
            'STAGE ' + this.stage,
		],ctx,5,80,false);
	}
    addMob(){
        let mob = new Zombie(this);
        let randx = 16 + 32 * randInt(0, this.mapoverlay.width / 32 );
        let randy = 16 + 32 * randInt(0, this.mapoverlay.height / 32 );
        mob.setPosition(new Point(randx,randy));
        this.mobs.push(mob);
    }
    addBuilderMob(){
        let mob = new Zombie(this, true);
        let randx = 16 + 32 * randInt(0, this.mapoverlay.width / 32 );
        let randy = 16 + 32 * randInt(0, this.mapoverlay.height / 32 );
        mob.setPosition(new Point(randx,randy));
        this.mobs.push(mob);
    }
	keydown(key){
		if(key.which) key = key.which;
        if(this.gamestate == 1){
            this.gamestate = 0;
            this.stage += 1;
            this.initGame();
            return;
        }
		if(key == KeyboardAndMouse.key.LEFT){
            if(this.player.center.x <= 16) return;
            this.player.move(DIRECTION.LEFT);
        }
        else if(key == KeyboardAndMouse.key.RIGHT){
            if(this.player.center.x >= this.mapoverlay.width - 16) return;
            this.player.move(DIRECTION.RIGHT);
        }
        else if(key == KeyboardAndMouse.key.UP){
            if(this.player.center.y <= 16) return;
            this.player.move(DIRECTION.UP);
        }
        else if(key == KeyboardAndMouse.key.DOWN){
            if(this.player.center.y >= this.mapoverlay.height - 16) return;
            this.player.move(DIRECTION.DOWN);
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
        else if(key == KeyboardAndMouse.key.ESCAPE || key == KeyboardAndMouse.key.BACKSPACE){
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
    drawStageCompleted(ctx){
        this.FontHandlerHeader.printLines([
			'STAGE ' + this.stage + '',
            'COMPLETED ',
            'SCORE ' + this.score,
		],ctx,5,80,true);
    }
}
class Level{
    constructor(game){
        this.game = game;
        this.levelProgress = 0;
        this.levelMap = this.getMap();
        this.playerLocation = new Point(0,0);
    }
    initLevel(){
        this.player = new Player(this.game);
        this.Objects = [];
        this.Mobs = [];
        this.Drops = [];
    }
    update(time){

    }
    draw(ctx){

    }
    getMap(){
        let grass = SpriteMaker.imageToCanvas(GLOBAL.Assets.images['grass.gif']);
        let dirt = SpriteMaker.imageToCanvas(GLOBAL.Assets.images['dirt.gif']);
        grass = SpriteMaker.magnify(grass,4);
        dirt = SpriteMaker.magnify(dirt,4);
        let sprites = [grass,dirt];
        let sw = grass.width;
        let sh = grass.height;
        let lw = 20;
        let lh = 80;
        let canvas2 = document.createElement('canvas');
        canvas2.width = lw * sw;
        canvas2.height = lh * sh;
        let ctx2 = canvas2.getContext('2d');
        ctx2.clearRect(0,0,canvas2.width,canvas2.height);
		ctx2.fillStyle = "#000";
		ctx2.fillRect(0,0,canvas2.width,canvas2.height);
        ctx2.globalAlpha = 0.3;
        let ofx = 0, ofy = 0;
        let m = Math.max(lw,lh);
        let n = Math.min(lw,lh);
        let sprite = null;
        for(let i = 0 ; i < m  ; i++){
            ofx = 0;
            for(let j = 0 ; j < n ;j++){
                if(((i % 2 ==0 || j %2 == 0) && !(i % 2 == 0 && j %2 == 0) )){
                    sprite = grass;
                }
                else{
                    sprite = dirt;
                }
                ctx2.drawImage(sprite,
                    ofx, 
                    ofy);
                ofx += sw;
            }
            ofy += sh;
        }
        return canvas2;
    }
}