function TitleScreenState() {
  this.setup = function() {
    
  }

  this.update = function() {
    if (isDown("space"))
      switchState(new GameState());
  }

  this.draw = function() {
    clearCanvas();

    drawString("Press [SPACE] to start playing.", 200, 200);
  }
}

function GameState() {
  this.playerX = 20;
  this.playerY = 20;

  this.setup = function() {
    setTimeout(function() {
      switchState(new TitleScreenState());
    }, 10000);
  }

  this.update = function() {
    if (isDown("right")) {
      this.playerX += 20;
    } else if (isDown("left")) {
      this.playerX -= 20;
    } else if (isDown("down")) {
      this.playerY += 20;
    } else if (isDown("up")) {
      this.playerY -= 20;
    }
  }

  this.draw = function() {
    clearCanvas();

    drawRectangle(this.playerX, this.playerY, 40, 40);
  }
}

desiredFPS = 30;
preventKeys("down", "right", "left", "right", "space");
switchState(new TitleScreenState());
