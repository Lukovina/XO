import Sprite from '../helpers/Sprite.js';
import * as PIXI from 'pixi.js';
import {Game} from '../index';
import game_config from '../data/game_config';



export default class Cell extends Sprite {
    constructor(i, j) {
        super();
        this.i = i;
        this.j = j;
        this.symbol = null;
        this.create();
        this.resize();
        this.X = game_config.x;
        this.O = game_config.o;
    
        this.on("pointerdown", this.chose);
    }

    create() {
        let rect = new PIXI.Graphics()
        .beginFill(0xffffff, 1)
        .lineStyle(4, 0xFF3300, 1)
        .drawRect(0, 0, 200, 200)
        .endFill();

        this.texture = rect.generateCanvasTexture();

        this.xIcon = this.addChild(new Sprite(Game.app.loader.resources.x.texture));
        this.oIcon = this.addChild(new Sprite(Game.app.loader.resources.o.texture));

        this.xIcon.visible = false;
        this.oIcon.visible = false;
    }
    chose(){
        if(this.symbol) {
            return;
        }
        this.emit("step", {cell : this});
    }

    activate(symbol) {
        if(symbol === this.X) {
            this.xIcon.visible = true;
        } else {
            this.oIcon.visible = true;
        }
        this.symbol = symbol;
    }

    resize() {
       this.xIcon.scale.set(this.width*0.8 / this.xIcon.texture.width);
       this.oIcon.scale.set(this.width*0.8 / this.xIcon.texture.width);
    }
    

}