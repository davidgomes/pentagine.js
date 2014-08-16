/* Simple example showing off SpriteList */

function PlayState() {
  this.setup = function() {
    this.balls = new penta.SpriteList();

    for (var i = 0; i < 10; i++) {
      var newBall = new penta.Sprite('ball.png', 5, i * 40 + 100);
      newBall.speed = 5;
      this.balls.push(newBall);
    }
  };

  this.update = function() {
    if (penta.isDown('right')) {
      this.balls.sprites.forEach(function(ball, index) {
        ball.x += ball.speed;
      });
    }

    if (penta.isDown('left')) {
      this.balls.sprites.forEach(function(ball, index) {
        ball.x -= ball.speed;
      });
    }
  };

  this.draw = function() {
    penta.clearCanvas('#00F');

    penta.drawString('Use RIGHT and LEFT arrow keys.', 2, 10);

    this.balls.draw();
  };
}

penta.setup({ desiredFPS: 60,
              preventedKeys: ['down', 'right', 'left', 'up', 'space'],
              firstState: new PlayState(),
              width: 800,
              height: 640 });
