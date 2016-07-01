class Animation {
  options; // .frames, .frameDuration, .x, .y
  currentTick;
  lastTick;
  diffTick;
  curFrame;
  sprites;

  constructor(options) {
    this.options = options;

    _.each(this.options.frames, (el, index) => {
      this.sprites.push(new Pentagine.Sprite(penta, el, this.options.x, this.options.y));
    });
    
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
