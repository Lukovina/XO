import Sprite from '../helpers/Sprite.js';

export default class Cell extends Sprite {
    constructor(i, j) {
        super();
        this.i = i;
        this.j = j;

        this.create()
    }

    create() {
        this.skull = this.addChild(new Sprite('assets/skull.png'));
        this.skull.width = 200;
        this.skull.scale.y = this.skull.scale.x;

  


        
        // this.skull.x = this.skull.width * this.j + this.skull.width / 2;
        // this.skull.y = (this.skull.height * this.j + this.skull.height / 2)
    }
    

}