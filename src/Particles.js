import { FlowField } from './FlowField';

class Particles {
  // constants
  dampingRatio = 1;
  airResistance = 0.0001;
  fieldGridSize = 20; // 20 x 20 pixels

  particleSize = 5;

  constructor(width, height, n) {
    this.width = width;
    this.height = height;
    this.count = n;

    this.particles = [];
    for (let i = 0; i < this.count; i++) {
      this.particles[i] = [];
      this.particles[i] = {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.random() * 0,
        vy: Math.random() * 0
      };
    }

    // initialize flow field
    this.flowField = new FlowField(this.width, this.height, this.fieldGridSize);
  }

  update = dt => {
    this.flowField.update(this.particles);

    for (let i = 0; i < this.particles.length; i++) {
      let currPar = this.particles[i];

      if (currPar.x > this.width)
        this.particles[i].vx = -Math.abs(currPar.vx * this.dampingRatio);
      if (currPar.x < 0)
        this.particles[i].vx = Math.abs(currPar.vx * this.dampingRatio);
      if (currPar.y > this.height)
        this.particles[i].vy = -Math.abs(currPar.vy * this.dampingRatio);
      if (currPar.y < 0)
        this.particles[i].vy = Math.abs(currPar.vy * this.dampingRatio);

      this.particles[i].vx -= currPar.vx * this.airResistance * dt;
      this.particles[i].vy -= currPar.vy * this.airResistance * dt;

      let f = this.flowField.getForce(currPar.x, currPar.y);
      this.particles[i].vx += f.x * dt;
      this.particles[i].vy += f.y * dt;

      this.particles[i].x += currPar.vx * dt;
      this.particles[i].y += currPar.vy * dt;
    }

    return this.particles;
  };

  draw = ctx => {
    for (let i = 0; i < this.particles.length; i++) {
      let currPar = this.particles[i];

      ctx.fillRect(currPar.x, currPar.y, this.particleSize, this.particleSize);
    }
  };

  getParticles() {
    return this.particles;
  }
}

export { Particles };
