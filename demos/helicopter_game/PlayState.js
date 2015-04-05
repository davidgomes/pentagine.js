/* Import only the necessary modules from the library */
import {Game, Sprite, State} from "../../build/pentagine.js";

/* Define the game state for the state machine */
class PlayState extends State {
    constructor(game) {
        super(game);
    }

    setup() {
        this.circleX = 90;
        this.circleY = 50;
    }

    update() {
        this.circleX += 1;
    }

    draw() {
        this.game.clearCanvas();

        this.game.drawCircle(this.circleX, this.circleY, 40, 'red');
    }
}

/* The MyGame class that inherits pentagine's Game class */
class MyGame extends Game {
    constructor(settings) {
        super(settings);
    }
}

/* Fire up the game */
var myGame = new MyGame({
    desiredFPS: 60,
    preventedKeys: ['down', 'right', 'left', 'up', 'space'],
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
});

myGame.init(new PlayState(myGame));
