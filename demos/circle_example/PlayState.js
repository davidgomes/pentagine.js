function PlayState() {
  this.setup = function() {

  };

  this.update = function() {

  };

  this.draw = function() {
    penta.clearCanvas();

    penta.drawCircle(40, 40, 100, "#F00");

    penta.drawLine(10, 10, 100, 100, "#F12");
  };
}

penta.desiredFPS = 60;
penta.switchState(new PlayState());
