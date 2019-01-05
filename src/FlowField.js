import { CanvasHelper } from './CanvasHelper';

class FlowField {
  G = 0.01;

  constructor(width, height, gridSize) {
    this.width = width;
    this.height = height;
    this.gridSize = gridSize;

    // initialize flow field with force vectors magnitude = 0
    // a grid of boxes of size 'gridSize x gridSize' pixels
    this.flowField = [];
    for (let i = 0; i < this.width / this.gridSize; i++) {
      this.flowField[i] = [];
      for (let j = 0; j < this.height / this.gridSize; j++) {
        this.flowField[i][j] = {
          x: 0,
          y: 0
        };
      }
    }
  }

  update = particles => {
    for (let i = 0; i < this.flowField.length; i++) {
      for (let j = 0; j < this.flowField[i].length; j++) {
        // current flow center
        let cx = this.gridSize * i + this.gridSize / 2;
        let cy = this.gridSize * j + this.gridSize / 2;

        let sumfx = 0,
          sumfy = 0;
        for (let k = 0; k < particles.length; k++) {
          // calculate force vector contibution by this particle
          let currPar = particles[k];
          if (this._shouldIgnore(currPar, i, j)) break;

          // sign of force component
          let sx = currPar.x >= cx ? 1 : -1;
          let sy = currPar.y >= cy ? 1 : -1;

          let dx = currPar.x - cx;
          let dy = currPar.y - cy;

          // magnitude
          let M = this.G / (Math.pow(dx, 2) + Math.pow(dy, 2));

          let fx =
            sx *
            Math.abs(((dx / dy) * M) / Math.sqrt(1 + Math.pow(dx / dy, 2)));
          let fy = sy * (M / Math.sqrt(1 + Math.pow(dx / dy, 2)));

          sumfx += fx;
          sumfy += fy;
        }

        console.log(sumfx, sumfy);
        this.flowField[i][j].x = sumfx;
        this.flowField[i][j].y = sumfy;
      }
    }
  };

  draw = ctx => {
    const scaleFactor = 100000;
    for (let i = 0; i < this.flowField.length; i++) {
      for (let j = 0; j < this.flowField[i].length; j++) {
        let currFlow = this.flowField[i][j];
        let x1 =
          i * this.gridSize +
          this.gridSize / 2 -
          (currFlow.x * scaleFactor) / 2;
        let x2 =
          i * this.gridSize +
          this.gridSize / 2 +
          (currFlow.x * scaleFactor) / 2;
        let y1 =
          j * this.gridSize +
          this.gridSize / 2 -
          (currFlow.y * scaleFactor) / 2;
        let y2 =
          j * this.gridSize +
          this.gridSize / 2 +
          (currFlow.y * scaleFactor) / 2;

        ctx.beginPath();
        CanvasHelper.drawArrow(ctx, x1, y1, x2, y2);
        ctx.stroke();
      }
    }
  };

  getForce = (x, y) => {
    let i = Math.floor(x / this.gridSize);
    let j = Math.floor(y / this.gridSize);

    if (i < 0) i = 0;
    if (j < 0) j = 0;
    if (i > this.flowField.length - 1) i = this.flowField.length - 1;
    if (j > this.flowField[i].length - 1) j = this.flowField[i].length - 1;

    return this.flowField[i][j];
  };

  _shouldIgnore(particle, i, j) {
    return (
      particle.x > this.gridSize * i &&
      particle.x < this.gridSize * (i + 1) &&
      particle.y > this.gridSize * j &&
      particle.y < this.gridSize * (j + 1)
    );
  }
}

export { FlowField };
