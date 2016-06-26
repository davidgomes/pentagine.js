class SpriteList {
  constructor() {
    this.sprites = [];
  }

  draw() {
    _.invokeMap(_.compact(this.sprites), 'draw');
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
