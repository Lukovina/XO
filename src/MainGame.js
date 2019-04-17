import Sprite from './helpers/Sprite.js';
import GameField from './ui/GameField.js';


export default class MainGame extends Sprite {
    constructor(){
        super();

        this._create();
    }

    _create() {


        this.gameField = this.addChild(new GameField());
    }

    _resize() {

    }

}
