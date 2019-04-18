import Sprite from '../helpers/Sprite.js';
import Cell from './Cell.js';
import {Game} from '../index';
import game_config from '../data/game_config';
import {botGetRandomCell} from './Bot';
import * as TWEEN from 'es6-tween'
TWEEN.autoPlay(true); 



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

        let horisontalLine1 = this.addChild(this.addLine(this.cellWidth * this.matrix.length,0, 300)),
            horisontalLine2 = this.addChild(this.addLine(this.cellWidth * this.matrix.length, 0, 450)),
            verticalLine1 = this.addChild(this.addLine(this.cellWidth * this.matrix.length, Math.PI/2)),
            verticalLine2 = this.addChild(this.addLine(this.cellWidth * this.matrix.length,Math.PI/2,150));

            horisontalLine1.position.set(- this.getBounds().width/2, - this.cellWidth/2)
            horisontalLine2.position.set(- this.getBounds().width/2,   this.cellWidth/2)
            verticalLine1.position.set(- this.cellWidth/2, - this.getBounds().height/2)
            verticalLine2.position.set( this.cellWidth/2, - this.getBounds().height/2)
    }

    get cellWidth() {
        return 200
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

    finish(obj) {
        this.cross(obj)
    }

    cross(obj) {

        let startPoint = new PIXI.Point(obj.start.x, obj.start.y),
            endPoint = new PIXI.Point(obj.end.x, obj.end.y),
            angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x),
            distance = Math.sqrt( Math.pow((startPoint.x-endPoint.x), 2) + Math.pow((startPoint.y-endPoint.y), 2) )*1.4,
            delay = 200;



        this.crossLine = this.addChild(this.addLine(distance, angle, delay));

     

        if(startPoint.y === endPoint.y){this.crossLine.position.set(startPoint.x - distance*0.14, startPoint.y)}
    }

    addLine(distance, angle, delay = 0) {
        let line,
            rect = new PIXI.Graphics()
        .beginFill(game_config.mainColor, 1)
        .drawRoundedRect(0, 0, distance, game_config.crossLineHeight, 14)
        .endFill();

        line = new Sprite(rect.generateCanvasTexture())
        line.width = 0;
        line.rotation = angle;
        line.anchor.set(0, 0.5);
        
        new TWEEN.Tween(line)
            .to({width: distance}, 300)
            .delay(delay)
            .start();

        return line
    }

     resize() {
        let w = Game.width,
            h = Game.height,
            k = w>h ? w/h : h/w;
            this.scale.set(0.6 * k);

    }  
}
