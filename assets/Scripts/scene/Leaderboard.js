import PixelFont from '../handler/PixelFont.js';
import KeyboardAndMouse from '../handler/KeyboardAndMouse.js';
export default class Leaderboard{
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
			'LEADERBOARD'
		],ctx,150,80,false);
        let list = this.getLeaderBoardList();
        let ofy = 150;
        for(let i in list){
            this.FontHandler.printLines([
                list[i].name.substring(0,3).toUpperCase() + '  ' + list[i].score
            ],ctx,150,ofy,false);
            ofy += 22;
        }
	}
    getLeaderBoardList(){
        let list = [
            {
                'name' : 'PL1',
                'score' : '1000'
            },
            {
                'name' : 'PL2',
                'score' : '900'
            }
        ];
        return list;
    }
}