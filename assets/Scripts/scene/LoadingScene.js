import AssetsManager from '../module/AssetsManager.js';
export default class LoadingScene{
    constructor(sceneManager) {
		this._sceneManager = sceneManager;
		this._loadingProgress = 0;
	}
	update() {
		this._loadingProgress = AssetsManager.getLoadStatus();
		if (this._loadingProgress > 99) {
			this._sceneManager.toMainMenuScene(false);
		}
	}
	draw(ctx) {
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.fillStyle = "#ffffff";
		ctx.fillText("LOADING " + ("" + this._loadingProgress).padStart(3, ' ') + "%", 
		ctx.canvas.width / 2, ctx.canvas.height / 2
		);
	}
}