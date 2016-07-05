class Player {
  constructor() {
    // this.sprite = new Pentagine.Sprite(penta, 'helicopter.png',
                                       // 100, penta.context.height / 2 - 100);

    this.sprite = new Pentagine.Animation({
      game: penta,
      frameDuration: 100,
      frames: ['helicopter.png', 'helicopter2.png'],
      x: 100,
      y: penta.context.height / 2 - 100,
      bouncing: true
    });

    this.sprite.vx = 600;
    this.sprite.vy = 600;
  }

  update(dt) {
    this.sprite.update();

    if (penta.isMouseDown('left')) {
      if (penta.mouse.y < penta.context.height / 2) {
        this.sprite.y = this.sprite.y - this.sprite.vy * dt;
      } else {
        this.sprite.y = this.sprite.y + this.sprite.vy * dt;
      }
    }

    if (penta.isDown('up') || penta.isDown('w')) {
      this.sprite.y -= this.sprite.vy * dt;
    }

    if (penta.isDown('down') || penta.isDown('s')) {
      this.sprite.y += this.sprite.vy * dt;
    }

    if (penta.isDown('left') || penta.isDown('a')) {
      this.sprite.x -= this.sprite.vx * dt;
    }

    if (penta.isDown('right') || penta.isDown('d')) {
      this.sprite.x += this.sprite.vx * dt;
    }
  }
}

class PlayState {
  setup() {
    this.helicopter = new Player();

    this.walls = [];
    this.speed = 20;
    this.minWallHeight = 50;
    this.walls[penta.context.width - 1] = this.minWallHeight;
    this.obstacles = [];

    this.score = 0;

    /* Generate new obstacles along the way */
    setInterval((function() {
      this.obstacles.push({ x: penta.context.width + 100,
                            y: Math.floor(Math.random() * 0.5 * penta.context.height) + 0.2 * penta.context.height,
                            width: 40,
                            height: 175 });
    }).bind(this), 1000);
  }

  update() {
    this.helicopter.update(this.dt); // Player tick
    this.score++; // Update score

    /* Update top and bottom walls */
    for (var i = 0; i < this.walls.length - this.speed; i++) {
      for (var u = 0; u < this.speed; u++) {
        this.walls[i + u] = this.walls[i + u + 1];
      }
    }

    /* Figure out new wall on right end */
    var newWallHeight = -1;

    do {
      newWallHeight = this.walls[this.walls.length - 1] + Math.floor(Math.random() * 10) - 5;
    } while (newWallHeight < this.minWallHeight);

    this.walls[this.walls.length - 1] = newWallHeight;

    /* Update obstacles */
    for (var obstacle = 0; obstacle < this.obstacles.length; obstacle++) {
      this.obstacles[obstacle].x -= this.speed / 2;
    }
  }

  draw() {
    penta.clearCanvas('#49637e');

    for (var i = 0; i < this.walls.length; i++) {
      penta.drawRectangle(i, 0, 1, this.walls[i], '#123');
      penta.drawRectangle(i, penta.context.height - this.walls[i], 1, this.walls[i], '#123');
    }

    for (i = 0; i < this.obstacles.length; i++) {
      penta.drawRectangle(this.obstacles[i].x,
                          this.obstacles[i].y,
                          this.obstacles[i].width,
                          this.obstacles[i].height);
    }

    penta.currentFont = '20px arial';
    penta.drawString('Score: ' + this.score.toString(), 5, 65, '#000');
    penta.drawString('Delta Time: ' + Math.floor((this.dt * 1000).toString()) + 'ms', 5, 105, '#000');
    penta.drawString('FPS: ' + Math.floor((1 / this.dt).toString()) + '', 5, 145, '#000');

    this.helicopter.sprite.draw();
  }
}

/* Start up the game */
var penta = new Pentagine.Game();

penta.setup({ desiredFPS: 60,
              preventedKeys: ['down', 'right', 'left', 'up', 'space'],
              firstState: new PlayState(),
              width: document.documentElement.clientWidth,
              height: document.documentElement.clientHeight });
