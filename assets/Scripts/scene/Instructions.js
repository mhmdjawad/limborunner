import PixelFont from '../handler/PixelFont.js';
import KeyboardAndMouse from '../handler/KeyboardAndMouse.js';
export default class Instructions{
    constructor(sceneManager){
        this.sceneManager = sceneManager;
        this.FontHandler = new PixelFont(16,'#ffffff');
        this.sceneManager.eventManager.addSubscriber(this,[
			KeyboardAndMouse.Event.TOUCH,
			KeyboardAndMouse.Event.CLICK,
			KeyboardAndMouse.Event.MOUSEDOWN,
			KeyboardAndMouse.Event.KEYDOWN
		]);
    }
    update(time) {

    }
    notify(e){
        this.sceneManager.toMainMenuScene();
	}
    draw(ctx) {
		ctx.clearRect(0,0,GLOBAL.CANVAS_WIDTH,GLOBAL.CANVAS_HEIGHT);
		ctx.fillStyle = "#000";
		ctx.fillRect(0,0,GLOBAL.CANVAS_WIDTH,GLOBAL.CANVAS_HEIGHT);
        this.FontHandler.printLines([
			'Instructions'
		],ctx,150,80,false);
        let list = this.getLeaderBoardList();
        let ofy = 150;
        for(let i in list){
            this.FontHandler.printLines([
                list[i].name.toUpperCase() + '  ' + list[i].def
            ],ctx,150,ofy,false);
            ofy += 22;
        }

        this.FontHandler.printLines([
			'SPRINT THROUGH LIMBO',
            'THE RELAM OF THE DEAD',
            'SURVIVE TO REACH OTHER SIDE',
            'TILL YOU REACH HOME',
            '',
            '',
            'GOOD LUCK',
		],ctx,0,ofy+50,true);
	}
    getLeaderBoardList(){
        let list = [
            {
                'name'  : 'ARROWS',
                'def'   : 'MOVEMENT'
            },
            {
                'name'  : 'SPACE ',
                'def'   : 'FIRE WEAPON'
            },
            {
                'name'  : 'B     ',
                'def'   : 'BUILD WALL'
            },
            {
                'name'  : 'ESC   ',
                'def'   : 'MAIN SCREEN'
            },
            {
                'name'  : 'ENTER ',
                'def'   : 'PAUSE GAME'
            }
        ];
        return list;
    }
}