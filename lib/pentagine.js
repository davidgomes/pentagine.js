export class Sprite {
    constructor(settings) {
        this.x = settings.x;
        this.y = settings.y;
        this.path = settings.source;

        this.image = new Image();
        this.image.src = settings.source;

        this.context = settings.context;
    }

    draw() {
        this.context.drawImage(this.image, this.x, this.y);
    }
}

export class State {
    constructor(game) {
        this.game = game;
    }
}

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

        this.keyCodeToString = [];
        this.pressedKeys = [];
        this.populateKeyCodeToString();

        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    init(firstState) {
        this.switchState(firstState);
        this.lastUpdate = Date.now();

        this.tick();
    }

    tick() {
        var game = this;

        function draw() {
            setTimeout(function () {
                requestAnimationFrame(draw);

                var currentTime = Date.now();
                var dt = currentTime - game.lastUpdate;
                game.lastUpdate = currentTime;
                game.currentState.dt = dt * 0.001;

                game.currentState.update();
                game.currentState.draw();
            }, 1000 / game.desiredFPS);
        }

        draw();
    }

    switchState(newState) {
        this.currentState = newState;

        newState.setup();
    }

    populateKeyCodeToString() {
        this.keyCodeToString[8] = 'backspace';
        this.keyCodeToString[9] = 'tab';
        this.keyCodeToString[13] = 'return';
        this.keyCodeToString[16] = 'shift';
        this.keyCodeToString[17] = 'ctrl';
        this.keyCodeToString[18] = 'alt';
        this.keyCodeToString[19] = 'pause';
        this.keyCodeToString[20] = 'capslock';
        this.keyCodeToString[27] = 'escape';
        this.keyCodeToString[32] = 'space';
        this.keyCodeToString[33] = 'pageup';
        this.keyCodeToString[34] = 'pagedown';
        this.keyCodeToString[35] = 'end';
        this.keyCodeToString[36] = 'home';
        this.keyCodeToString[37] = 'left';
        this.keyCodeToString[38] = 'up';
        this.keyCodeToString[39] = 'right';
        this.keyCodeToString[40] = 'down';
        this.keyCodeToString[45] = 'insert';
        this.keyCodeToString[46] = 'delete';

        this.keyCodeToString[91] = 'leftwindowkey';
        this.keyCodeToString[92] = 'rightwindowkey';
        this.keyCodeToString[93] = 'selectkey';
        this.keyCodeToString[106] = 'multiply';
        this.keyCodeToString[107] = 'add';
        this.keyCodeToString[109] = 'subtract';
        this.keyCodeToString[110] = 'decimalpoint';
        this.keyCodeToString[111] = 'divide';

        this.keyCodeToString[144] = 'numlock';
        this.keyCodeToString[145] = 'scrollock';
        this.keyCodeToString[186] = 'semicolon';
        this.keyCodeToString[187] = 'equalsign';
        this.keyCodeToString[188] = 'comma';
        this.keyCodeToString[189] = 'dash';
        this.keyCodeToString[190] = 'period';
        this.keyCodeToString[191] = 'forwardslash';
        this.keyCodeToString[192] = 'graveaccent';
        this.keyCodeToString[219] = 'openbracket';
        this.keyCodeToString[220] = 'backslash';
        this.keyCodeToString[221] = 'closebracket';
        this.keyCodeToString[222] = 'singlequote';

        var numpadKeys = ['numpad1', 'numpad2', 'numpad3', 'numpad4', 'numpad5',
            'numpad6', 'numpad7', 'numpad8', 'numpad9'];

        var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
            'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y', 'z'];

        for (var number = 0; numbers[number]; number++) {
            this.keyCodeToString[48 + number] = numbers[number];
        }
        for (var letter = 0; letters[letter]; letter++) {
            this.keyCodeToString[65 + letter] = letters[letter];
        }
        for (var numpadKey = 0; numpadKeys[numpadKey]; numpadKey++) {
            this.keyCodeToString[96 + numpadKey] = numpadKeys[numpadKey];
        }
    }

    handleKeyDown(e) {
        var event = (e) ? e : window.event;
        var name = this.keyCodeToString[event.keyCode];
        this.pressedKeys[name] = true;

        if (this.preventedKeys.indexOf(name) != -1) {
            e.preventDefault();
        }
    }

    handleKeyUp(e) {
        var event = (e) ? e : window.event;
        var name = this.keyCodeToString[event.keyCode];
        this.pressedKeys[name] = false;

        if (this.preventedKeys.indexOf(name) > -1) {
            e.preventDefault();
        }
    }

    isDown(name) {
        return this.pressedKeys[name];
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
