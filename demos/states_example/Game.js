function TitleScreenState() {
  this.setup = function() {

  };

  this.update = function() {
    if (penta.isDown('space'))
      penta.switchState(new GameState());
  };

  this.draw = function() {
    penta.clearCanvas();
    penta.currentFont = '40px Arial';
    penta.drawString('Press [SPACE] to start playing.', 20, 20);
  };
}

function GameState() {
  this.playerX = 20;
  this.playerY = 20;
  this.playerSpeed = 8;

  this.setup = function() { };

  this.update = function() {
    if (penta.isDown('right')) {
      this.playerX += this.playerSpeed;
    }

    if (penta.isDown('left')) {
      this.playerX -= this.playerSpeed;
    }

    if (penta.isDown('down')) {
      this.playerY += this.playerSpeed;
    }

    if (penta.isDown('up')) {
      this.playerY -= this.playerSpeed;
    }

    if (penta.isDown('escape')) {
      penta.switchState(new TitleScreenState());
    }
  };

  this.draw = function() {
    penta.clearCanvas();

    penta.currentFont = '40px Arial';
    penta.drawString('Press [ESC] to stop playing.', 20, 20);
    penta.drawRectangle(this.playerX, this.playerY, 40, 40);
  };
}

var penta = new Pentagine.Game();

penta.setup({ desiredFPS: 60,
              preventedKeys: ['down', 'right', 'left', 'up', 'space'],
              firstState: new TitleScreenState(),
              width: 800,
              height: 640 });
