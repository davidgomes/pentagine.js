function PlayState() {
  this.setup = function() {
    this.beep = new Pentagine.Audio('beep.ogg');
    this.canBeep = true;
  };

  this.update = function() {
    if (penta.isMouseDown('left')) {
      if (this.canBeep) {
        this.beep.play();
        this.canBeep = false;
      }
    } else {
      this.canBeep = true;
    }
  };

  this.draw = function() {
    penta.clearCanvas('#fff');

    penta.currentFont = '40px Arial';
    penta.drawString('Left click to play sound', 20, 20, '#ff0000');
  };
}

var penta = new Pentagine.Game();

penta.setup({ desiredFPS: 60,
              preventedKeys: ['down', 'right', 'left', 'up', 'space'],
              firstState: new PlayState(),
              width: 800,
              height: 640 });
