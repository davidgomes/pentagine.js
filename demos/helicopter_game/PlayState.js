/* Import only the necessary modules from the library */
import {Game, Sprite, State} from "../../build/pentagine.js";

/* Define the game state for the state machine */
class PlayState extends State {
    constructor(game) {
        super(game);

        this.mySprite = new Sprite({
            x: 70,
            y: 150,
            context: game.context,
            source: "helicopter.png"
        });
    }

    setup() {
        this.circleX = 90;
        this.circleY = 50;
        this.circleSpeed = 5;
    }

    update() {
        if (this.game.input.isDown('left')) {
            this.circleX -= this.circleSpeed;
        }

        if (this.game.input.isDown('right')) {
            this.circleX += this.circleSpeed;
        }

        if (this.game.input.isDown('up')) {
            this.circleY -= this.circleSpeed;
        }

        if (this.game.input.isDown('down')) {
            this.circleY += this.circleSpeed;
        }
    }

    draw() {
        this.game.clearCanvas();

        this.game.drawCircle(this.circleX, this.circleY, 40, 'red');
        this.mySprite.draw();
    }
}

class MyGame extends Game {
    constructor(state) {
        super(state);

        this.playState = new PlayState(this);
    }


}

/* Fire up the game */
var myGame = new Game({
    desiredFPS: 60,
    preventedKeys: ['down', 'right', 'left', 'up', 'space'],
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
});

var playState = new PlayState(myGame);
myGame.init(playState);
