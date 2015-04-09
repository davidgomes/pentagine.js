/**
 * The Input class that handles all input in Game.js
 */
export class Input {
    constructor(preventedKeys) {
        this.keyCodeToString = this.populateKeyCodeToString();
        this.pressedKeys = [];
        this.preventedKeys = preventedKeys;

        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    populateKeyCodeToString() {
        var keyCodeToString = [];

        keyCodeToString[8] = 'backspace';
        keyCodeToString[9] = 'tab';
        keyCodeToString[13] = 'return';
        keyCodeToString[16] = 'shift';
        keyCodeToString[17] = 'ctrl';
        keyCodeToString[18] = 'alt';
        keyCodeToString[19] = 'pause';
        keyCodeToString[20] = 'capslock';
        keyCodeToString[27] = 'escape';
        keyCodeToString[32] = 'space';
        keyCodeToString[33] = 'pageup';
        keyCodeToString[34] = 'pagedown';
        keyCodeToString[35] = 'end';
        keyCodeToString[36] = 'home';
        keyCodeToString[37] = 'left';
        keyCodeToString[38] = 'up';
        keyCodeToString[39] = 'right';
        keyCodeToString[40] = 'down';
        keyCodeToString[45] = 'insert';
        keyCodeToString[46] = 'delete';

        keyCodeToString[91] = 'leftwindowkey';
        keyCodeToString[92] = 'rightwindowkey';
        keyCodeToString[93] = 'selectkey';
        keyCodeToString[106] = 'multiply';
        keyCodeToString[107] = 'add';
        keyCodeToString[109] = 'subtract';
        keyCodeToString[110] = 'decimalpoint';
        keyCodeToString[111] = 'divide';

        keyCodeToString[144] = 'numlock';
        keyCodeToString[145] = 'scrollock';
        keyCodeToString[186] = 'semicolon';
        keyCodeToString[187] = 'equalsign';
        keyCodeToString[188] = 'comma';
        keyCodeToString[189] = 'dash';
        keyCodeToString[190] = 'period';
        keyCodeToString[191] = 'forwardslash';
        keyCodeToString[192] = 'graveaccent';
        keyCodeToString[219] = 'openbracket';
        keyCodeToString[220] = 'backslash';
        keyCodeToString[221] = 'closebracket';
        keyCodeToString[222] = 'singlequote';

        var numpadKeys = ['numpad1', 'numpad2', 'numpad3', 'numpad4', 'numpad5',
            'numpad6', 'numpad7', 'numpad8', 'numpad9'];

        var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
            'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y', 'z'];

        for (var number = 0; numbers[number]; number++) {
            keyCodeToString[48 + number] = numbers[number];
        }

        for (var letter = 0; letters[letter]; letter++) {
            keyCodeToString[65 + letter] = letters[letter];
        }

        for (var numpadKey = 0; numpadKeys[numpadKey]; numpadKey++) {
            keyCodeToString[96 + numpadKey] = numpadKeys[numpadKey];
        }

        return keyCodeToString;
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
}