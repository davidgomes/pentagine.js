/* Simple example showing off SpriteList */

function PlayState() {
  this.setup = function() {
    this.balls = new SpriteList();

    for (var i = 0; i < 10; i++) {
      this.balls.push(new Sprite("ball.png", 5, i * 40 + 5));
    }
  }

  this.update = function() {

  }

  this.draw = function() {
    clearCanvas();

    this.balls.draw();
  }
}

desiredFPS = 60;
var playState = new PlayState();
switchState(playState);
