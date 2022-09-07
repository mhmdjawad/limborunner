import Point from "../module/Point.js";

export default class Brick{
    constructor(game,location = null){
        this.game = game;
        this.sprite = Brick.getSprite(4);
        this.life = 1;
        if(location == null){
            let w = window.game.canvas.width / this.sprite.width;
            let h = window.game.canvas.height / this.sprite.height;
            this.x = randInt(0,w) * this.sprite.width - this.sprite.width / 2;
            this.y = randInt(0,h) * this.sprite.height - this.sprite.width / 2;
        }
        else{
            this.x = location.x ;
            this.y = location.y;
        }
        this.center = new Point(this.x,this.y);
    }
    draw(ctx){
        ctx.drawImage(this.sprite,
            this.x - this.sprite.width / 2, 
            this.y - this.sprite.width / 2
        );
    }
    static getSprite(m=1){
        const sprite  = SpriteMaker.imageToCanvas(GLOBAL.Assets.images['bricks.gif']);
        let c = document.createElement('canvas');
        c.width = sprite.width * m;
        c.height = sprite.height * m;
        let cx = c.getContext('2d');
        for(let i = 0 ; i < m ; i++){
            for(let j = 0 ; j < m ; j++){
                cx.drawImage(sprite,i*sprite.width,j *sprite.height);
            }
        }
        return c;
    }
}