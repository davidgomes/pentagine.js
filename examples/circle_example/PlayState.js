function PlayState() {
  this.setup = function() {

  }

  this.update = function() {

  }

  this.draw = function() {
    clearCanvas();

    drawCircle(40, 40, 100, "#F00");
  }
}

desiredFPS = 60;
switchState(new PlayState());
