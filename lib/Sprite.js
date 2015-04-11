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