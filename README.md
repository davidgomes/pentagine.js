Pentagine
=========
Pentagine is a lightweight JavaScript library for HTML5 2D Game Development that renders to `<canvas>`. For now, it consists of a State Machine, a Sprite class to load and draw images, some keyboard and mouse input functions, a SpriteList and a Camera class. It is written using ECMAScript 6 and is designed to be used with ECMAScript 6 code as well (but works as well with regular ECMAScript 5).

Building
--------
As mentioned before, Pentagine is written using ECMAScript 6 and as so, its source must go through [Babel](https://babeljs.io/) before it can be used in a browser. All you have to do is compile it using `webpack`:

```
git clone git@github.com:davidgomes/pentagine.git
cd pentagine/
npm install
webpack
```

The only dependency of Pentagine is [underscore](http://underscorejs.org/), but it has some development dependencies such as [Babel](https://babeljs.io/).

Example
-------
Clone pentagine with `git clone git@github.com:davidgomes/pentagine.git` and then open `examples/index.html` for a list of examples. Because some of the examples are written using ECMAScript 6, you need to compile the demos first (using `webpack`).

Here's a small example of all the JavaScript code (ECMAScript 6) necessary to draw a ball and make it movable with the keyboard:

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
