import Sprite from 'Sprite';

class Animation {
  options; // .frames, .frameDuration, .x, .y, .game
  currentTick;
  lastTick;
  diffTick;
  curFrame;
  curSprite;
  sprites;
  x;
  y;
  bouncingDirection;

  constructor(options) {
    this.options = options;

    this.curSprite = new Sprite(options.game,
                                options.frames[0],
                                options.x,
                                options.y);

    this.sprites = [];

    _.each(this.options.frames, ((el, index) => {
      this.sprites.push(new Sprite(this.options.game, el, this.options.x, this.options.y));
    }).bind(this));

    if (options.bouncing) {
      this.bouncingDirection = 'up';
    }

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
      if (this.options.bouncing) {
        if (this.curFrame === this.options.frames.length - 1 && this.bouncingDirection === 'up') {
          this.bouncingDirection = 'down';
          this.curFrame--;
        } else if (this.curFrame === 0 && this.bouncingDirection === 'down') {
          this.bouncingDirection = 'up';
          this.curFrame++;
        } else {
          if (this.bouncingDirection === 'up') {
            this.curFrame++;
          } else {
            this.curFrame--;
          }
        }
      } else {
        if (this.curFrame === this.options.frames.length - 1) {
          this.curFrame = 0;
        } else {
          this.curFrame++;
        }
      }

      let x = this.curSprite.x;
      let y = this.curSprite.y;

      this.curSprite = this.sprites[this.curFrame];
      this.curSprite.x = x;
      this.curSprite.y = y;

      this.diffTick = 0;
    }

    this.lastTick = this.currentTick;
  }

  set x(value) {
    this.curSprite.x = value;
  }

  set y(value) {
    this.curSprite.y = value;
  }

  get x() {
    return this.curSprite.x;
  }

  get y() {
    return this.curSprite.y;
  }

  draw() {
    this.curSprite.draw();
  }
}

module.exports = Animation;
