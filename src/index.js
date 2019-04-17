import Game from './helpers/Game.js';
import game_config from './data/game_config';
import MainGame from './MainGame.js';

let game

window.addEventListener('load', () => {
    game = new Game(game_config);
    game.app.loader.add('skull', 'assets/skull.png').load(() => {
    game._showWindow(new MainGame());

})

});

export {game as Game};
