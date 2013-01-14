Pentagine
=========

About
-----
Pentagine is a lightweight Javascript library for HTML5 2D Game Development that renders to `<canvas>`. For now, it consists of a State Machine, a Sprite class to load and draw images and some keyboard input functions. Soon, I expect it to have much more.

Pentagine puts all its variables and functions on the **global namespace** and I do realize this is **not** recommended.

Example
-------
Clone pentagine with `git clone git@github.com:davidgomes/pentagine.git` and then open `examples/index.html` for a list of examples.

Here's a small example of all the Javascript code necessary to draw a ball and make it movable:

```javascript
function PlayState() {
  this.setup = function() {
    this.ball = new Sprite("ball.png", 100, 50);

    preventKeys("down", "right", "left", "right", "space");
  }

  this.update = function() {
    if (isDown("up"))
      this.ball.y--;
    else if (isDown("down"))
      this.ball.y++;
    else if (isDown("left"))
      this.ball.x--;
    else if (isDown("right"))
      this.ball.x++;
  }

  this.draw = function() {
    clearCanvas();

    this.ball.draw();
  }
}

/*
   If desiredFPS is not declared, the game will run as fast as
   possible, and on any State, you can use 'this.dt' to get the
   delta time between two ticks and use it to make movement
   smooth. If desiredFPS is declared, this.dt also works.
*/
desiredFPS = 60;

switchState(new PlayState());
```

License
-------
Pentagine is licensed under the [MIT License](https://github.com/davidgomes/pentagine/blob/master/LICENSE).

Thanks
------
I'd like to thank to [ippa](https://github.com/ippa/) because Pentagine is inspired on his HTML5 Game Development library - [jaws](https://github.com/ippa/). I also used some of his code, but this is not a fork, the two libraries are quite different.

Pentagine also uses [stats.js](https://github.com/mrdoob/stats.js), a great monitor for HTML5 performance. It was made by [mrdoob](https://github.com/mrdoob), who is credited on the LICENSE.