class PlayState {
  setup() {
    this.ball = new Pentagine.Sprite(penta, 'ball.png', 100, 50);
    this.ball.speed = 400;
  }

  update() {
    if (penta.isDown('up')) {
      this.ball.y -= this.ball.speed * this.dt;
    }

    if (penta.isDown('down')) {
      this.ball.y += this.ball.speed * this.dt;
    }

    if (penta.isDown('left')) {
      this.ball.x -= this.ball.speed * this.dt;
    }

    if (penta.isDown('right')) {
      this.ball.x += this.ball.speed * this.dt;
    }
  }

  draw() {
    penta.clearCanvas('#333');

    this.ball.draw();
  }
}

var penta = new Pentagine.Game();

/*
   If penta.desiredFPS is not declared, the game will run as fast as
   possible, and on any State, you can use 'this.dt' to get the
   delta time between two ticks and use it to make movement
   smooth. However, if desiredFPS is declared, the game will try to run
   with the given amount of FPS and this.dt also works.
*/

penta.setup({ desiredFPS: 60,
              preventedKeys: ['down', 'right', 'left', 'up', 'space'],
              firstState: new PlayState(),
              width: 400,
              height: 400 });
