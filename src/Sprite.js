Sprite = (function() {
  function constructor(image, x, y) {
    this.x = x;
    this.y = y;
    this.alpha = 1;
    this.angle = 0;
    this.path = image;
    this.offset = {x: 0, y: 0};

    if (!image) {
      this.shared = true;
      this.loaded = true;
      console.log("Attempted to load null image.");
      return;
    }

    /* Try to retrieve a shared canvas instead of generating a new one */
    this.shared = true;
    if (this.path in sharedCanvases) {
      var shared = sharedCanvases[this.path];
      this.internal = shared[0];
      this.internalctx = shared[1];
      this.loaded = shared[2].loaded;

      if (!this.loaded) {
        this.pending = [];
        shared[3].push(this);
      }
    } else {
      this.image = new Image();
      this.image.src = image;
      this.image.owner = this;
      this.loaded = false;
      this.pending = [];

      /* Cache image modifications to an internal canvas for performance and flexibility */
      this.internal = document.createElement("canvas");
      this.internalctx = this.internal.getContext("2d");

      /* Save the canvas to the global shared canvas map */
      sharedCanvases[this.path] = [this.internal, this.internalctx, this, []];

      /* Asynchronous image loading and caching */
      this.image.onload = function() {
        this.owner.internal.width = this.width.toString();
        this.owner.internal.height = this.height.toString();
        this.owner.internalctx.drawImage(this, 0, 0);

        /* Dump image reference, we no longer need it */
        delete this.owner.image;
        this.owner.loaded = true;
        this.owner.dispatchPending();

        /* Set all dependencies to loaded */
        var deps = sharedCanvases[this.owner.path][3];
        for (var i = 0; i < deps.length; i++) {
          deps[i].loaded = true;
          deps[i].dispatchPending();
        }
      };
    }
  }

  constructor.prototype = {
    draw: function() {
      // TODO: how about caching rotated sprites on their internal canvas?
      if (this.angle) {
        context.save();
        // context.translate(this.x + this.offset.x - currentState.camera.x,
                          // this.y + this.offset.y - currentState.camera.y);
        context.rotate(this.angle * degToRad);
        // context.translate(-(this.x + this.offset.x - currentState.camera.x),
                          // -(this.y + this.offset.y - currentState.camera.y));
      }

      if (this.alpha != 1) {
        context.globalAlpha = this.alpha;
      }

      context.drawImage(this.internal, this.x - currentState.camera.x,
                                       this.y - currentState.camera.y);

      if (this.alpha != 1) {
        context.globalAlpha = 1;
      }

      if (this.angle) {
        context.restore();
      }
    },

    makeGraphic: function(width, height, color) {
      if (this.shared) {
        this.releaseShared();
      }

      var ws = width.toString();
      var hs = height.toString();

      if (ws != this.internal.width || hs != this.internal.height) {
        this.internal.width = ws;
        this.internal.height = hs;
      }

      this.stampRect(0, 0, width, height, color);
    },

    makeLabel: function(text, size, font, color) {
      if (this.shared) {
        this.releaseShared();
      }

      this.internalctx.font = size + "px " + font;
      var metrics = this.internalctx.measureText(text);
      // TODO: figure out actual height instead of 2 * size (see stampText TODO)
      this.makeGraphic(metrics.width, size * 2, "rgba(0, 0, 0, 0)");
      this.stampText(0, 0, text, size, font, color);
    },

    stampText: function(x, y, text, size, font, color) {
      // TODO: write small function to extract and cache ACTUAL font height
      if (!this.loaded) {
        this.pending.push([this.stampText, x, y, text, font, size, color]);
      } else {
        if (this.shared) {
          this.releaseShared();
        }

        this.internalctx.font = size + "px " + font;
        this.internalctx.textAlign = "left";
        this.internalctx.fillStyle = color;
        this.internalctx.fillText(text, x, y + size);
      }
    },

    stampRect: function(x, y, width, height, color) {
      if (!this.loaded) {
        this.pending.push([this.stampRect, x, y, width, height, color]);
      } else {
        if (this.shared) {
          this.releaseShared();
        }

        this.internalctx.fillStyle = color;
        this.internalctx.fillRect(x, y, width, height);
      }
    },

    stampImage: function(x, y, path) {
      if (!this.loaded) {
        this.pending.push([this.stampImage, x, y, path]);
      } else {
        if (this.shared) {
          this.releaseShared();
        }

        var image = new Image();
        image.src = path;
        image.sprite = this;
        image.target = {x: x, y: y};

        image.onload = function() {
          this.sprite.internalctx.drawImage(this, this.target.x, this.target.y);
        };
      }
    },

    dispatchPending: function() {
      /* Dispatch all pending sprite modifications */
      var pending = this.pending;
      for (var i = 0; i < pending.length; i++) {
        pending[i][0].apply(this, Array.prototype.slice.call(pending[i], 1));
      }

      delete this.pending;
    },

    releaseShared: function() {
      /* Stop using the shared version of the internal canvas, we probably
       * need a dinamically modified sprite */
      var newInternal = document.createElement("canvas");
      this.internalctx = newInternal.getContext("2d");

      if (this.path) {
        newInternal.width = this.internal.width.toString();
        newInternal.height = this.internal.height.toString();
        this.internalctx.drawImage(sharedCanvases[this.path][0], 0, 0);
      }

      this.internal = newInternal;
      this.shared = false;
    }
  };

  return constructor;
})();
