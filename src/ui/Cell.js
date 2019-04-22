import Sprite from '../helpers/Sprite.js';
import * as PIXI from 'pixi.js';
import {Game} from '../index';
import game_config from '../data/game_config';
import * as TWEEN from 'es6-tween';

TWEEN.autoPlay(true);


export default class Cell extends Sprite {
    constructor(i, j) {
        super();
        this.i = i;
        this.j = j;
        this.symbol = null;
        this.create();
        this.X = game_config.x;
        this.O = game_config.o;
        this.on("pointerdown", this.chose, this);
    }

    create() {
        let rect = new PIXI.Graphics()
            .drawRoundedRect(0, 0, 200, 200, 10)
            .endFill();

        this.texture = rect.generateCanvasTexture();
        this.icon = this.addChild(new Sprite());

    }

    chose() {
        if (this.symbol) {
            console.log(this.i, this.j)
            return;
        }
        this.emit("step", {cell: this});
    }

    activate(symbol) {


        if (symbol === this.X) {
            this.xIconAppear();
            this.icon.scale.set(this.width * 0.7 / 200);

        } else {
            this.icon.texture = Game.app.loader.resources[this.O].texture;
            this.icon.mask = this.addChild(new PIXI.Graphics());
            this.icon.mask.rotation = Math.PI * 1.25;
            this.icon.scale.set(this.width * 0.7 / this.icon.texture.width);

            new TWEEN.Tween({angle: 0})
                .to({angle: 2 * Math.PI}, 300)
                .on("update", obj => {
                    mask.clear()
                        .beginFill(0xff0000)
                        .moveTo(0, 0)
                        .arc(0, 0, this.width / 2, 0, obj.angle)
                        .endFill();
                })
                .start();
        }

        this.symbol = symbol;

        let mask = this.icon.mask;


    }

    xIconAppear() {
        this.icon.leftLine = this.icon.addChild(new Sprite(Game.app.loader.resources["line"].texture))
        this.icon.rightLine = this.icon.addChild(new Sprite(Game.app.loader.resources["line"].texture));

        this.icon.leftLine.rotation = Math.PI / 4;
        this.icon.rightLine.rotation = -Math.PI / 4;

        this.icon.leftLine.width = 0;
        this.icon.rightLine.width = 0;

        new TWEEN.Tween(this.icon.rightLine)
            .delay(200)
            .to({width: this.icon.rightLine.texture.width}, 300)
            .start();

        new TWEEN.Tween(this.icon.leftLine)
            .to({width: this.icon.leftLine.texture.width}, 200)
            .start();

    }

}