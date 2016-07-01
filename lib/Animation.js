class Animation {
  options; // .frames, .frameDuration, .x, .y, .game
  currentTick;
  lastTick;
  diffTick;
  curFrame;
  x;
  y;
  sprite;

  constructor(options) {
    this.options = options;

    this.sprite = new Pentagine.Sprite(options.game,
                                       options.frames[0],
                                       options.x,
                                       options.y);

    this.currentTick = (new Date()).getTime();
    this.lastTick = this.currentTick;
    this.diffTick = 0;
    this.curFrame = 0;
  }

  update() {
    this.currentTick = (new Date()).getTime();
    this.diffTick += (this.currentTick - this.lastTick);

    if (this.diffTick > this.options.frameDuration) {
      this.curFrame = this.curFrame == options.frames.length - 1 ? 0 : this.curFrame + 1;

      this.sprite = new Pentagine.Sprite(this.options.game, this.options.frames[this.curFrame], this.x, this.y);

      this.diffTick = 0;
    }

    this.lastTick = this.currentTick;
  }

  draw() {

  }
}

module.exports = Animation;
