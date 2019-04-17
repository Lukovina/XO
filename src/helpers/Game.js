import * as PIXI from 'pixi.js';
import Resizer from "./Resizer";

export default class Game extends PIXI.utils.EventEmitter {
    constructor(props) {
        super(props);
        this._init(props);
    }
    _init(props) {

        this.app = new PIXI.Application(props);
        this.app.size = {
            w: props.width,
            h: props.height
        };
        document.getElementById("game").appendChild(this.app.view)
    }

    _showWindow(w) {
            if(this.currentWindow) {
                    this.app.stage.removeChild(this.currentWindow);
                }
               
            this.app.stage.addChild(w);
            this.currentWindow = w;
            this.resizer = new Resizer(this);
            this.resizer.resize();
            window.addEventListener('resize', this.resizer.resize.bind(this.resizer));

        }

}