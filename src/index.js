import Game from './helpers/Game.js';
import game_config from './data/game_config';
import MainGame from './ui/MainGame.js';
import FontFaceObserver from "fontfaceobserver";

let game;

window.addEventListener('load', () => {
    game = new Game(game_config);

    let textureLoad = new Promise((resolve) => {
        game.app.loader
            .add("line", 'assets/line.png')
            .add(game_config.o, 'assets/o.png')
            .load(resolve);
    });

    let fontsLoad = new Promise((resolve) => {
        new FontFaceObserver('Microgramma')
            .load().then(resolve, () => console.log('Font is not available'));
    });

    Promise.all([textureLoad, fontsLoad])
        .then(() => game._showWindow(new MainGame()))
});

export {game as Game};
