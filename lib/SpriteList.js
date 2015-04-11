export class SpriteList {
    constructor(settings) {
        this.sprites = [];

        this.context = settings.context;
    }

    insert(sprite) {
        this.sprites.push(sprite);
    }

    remove(sprite) {
        var index = this.sprites.indexOf(sprite);
        this.sprites.splice(index, 1);
    }

    getLength() {
        return this.sprites.length;
    }

    draw() {
        _.each(this.sprites, function (element) {
            if (element) {
                element.draw();
            }
        });
    }
}