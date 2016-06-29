class Audio {
  element;

  constructor(path) {
    this.element = document.createElement('audio');
    this.element.src = path;
  }

  play() {
    this.element.play();
  }
}

module.exports = Audio;