function PlayState() {
  this.setup = function() {
    this.i = 0;
    this.increasing = true;
    this.ball = new Sprite("ball.png", 10, 10);

    preventKeys("down", "right", "left", "right", "space");
  }
  
  this.update = function() {
    if (this.i == 50)
      this.increasing = false;
    else if (this.i == 0)
      this.increasing = true;
    
    if (this.increasing)
      this.i++;
    else
      this.i--;

    if (isDown("right") || isDown("d"))
      this.ball.x += 5;
    if (isDown("left") || isDown("a"))
      this.ball.x -= 5;
    if (isDown("down") || isDown("s"))
      this.ball.y += 5;
    if (isDown("up") || isDown("w"))
      this.ball.y -= 5;
  }

  this.draw = function() {
    clearCanvas();

    drawCircle(400, 320, this.i);
    this.ball.draw();
  }
}

var playState = new PlayState();
