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

  this.setup = function() {
    setTimeout(function() {
      penta.switchState(new TitleScreenState());
    }, 10000);
  };

  this.update = function() {
    if (penta.isDown("right")) {
      this.playerX += 5;
    } else if (penta.isDown("left")) {
      this.playerX -= 5;
    } else if (penta.isDown("down")) {
      this.playerY += 5;
    } else if (penta.isDown("up")) {
      this.playerY -= 5;
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
desiredFPS = 30;
penta.preventKeys(["down", "right", "left", "right", "space"]);
penta.switchState(new TitleScreenState());
