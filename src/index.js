import Game from './helpers/Game.js';
import game_config from './data/game_config';
import MainGame from './MainGame.js';


window.addEventListener('load', () => {
    const game = new Game(game_config);

    game.app.loader.add('skull', 'assets/skull.png').load(() => {
    game._showWindow(new MainGame());
})
});