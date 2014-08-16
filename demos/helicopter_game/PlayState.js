function PlayState() {
  this.setup = function() {
    this.helicopter = new penta.Sprite('helicopter.png',
                                       100, penta.context.height / 2 - 100);

    this.helicopter.vx = 400;
    this.helicopter.vy = 400;

    this.walls = [];
    this.speed = 20;
    this.minWallHeight = 50;
    this.walls[penta.context.width - 1] = this.minWallHeight;
    console.log('height = ' + penta.context.height);
    
    this.score = 0;
  };

  this.update = function() {
    if (penta.isDown('up') || penta.isDown('w')) {
      this.helicopter.y -= this.helicopter.vy * this.dt;
    }

    if (penta.isDown('down') || penta.isDown('s')) {
      this.helicopter.y += this.helicopter.vy * this.dt;
    }

    if (penta.isDown('left') || penta.isDown('a')) {
      this.helicopter.x -= this.helicopter.vx * this.dt;
    }

    if (penta.isDown('right') || penta.isDown('d')) {
      this.helicopter.x += this.helicopter.vx * this.dt;
    }

    for (var i = 0; i < this.walls.length - this.speed; i++) {
      for (var u = 0; u < this.speed; u++) {
        this.walls[i + u] = this.walls[i + u + 1];
      }
    }

    var newWallHeight = -1;
    
    do {
      newWallHeight = this.walls[this.walls.length - 1] + Math.floor(Math.random() * 10) - 5;
    } while (newWallHeight < this.minWallHeight);
    
    this.walls[this.walls.length - 1] = newWallHeight;

    this.score++;
  };

  this.draw = function() {
    penta.clearCanvas();

    currentFont = '10px arial';
    penta.drawString('Score: ' + this.score.toString(), 2, 10, '#FFF');
    penta.drawString('Delta Time: ' + Math.floor((this.dt * 1000).toString()) + 'ms', 2, 20, '#FFF');
    penta.drawString('FPS: ' + Math.floor((1 / this.dt).toString()) + '', 2, 30, '#FFF');

    for (var i = 0; i < this.walls.length; i++) {
      penta.drawRectangle(i, 0, 1, this.walls[i], '#123');
      penta.drawRectangle(i, penta.context.height - this.walls[i], 1, this.walls[i], '#123');
    }

    this.helicopter.draw();
  };
}

/* Start up the game */
penta.setup({ desiredFPS: 60, preventedKeys: ['down', 'right', 'left', 'up', 'space'],
              firstState: new PlayState(),
              width: document.documentElement.clientWidth,
              height: document.documentElement.clientHeight });
