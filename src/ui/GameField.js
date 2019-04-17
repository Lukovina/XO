import Sprite from '../helpers/Sprite.js';
import Cell from './Cell.js';



export default class GameField extends Sprite {
    constructor(){
        super();
        this.matrix = [];
        this._create();

    }

    _create() {
        for(let i = 0 ; i < 3; i++) {
            this.matrix[i] = [];
            for(let j = 0; j < 3; j++) {
                this.matrix[i][j] = this.addChild(new Cell(i, j));

                // this.matrix[i][j].x = this.matrix[i][j].width * this.i - (this.matrix[i][j].width * this.matrix.length)/2;
                // this.matrix[i][j].y = this.skull.height*this.j;
            }
        }
    }

    _resize() {


    }

}
