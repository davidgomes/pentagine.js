class Animation {
  options; // .frames, .frameDuration, .x, .y, .game
  currentTick;
  lastTick;
  diffTick;
  curFrame;
  sprite;
  sprites;
  x;
  y;

  constructor(options) {
    this.options = options;

    this.sprite = new Pentagine.Sprite(options.game,
                                       options.frames[0],
                                       options.x,
                                       options.y);

    this.sprites = [];

    _.each(this.options.frames, ((el, index) => {
      this.sprites.push(new Pentagine.Sprite(this.options.game, el, this.options.x, this.options.y));
    }).bind(this));

    this.x = options.x;
    this.y = options.y;

    this.frameDuration = options.frameDuration;
    this.currentTick = (new Date()).getTime();
    this.lastTick = this.currentTick;
    this.diffTick = 0;
    this.curFrame = 0;
  }

  update() {
    this.currentTick = (new Date()).getTime();
    this.diffTick += this.currentTick - this.lastTick;

    if (this.diffTick > this.options.frameDuration) {
      this.curFrame = this.curFrame == this.options.frames.length - 1 ? 0 : this.curFrame + 1;

      let x = this.sprite.x;
      let y = this.sprite.y;

      this.sprite = this.sprites[this.curFrame];
      this.sprite.x = x;
      this.sprite.y = y;

      this.diffTick = 0;
    }

    this.lastTick = this.currentTick;
  }

  set x(value) {
    this.sprite.x = value;
  }

  set y(value) {
    this.sprite.y = value;
  }

  get x() {
    return this.sprite.x;
  }

  get y() {
    return this.sprite.y;
  }

  draw() {
    this.sprite.draw();
  }
}

module.exports = Animation;
