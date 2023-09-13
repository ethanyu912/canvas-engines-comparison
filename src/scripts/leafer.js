import Engine from "./engine";
import { Leafer, Rect } from 'leafer-ui';

class LeafercEngine extends Engine {

  constructor() {
    super();
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.content.appendChild(this.canvas);
    this.leafer = null;
  }

  init() {
    this.leafer = new Leafer({
      view: this.canvas,
      width: this.width,
      height: this.height,
    });
  }

  animate() {
    const rects = this.rects;
    for (let i = 0; i < this.count.value; i++) {
      const r = rects[i];
      r.x -= r.speed;
      r.el.move(-r.speed, 0);
      if (r.x + r.size * 2 < 0) {
        r.x = this.width + r.size * 2;
        r.el.move(r.x, 0)
      }
    }
    this.meter.tick();
    this.request = requestAnimationFrame(() => this.animate());
  }


  render() {
    // clear the canvas
    // console.log(this.count, this.leafer)
    this.leafer.canvas.clearRect(0, 0, this.width, this.height);
    this.cancelAnimationFrame(this.request);
    // rectangle creation
    const rects = new Array(this.count);
    for (let i = 0; i < this.count.value; i++) {
      const x = Math.random() * this.width;
      const y = Math.random() * this.height;
      const size = 10 + Math.random() * 40;
      const speed = 1 + Math.random();

      const rect = new Rect({
        x,
        y,
        width: size,
        height: size,
        fill: 'white',
        stroke: "black",
      });
      rects[i] = { x, y, size: size / 2, speed, el: rect };
      this.leafer.add(rect);
    }
    this.rects = rects;
    this.request = requestAnimationFrame(() => this.animate());
  }
}

window.onload = function () {
  const engine = new LeafercEngine();
  engine.init();
  engine.render();
}