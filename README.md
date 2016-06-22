Pentagine
=========
Pentagine is a lightweight JavaScript library for HTML5 2D Game Development that renders to `<canvas>`. For now, it consists of a State Machine, a Sprite class to load and draw images and some keyboard input functions.

Example
-------
Clone pentagine with `git clone git@github.com:davidgomes/pentagine.git` and then open `examples/index.html` for a list of examples.

Here's a small example of all the JavaScript code necessary to draw a ball and make it movable:

```javascript
class PlayState {
  setup() {
    this.ball = new Pentagine.Sprite(penta, 'ball.png', 100, 50);
    this.ball.speed = 400;
  }

  update() {
    if (penta.isDown('up')) {
      this.ball.y -= this.ball.speed * this.dt;
    }

    if (penta.isDown('down')) {
      this.ball.y += this.ball.speed * this.dt;
    }

    if (penta.isDown('left')) {
      this.ball.x -= this.ball.speed * this.dt;
    }

    if (penta.isDown('right')) {
      this.ball.x += this.ball.speed * this.dt;
    }
  }

  draw() {
    penta.clearCanvas('#333');

    this.ball.draw();
  }
}

var penta = new Pentagine.Game();

/*
   If penta.desiredFPS is not declared, the game will run as fast as
   possible, and on any State, you can use 'this.dt' to get the
   delta time between two ticks and use it to make movement
   smooth. However, if desiredFPS is declared, the game will try to run
   with the given amount of FPS and this.dt also works.
*/

penta.setup({ desiredFPS: 60,
              preventedKeys: ['down', 'right', 'left', 'up', 'space'],
              firstState: new PlayState(),
              width: 400,
              height: 400 });
```

A "real-life" example of a game that uses Pentagine is [Multitaskor](https://github.com/davidgomes/multitaskor), a game I created for [Ludum Dare](https://ludumdare.com) 27.

License
-------
Pentagine is licensed under the [MIT License](https://github.com/davidgomes/pentagine/blob/master/LICENSE).

Thanks
------
I'd like to thank to [ippa](https://github.com/ippa/) because Pentagine is loosely inspired on his HTML5 Game Development library - [jaws](https://github.com/ippa/). I also used some of his code, but this is not a fork, the two libraries are quite different.
