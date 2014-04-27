function TitleScreenState() {
  this.setup = function() {

  };

  this.update = function() {
    if (penta.isDown("space"))
      penta.switchState(new GameState());
  };

  this.draw = function() {
    penta.clearCanvas();

    penta.drawString("Press [SPACE] to start playing.", 200, 200);
  };
}

function GameState() {
  this.playerX = 20;
  this.playerY = 20;
  this.playerV = 4;

  this.setup = function() { };

  this.update = function() {
    if (penta.isDown("right")) {
      this.playerX += this.playerV;
    }

    if (penta.isDown("left")) {
      this.playerX -= this.playerV;
    }

    if (penta.isDown("down")) {
      this.playerY += this.playerV;
    }

    if (penta.isDown("up")) {
      this.playerY -= this.playerV;
    }

    if (penta.isDown("escape")) {
      penta.switchState(new TitleScreenState());
    }
  };

  this.draw = function() {
    penta.clearCanvas();

    penta.drawRectangle(this.playerX, this.playerY, 40, 40);
  };
}

var penta = new Pentagine().setup();
desiredFPS = 60;
penta.preventKeys(["down", "right", "left", "right", "space"]);
penta.switchState(new TitleScreenState());
