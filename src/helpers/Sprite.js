import * as PIXI from "pixi.js";

export default class Sprite extends PIXI.Sprite {
  constructor(textureName) {
    super();

    if (typeof textureName === "string") {
      this.texture = PIXI.Texture.fromImage(textureName);
    } else if (textureName instanceof PIXI.Texture) {
      this.texture = textureName;
    }
    
    this.interactive = true;
    this.anchor.set(0.5);
  }
}
