class SpriteList {
  constructor() {
    this.sprites = [];
  }

  draw() {
    for (var i = 0; i < this.sprites.length; i++) {
      if (this.sprites[i]) {
        this.sprites[i].draw();
      }
    }
  }

  push(newSprite) {
    this.sprites.push(newSprite);
  }

  remove(sprite) {
    var index = this.sprites.indexOf(sprite);
    this.sprites.splice(index, 1);
  }

  getLength() {
    return this.sprites.length;
  }
}

module.exports = SpriteList;
