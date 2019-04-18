import Sprite from '../helpers/Sprite.js';
import Cell from './Cell.js';
import {Game} from '../index';
import game_config from '../data/game_config';
import {botGetRandomCell} from './Bot';


export default class GameField extends Sprite {
    constructor(symbolsForWin=3){
        super();
        this.matrix = new Array(3);
        this.create();
        this.createEvents();
        this.steps = 1;
        this.X = game_config.x;
        this.O = game_config.o;
        this.currentSymbol = null;
        this.symbolsForWin = symbolsForWin;
    }

    create() {
        for(let i = 0 ; i < 3; i++) {
            this.matrix[i] = [];
            for(let j = 0; j < 3; j++) {
                this.matrix[i][j] = this.addChild(new Cell(i, j));
                let cell = this.matrix[i][j];
                cell.x = cell.width * j + cell.width/2 - (this.matrix.length * cell.width)/2;
                cell.y = cell.height * i + cell.height/2 - (this.matrix.length * cell.height)/2;
            }
        }
    }

    createEvents() {
        for(let innerArray of this.matrix) {
            for(let cell of innerArray) {
                cell.on("step", this.step, this);
            }
        }
    }

    step(data) {
    
        this.currentSymbol = this.steps % 2 === 0 ? this.O:this.X;

        data.cell.activate(this.currentSymbol);
        
        this.stepsIterate();
        if(this.steps >= (this.symbolsForWin * 2)) {
           let res = this.checkResult();
           if(res) {
               this.finish(res)
            }
        }
    }

    stepsIterate() {
        this.steps++;
    }

    checkResult() {
        let result = false;
        let symbolsArray = this.matrix.map(row=>row.map(cell=>cell.symbol));

        let horisontalCheck = (array)=> {
                let res = array.map(row=>row.every((symbol)=> symbol === this.currentSymbol));
                for(let row in res) {
                    if(res[row]) {
                        result  = {start:this.matrix[row][0], end:this.matrix[row][this.matrix[row].length-1]}
                        return result;
                    }
                };
        }

        horisontalCheck(symbolsArray);
        return result;
    }

    finish() {
        
    }

     resize() {
        let w = Game.width,
            h = Game.height,
            k = w>h ? w/h : h/w;
            this.scale.set(0.55* k);

    }  
}
