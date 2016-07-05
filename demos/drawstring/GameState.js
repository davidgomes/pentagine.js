function GameState() {
  this.setup = function() { };

  this.update = function() { };

  this.draw = function() {
    penta.clearCanvas();

    penta.currentFont = 'italic 50px Arial';
    penta.drawString('pentagine.js drawString demo', 20, 20, '#ff0000');

    // penta.currentFont = '30px Arial';
    penta.changeFontSize(30);
    penta.removeFontStyle('italic');
    penta.drawString('drawString(text, x, y, color, alignment)',
                     20, 120, '#000000');
  };
}

var penta = new Pentagine.Game();
penta.setup({ desiredFPS: 60,
              width: 800,
              height: 640,
              firstState: new GameState() });
