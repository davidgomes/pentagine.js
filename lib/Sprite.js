class Sprite {
  constructor(game, image, x, y) {
    this.x = x;
    this.y = y;
    this.alpha = 1;
    this.angle = 0;
    this.path = image;
    this.currentState = game.currentState;
    this.offset = { x: 0, y: 0 };
    this.context = game.context;
    this.sharedCanvases = { };

    if (!image) {
      this.shared = true;
      this.loaded = true;
      console.log('Error: Attempted to load null image.');
      return;
    }

    /* Try to retrieve a shared canvas instead of generating a new one */
    this.shared = true;
    if (this.path in this.sharedCanvases) {
      var shared = this.sharedCanvases[this.path];
      this.internal = shared[0];
      this.internalctx = shared[1];
      this.loaded = shared[2].loaded;

      if (!this.loaded) {
        this.pending = [ ];
        shared[3].push(this);
      }
    } else {
      this.image = new Image();
      this.image.src = image;
      this.image.owner = this;
      this.loaded = false;
      this.pending = [ ];

      /* Cache image modifications to an internal canvas for performance and flexibility */
      this.internal = document.createElement('canvas');
      this.internalctx = this.internal.getContext('2d');

      /* Save the canvas to the global shared canvas map */
      this.sharedCanvases[this.path] = [this.internal, this.internalctx, this, [ ]];

      /* Asynchronous image loading and caching */
      var sharedCanvasesCopy = this.sharedCanvases;
      this.image.onload = function () {
        this.owner.internal.width = this.width.toString();
        this.owner.internal.height = this.height.toString();
        this.owner.internalctx.drawImage(this, 0, 0);

        /* Dump image reference, we no longer need it */
        delete this.owner.image;
        this.owner.loaded = true;
        this.owner.dispatchPending();

        /* Set all dependencies to loaded */
        var deps = sharedCanvasesCopy[this.owner.path][3];
        for (let i = 0; i < deps.length; i++) {
          deps[i].loaded = true;
          deps[i].dispatchPending();
        }
      };
    }
  }

  draw() {
    // TODO: how about caching rotated sprites on their internal canvas?

    if (this.angle) {
      this.context.save();
      this.context.translate(this.x + this.offset.x - this.currentState.camera.x,
                             this.y + this.offset.y - this.currentState.camera.y);

      this.context.rotate(this.angle * degToRad);

      this.context.translate(-(this.x + this.offset.x - this.currentState.camera.x),
                             -(this.y + this.offset.y - this.currentState.camera.y));
    }

    if (this.alpha != 1) {
      this.context.globalAlpha = this.alpha;
    }

    this.context.drawImage(this.internal, this.x - this.currentState.camera.x,
                           this.y - this.currentState.camera.y);

    if (this.alpha != 1) {
      this.context.globalAlpha = 1;
    }

    if (this.angle) {
      this.context.restore();
    }
  }

  makeGraphic(width, height, color) {
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
  }

  makeLabel(text, size, font, color) {
    if (this.shared) {
      this.releaseShared();
    }

    this.internalctx.font = size + 'px ' + font;
    var metrics = this.internalctx.measureText(text);

    // TODO: figure out actual height instead of 2 * size (see stampText TODO)
    this.makeGraphic(metrics.width, size * 2, 'rgba(0, 0, 0, 0)');
    this.stampText(0, 0, text, size, font, color);
  }

  stampText(x, y, text, size, font, color) {
    // TODO: write small function to extract and cache ACTUAL font height
    if (!this.loaded) {
      this.pending.push([this.stampText, x, y, text, font, size, color]);
    } else {
      if (this.shared) {
        this.releaseShared();
      }

      this.internalctx.font = size + 'px ' + font;
      this.internalctx.textAlign = 'left';
      this.internalctx.fillStyle = color;
      this.internalctx.fillText(text, x, y + size);
    }
  }

  stampRect(x, y, width, height, color) {
    if (!this.loaded) {
      this.pending.push([ this.stampRect, x, y, width, height, color ]);
    } else {
      if (this.shared) {
        this.releaseShared();
      }

      this.internalctx.fillStyle = color;
      this.internalctx.fillRect(x, y, width, height);
    }
  }

  stampImage(x, y, path) {
    if (!this.loaded) {
      this.pending.push([ this.stampImage, x, y, path ]);
    } else {
      if (this.shared) {
        this.releaseShared();
      }

      var image = new Image();
      image.src = path;
      image.sprite = this;
      image.target = { x: x, y: y };

      image.onload = () => {
        this.sprite.internalctx.drawImage(this, this.target.x, this.target.y);
      };
    }
  }

  dispatchPending() {
    /* Dispatch all pending sprite modifications */
    var pending = this.pending;

    for (let i = 0; i < pending.length; i++) {
      pending[i][0].apply(this, Array.prototype.slice.call(pending[i], 1));
    }

    delete this.pending;
  }

  releaseShared() {
    /* Stop using the shared version of the internal canvas, we probably
     * need a dinamically modified sprite */
    var newInternal = document.createElement('canvas');
    this.internalctx = newInternal.getContext('2d');

    if (this.path) {
      newInternal.width = this.internal.width.toString();
      newInternal.height = this.internal.height.toString();
      this.internalctx.drawImage(sharedCanvases[this.path][0], 0, 0);
    }

    this.internal = newInternal;
    this.shared = false;
  }
}

module.exports = Sprite;