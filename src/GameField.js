import Sprite from './helpers/Sprite.js';


export default class GameField extends Sprite {
    constructor(){
        super();

        this._create();

    }

    _create() {
        this.skull = this.addChild(new Sprite('assets/skull.png'));
        this.skull.width = 200;
        this.skull.scale.y = this.skull.scale.x;
    }

}
