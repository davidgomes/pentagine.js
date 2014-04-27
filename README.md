Pentagine
=========
Pentagine is a lightweight JavaScript library for HTML5 2D Game Development that renders to `<canvas>`. For now, it consists of a State Machine, a Sprite class to load and draw images and some keyboard input functions. Soon, I expect it to have much more.

Example
-------
Clone pentagine with `git clone git@github.com:davidgomes/pentagine.git` and then open `examples/index.html` for a list of examples.

Here's a small example of all the JavaScriptg code necessary to draw a ball and make it movable:

```javascript
function PlayState() {
  this.setup = function() {
    this.ball = new penta.Sprite("ball.png", 100, 50);
  }

  this.update = function() {
    if (penta.isDown("up")) {
      this.ball.y--;
    } else if (penta.isDown("down")) {
      this.ball.y++;
    } else if (penta.isDown("left")) {
      this.ball.x--;
    } else if (penta.isDown("right")) {
      this.ball.x++;
    }
  }

  this.draw = function() {
    penta.clearCanvas();

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

/* Prevents the following keys to be sent to the web page. */
penta.preventKeys("down", "right", "left", "up", "space");

penta.switchState(new PlayState());
```

A "real-life" example of a game that uses Pentagine is [Multitaskor](https://github.com/davidgomes/multitaskor), a game I created for [Ludum Dare](https://ludumdare.com) 27.

License
-------
Pentagine is licensed under the [MIT License](https://github.com/davidgomes/pentagine/blob/master/LICENSE).

Thanks
------
I'd like to thank to [ippa](https://github.com/ippa/) because Pentagine is loosely inspired on his HTML5 Game Development library - [jaws](https://github.com/ippa/). I also used some of his code, but this is not a fork, the two libraries are quite different.

Pentagine also uses [stats.js](https://github.com/mrdoob/stats.js), a great monitor for HTML5 performance. It was made by [mrdoob](https://github.com/mrdoob), who is credited on the LICENSE.
