export class Game {
    constructor(settings) {
        this.canvas = document.getElementById('canvas');

        if (settings.desiredFPS) {
            this.desiredFPS = settings.desiredFPS;
        } else {
            this.desiredFPS = null;
        }

        if (settings.preventedKeys) {
            this.preventedKeys = settings.preventedKeys;
        } else {
            this.preventedKeys = [];
        }

        if (typeof this.canvas !== 'undefined') {
            this.canvas.width = settings.width;
            this.canvas.height = settings.height;

            this.context = this.canvas.getContext('2d');

            this.context.width = settings.width;
            this.context.height = settings.height;
        }

        this.input = new Input(this.preventedKeys);
    }

    init(firstState) {
        this.switchState(firstState);
        this.lastUpdate = Date.now();

        this.tick();
    }

    tick() {
        var game = this;

        function draw() {
            var interval;
            if (game.desiredFPS == null) {
                interval = 0;
            } else {
                interval = 1000 / game.desiredFPS;
            }

            setTimeout(function () {
                requestAnimationFrame(draw);

                var currentTime = Date.now();
                var dt = currentTime - game.lastUpdate;
                game.lastUpdate = currentTime;
                game.currentState.dt = dt * 0.001;

                game.currentState.update();
                game.currentState.draw();
            }, interval);
        }

        draw();
    }

    switchState(newState) {
        this.currentState = newState;
        this.currentState.input = this.input;

        newState.setup();
    }

    drawCircle(x, y, radius, color) {
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, Math.PI * 2, false);
        this.context.fill();
    }

    clearCanvas(backgroundColor) {
        this.context.clearRect(0, 0, this.context.width, this.context.height);

        if (backgroundColor) {
            this.drawRectangle(0, 0, this.context.width, this.context.height, backgroundColor);
        }
    }
}
