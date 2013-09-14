function PlayState() {
  this.setup = function() {

  }

  this.update = function() {

  }

  this.draw = function() {
    clearCanvas();

    drawCircle(40, 40, 100, "#F00");

    drawLine(10, 10, 100, 100, "#F12");
  }
}

desiredFPS = 60;
switchState(new PlayState());
