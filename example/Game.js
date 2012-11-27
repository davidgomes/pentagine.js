function Game() {
  this.setup = function() {
    this.i = 0;
    this.ball = new Sprite("ball.png", 10, 10);
  }
  
  this.update = function() {
    this.i++;

    if (this.i > 50) switchState(titleState);
  }

  this.draw = function() {
    clearCanvas();

    drawCircle(400, 320, this.i);
    this.ball.draw();
  }
}

var gameState = new Game();
