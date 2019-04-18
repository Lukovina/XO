import Sprite from '../helpers/Sprite.js';
import GameField from './GameField.js';


export default class MainGame extends Sprite {
    constructor(){
        super();

        this.create();
    }

    create() {


        this.gameField = this.addChild(new GameField());
    }

    resize() {
        this.gameField.resize();
    }

}
