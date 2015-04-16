import {Game, Sprite, State, SpriteList} from "../../build/pentagine.js";

class PlayState extends State {
    constructor(game) {
        super(game);

        this.circleList = new SpriteList();

        for (var i = 0; i < 5; i++) {
            this.circleList.insert(new Sprite({
                    x: 50 + 120 * i,
                    y: 90,
                    source: 'helicopter.png',
                    context: game.context
                })
            );
        }
    }

    setup() { }

    update() {
        if (this.game.input.isDown('down')) {
            _.map(this.circleList.sprites, function (element) {
                element.y += 5;
            });
        }

        if (this.game.input.isDown('up')) {
            _.map(this.circleList.sprites, function (element) {
                element.y -= 5;
            });
        }
    }

    draw() {
        this.game.clearCanvas();

        this.circleList.draw();
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
