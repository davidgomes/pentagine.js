/* Simple example showing off SpriteList */

function PlayState() {
  this.setup = function() {
    this.balls = new penta.SpriteList();

    for (var i = 0; i < 10; i++) {
      this.balls.push(new penta.Sprite("ball.png", 5, i * 40 + 5));
    }
  };

  this.update = function() {
    if (penta.isDown("right")) {
      this.balls.sprites.forEach(function(ball, index) {
        ball.x += 5;
      });
    } else if (penta.isDown("left")) {
      this.balls.sprites.forEach(function(ball, index) {
        ball.x -= 5;
      });
    }
  };

  this.draw = function() {
    penta.clearCanvas("#00F");

    penta.drawString("Use RIGHT and LEFT arrow keys.", 2, 10);
    
    this.balls.draw();
  };
}

penta.desiredFPS = 60;
penta.switchState(new PlayState());
