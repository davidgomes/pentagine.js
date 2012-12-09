Pentagine
=========

About
-----
Pentagine is a lightweight Javascript library for HTML5 2D Game Development that renders to `<canvas>`. For now, it consists of a State Machine, a Sprite class to load and draw images and some keyboard input functions. Soon, I expect it to have much more.

Pentagine puts all its variables and functions on the **global namespace** and I do realize this is **not** recommended.

Example
-------
Here's a small example of all the Javascript code needed to draw a ball and make it movable:

```javascript
function PlayState() {
  this.setup = function() {
    this.ball = new Sprite("ball.png", 100, 50);
    preventKeys("down", "right", "left", "right", "space");
  }

  this.update() = function() {
    if (isDown("up"))
      this.ball.y--;
    else if (isDown("down"))
      this.ball.y++;
    else if (isDown("left"))
      this.ball.x--;
    else if (isDown("right"))
      this.ball.x++;
  }

  this.draw() = function() {
    clearCanvas();

    this.ball.draw();
  }
}

var playState = new PlayState();
switchState(playState);
```

Inside the repository, check out `example/`. I put there some simple games made using Pentagine. Regarding example number 1, the helicopter sprite is not mine, I found it on [The Spriters Resource](http://www.spriters-resource.com).

License
-------
Pentagine is licensed under the [MIT License](https://github.com/davidgomes/pentagine/blob/master/LICENSE).

Thanks
------
I'd like to thank to [ippa](https://github.com/ippa/) because Pentagine is inspired on his HTML5 Game Development library - [jaws](https://github.com/ippa/). I also used some of his code, but this is not a fork, the two libraries are quite different.