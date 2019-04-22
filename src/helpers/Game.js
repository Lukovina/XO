import * as PIXI from 'pixi.js';
import Resizer from "./Resizer";
import * as TWEEN from 'es6-tween'
TWEEN.autoPlay(true); 

export default class Game extends PIXI.utils.EventEmitter {
    constructor(props) {
        super(props);
        this._init(props);
    }
    _init(props) {

        this.app = new PIXI.Application(props);
        this.resizer = new Resizer(this);

        this.app.size = {
            w: props.width,
            h: props.height
        };

        document.body.appendChild(this.app.view)

    }

    _showWindow(w) {
            if(this.currentWindow) {
                    this.app.stage.removeChild(this.currentWindow);
                }
               
            this.app.stage.addChild(w);
            this.currentWindow = w;
            this.resizer.resize()

            window.addEventListener('resize', this.resizer.resize.bind(this.resizer));

        }
    get currentScene() {
        return this.app.renderer.stage;
    }

    get width() {
        return this.resizer._gameWidth;
    }

    get height() {
        return this.resizer._gameHeight;
    }

    get orientation() {
        return this.resizer._orientation;
    }


}