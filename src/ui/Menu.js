import Sprite from '../helpers/Sprite.js';
import * as PIXI from 'pixi.js';
import config from '../data/game_config.js';

export default class Menu extends Sprite {
    constructor() {
        super();
        this.createChildren();
        this.showMainMenu()
    }

    createChildren() {

        this.mainMenu = this.addChild(new Sprite());
        this.player = this.createButton({parent: this.mainMenu, text: "1 player", cb: () => console.log('1 player  button')})
        this.players = this.createButton({parent: this.mainMenu, text: "2 players", cb: () => console.log('2 players button')})
        this.settings = this.createButton({parent: this.mainMenu, text: "settings", cb: () => console.log('settings button')})
    }

    createButton(obj) {
        let button = obj.parent.addChild(new Sprite(""));
        button.addChild(new PIXI.Text(obj.text, config.mainTextStyle));
        button.on("pointerdown", obj.cb,this);
        return button;
    }
    showMainMenu() {

    }

    resize() {
        this.x = -this.getBounds().width / 2;
        this.player.y = -100;
        this.players.y = 0;
        this.settings.y = 100;
    }


}