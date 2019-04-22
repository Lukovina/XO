import Sprite from '../helpers/Sprite.js';
import GameField from './GameField.js';
import Menu from "./Menu";

export default class MainGame extends Sprite {
    constructor() {
        super();
        this.create();
    }

    create() {
        this.menu = this.addChild(new Menu());
        this.gameField = this.addChild(new GameField());
    }

    resize() {
        this.gameField.resize();
        this.menu.resize();
    }
}
