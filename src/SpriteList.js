SpriteList = (function() {
  function constructor() {
    this.sprites = [];
  }

  constructor.prototype = {
    draw: function() {
      for (var i = 0; i < this.sprites.length; i++) {
        if (this.sprites[i]) {
          this.sprites[i].draw();
        }
      }
    },

    push: function(newSprite) {
      this.sprites.push(newSprite);
    },

    remove: function(sprite) {
      var index = this.sprites.indexOf(sprite);
      this.sprites.splice(index, 1);
    }
  };

  return constructor;
})();
