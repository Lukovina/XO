import * as PIXI from "pixi.js";

export default class Sprite extends PIXI.Sprite {
  constructor(textureName) {
    super();

    if (typeof textureName === "string") {
      this.texture = PIXI.Texture.fromFrame(textureName);
    } else if (textureName instanceof PIXI.Texture) {
      this.texture = textureName;
    }
    this.interactive = true;
    this.animationSpeed = 24/60;

    this.anchor.set(0.5);
  }

  // var tex = name ? PIXI.Texture.fromFrame(name) : PIXI.Texture.EMPTY;
  // PIXI.extras.AnimatedSprite.call(this, [tex]);

  // this.animationSpeed = 24/60;

  // this.anchor.set(0.5);

  // this.stop();
}
