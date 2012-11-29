function PlayState() {
  this.setup = function() {
    this.ball = new Sprite("ball.png", 100, context.height / 2 - 100);
    this.ball.vy = 5;

    this.walls = [];
    this.walls[context.width - 1] = 20;
    this.speed = 50;

    this.difficulty = 50;
    
    preventKeys("down", "right", "left", "right", "space");
  }

  this.update = function() {
    if (isDown("up") || isDown("w"))
      this.ball.y -= 15;
    
    for (var i = 2; i < this.walls.length - this.speed; i++) {
      for (var u = 0; u < this.speed; u++) {
        this.walls[i + u] = this.walls[i + u + 1];
      }
    }

    if (this.walls.length == context.width) {
      this.walls[this.walls.length - 1] = Math.floor(Math.random() * this.difficulty) + 30;
    }

    this.ball.y += this.ball.vy;
    this.difficulty++;
  }

  this.draw = function() {
    clearCanvas();

    for (var i = 0; i < this.walls.length; i++) {
      drawRectangle(i, 0, 1, this.walls[i]);
      drawRectangle(i, context.height - this.walls[i], 1, this.walls[i]); 
    }

    this.ball.draw();
  }
}

var playState = new PlayState();
