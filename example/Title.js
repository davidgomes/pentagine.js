function Title() {
  this.setup = function() {
    this.i = 50;
  }
  
  this.update = function() {
    this.i--;

    if (this.i == 0) switchState(gameState);
  }

  this.draw = function() {
    clearCanvas();

    drawCircle(400, 320, this.i);
  }
}

var titleState = new Title();
