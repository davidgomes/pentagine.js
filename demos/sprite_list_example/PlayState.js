/* Simple example showing off SpriteList */

function PlayState() {
  this.setup = function() {
    this.balls = new SpriteList();

    for (var i = 0; i < 10; i++) {
      this.balls.push(new Sprite("ball.png", 5, i * 40 + 5));
    }
  }

  this.update = function() {
    if (isDown("right")) {
      this.balls.sprites.forEach(function(ball, index) {
        ball.x += 5;
      });
    } else if (isDown("left")) {
      this.balls.sprites.forEach(function(ball, index) {
        ball.x -= 5;
      });
    }
  }

  this.draw = function() {
    clearCanvas("#00F");

    drawString("Use RIGHT and LEFT arrow keys.", 2, 10);
    
    this.balls.draw();
  }
}

desiredFPS = 60;
switchState(new PlayState());
