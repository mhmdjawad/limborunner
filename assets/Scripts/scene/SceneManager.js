
import LoadingScene 	from './LoadingScene.js';
import MainMenuScene 	from './MainMenuScene.js';
import GameScene 	from './GameScene.js';

export default class SceneManager{
    constructor(eventManager,main) {
		this._main = main;
		this.eventManager = eventManager;
		this.scene = null;
	}
    update(time) {
		// console.log("SceneManager update");
		if(this.scene != null){
			this.scene.update(time);
		}
		else{
			this._main.Timer.stop();
		}
	}
	draw(ctx) {
		if(this.scene != null){
			this.scene.draw(ctx);
		}
		else{
			this._main.Timer.stop();
		}
	}
	toLoadingScene() {
		this.eventManager.removeAllSubscribers();
		this.scene = new LoadingScene(this);
	}
	toMainMenuScene() {
		this.eventManager.removeAllSubscribers();
		this.scene = new MainMenuScene(this);
	}
	toGame() {
		this.eventManager.removeAllSubscribers();
		this.scene = new GameScene(this);
	}
}