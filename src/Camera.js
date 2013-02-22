Camera = (function() {
  function constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  constructor.prototype = {
    follow: function() {
    }
  };

  return constructor;
})();
