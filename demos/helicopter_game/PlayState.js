function PlayState() {
  this.setup = function() {
    this.helicopter = new penta.Sprite("helicopter1.png",
                                       100, penta.context.height / 2 - 100);

    this.helicopter.vy = 5;

    this.walls = [];
    this.walls[penta.context.width - 1] = 20;
    this.speed = 30;

    this.difficulty = 50;
    this.score = 0;
  };

  this.update = function() {
    if (penta.isDown("up") || penta.isDown("w"))
      this.helicopter.y -= 400 * this.dt;

    if (penta.isDown("down") || penta.isDown("s"))
      this.helicopter.y += 200 * this.dt;

    for (var i = 2; i < this.walls.length - this.speed; i++) {
      for (var u = 0; u < this.speed; u++) {
        this.walls[i + u] = this.walls[i + u + 1];
      }
    }

    if (this.walls.length == penta.context.width) {
      if (this.walls[this.walls.length - 2] < 250) {
        if (Math.floor(Math.random() * 5) > 1)
          this.walls[this.walls.length - 1] = this.walls[this.walls.length - 2] + Math.floor(Math.random() * 5) + 1;
        else
          this.walls[this.walls.length - 1] = this.walls[this.walls.length - 2] - Math.floor(Math.random() * 5) - 1;
      } else {
          this.walls[this.walls.length - 1] = this.walls[this.walls.length - 2];
      }
    }

    /* Dirty fix */
    this.walls[1] = this.walls[2];
    this.walls[0] = this.walls[1];

    this.helicopter.y += 100 * this.dt;

    this.difficulty += 0.1;
    this.score++;
  };

  this.draw = function() {
    penta.clearCanvas();

    currentFont = "10px arial";
    penta.drawString("Score: " + this.score.toString(), 2, 10, "#FFF");
    penta.drawString("Delta Time: " + Math.floor((this.dt * 1000).toString()) + "ms", 2, 20, "#FFF");
    penta.drawString("FPS: " + Math.floor((1 / this.dt).toString()) + "", 2, 30, "#FFF");

    for (var i = 0; i < this.walls.length; i++) {
      penta.drawRectangle(i, 0, 1, this.walls[i], "#123");
      penta.drawRectangle(i, penta.context.height - this.walls[i], 1, this.walls[i], "#123");
    }

    this.helicopter.draw(penta.context);
  };
}

var penta = new Pentagine().setup();
desiredFPS = 30;
penta.preventKeys("down", "right", "left", "right", "space");
penta.switchState(new PlayState());
