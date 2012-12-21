function PlayState() {
  this.setup = function() {
    this.helicopter = new Sprite("helicopter1.png", 100, context.height / 2 - 100);
    this.helicopter.vy = 5;

    this.walls = [];
    this.walls[context.width - 1] = 20;
    this.speed = 30;

    this.difficulty = 50;

    preventKeys("down", "right", "left", "right", "space");
  }

  this.update = function() {
    console.log(mouseX, mouseY);

    if (isDown("up") || isDown("w"))
      this.helicopter.y -= 15;

    if (isDown("down") || isDown("s"))
      this.helicopter.y += 10;

    for (var i = 2; i < this.walls.length - this.speed; i++) {
      for (var u = 0; u < this.speed; u++) {
        this.walls[i + u] = this.walls[i + u + 1];
      }
    }

    if (this.walls.length == context.width) {
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

    this.helicopter.y += this.helicopter.vy;
    this.difficulty += 0.1;
  }

  this.draw = function() {
    clearCanvas();

    for (var i = 0; i < this.walls.length; i++) {
      drawRectangle(i, 0, 1, this.walls[i], "#123");
      drawRectangle(i, context.height - this.walls[i], 1, this.walls[i], "#123");
    }

    this.helicopter.draw();
  }
}

var playState = new PlayState();
switchState(playState);
