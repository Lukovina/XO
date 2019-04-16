export default class Resizer {
    constructor(application) {
        this._controlledObject = application;
        this._landscape = 1;
        this._portrait = 2;
        this._width = 0;
        this._height = 0;
        this._gameWidth = 0;
        this._gameHeight = 0;
        this._scale = 1;
    }

    resize() {
        console.log(this._controlledObject);

        let w = window.innerWidth,
            h = window.innerHeight;

        if (this._width === w && this._height === h) return;

        document.body.style.width = w + "px";
        document.body.style.height = h + "px";

        this._width = w;
        this._height = h;
        this._orientation = w > h ? this._landscape : this._portrait;

        let gw, gh;

        if (this._orientation === this._landscape) {
            gh = this._controlledObject.size.w;
            gw = Math.floor(gh * (w / h));

            if (gw < this._controlledObject.size.h) {
                gw = this._controlledObject.size.h;
                gh = Math.floor(this._controlledObject.size.h * (h / w));
            }
        }
        else {
            console.log(this._controlledObject)
            gh = this._controlledObject.size.h;
            gw = Math.floor(gh * (w / h));

            if (gw < this._controlledObject.size.w) {
                gw = this._controlledObject.size.w;
                gh = Math.floor(this._controlledObject.size.w * (h / w));
            }
        }

        this._controlledObject.renderer.resize(gw, gh);

        this._controlledObject.view.style.width = w + "px";
        this._controlledObject.view.style.height = h + "px";

        this._gameWidth = gw;
        this._gameHeight = gh;

        this._scale = Math.min(w / gw, h / gh);

        if (this._controlledObject.stage && this._controlledObject.stage.resize) {
            this._controlledObject.stage.resize();
        }
    }
}