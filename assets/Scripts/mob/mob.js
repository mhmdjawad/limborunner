import { throws } from 'assert';
import Point from '../module/Point.js';
export default class Mob{
    constructor(game){
        this.game = game;
        this.location = new Point(0,0);

    }
    update(time){
        if(!isPaused()){
            if(this.destination.length > 0){
                this.location = this.destination[0];
                delete(this.destination[0]);
            }
        }
    }
    moveTo(point){
        let enitityExist = this.game.haveEntityAt(point);
        if(!enitityExist){
            this.destination.push(point);
        }
    }
}