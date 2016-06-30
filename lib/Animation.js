class Animation {
  options;
  currentTick;
  lastTick;
  diffTick;
  curFrame;

  constructor(options) {
    this.options = options;

    this.currentTick = (new Date()).getTime();
    this.lastTick = this.currentTick;
    this.diffTick = 0;
  }

  update() {
    this.currentTick = (new Date()).getTime();
    this.diffTick += (this.currentTick - this.lastTick);

    if (this.diffTick > this.options.frameDuration) {
      this.curFrame = this.curFrame == options.frames.length - 1 ? 0 : this.curFrame + 1;
      this.diffTick = 0;
    }

    this.lastTick = this.currentTick;
  }

  draw() {

  }
}

module.exports = Animation;