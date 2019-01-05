import React, { Component } from 'react';

class Particles extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.particles = props.particles;
  }

  componentDidMount() {
    window.requestAnimationFrame(this.loop);

    this.canvas = this.canvasRef.current;
    const box = this.canvas.getBoundingClientRect();
    this.width = box.width;
    this.height = box.height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = 'red';

    this.lastRender = 0;
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        style={{ position: 'fixed', width: '100%', height: '100%' }}
      />
    );
  }

  update = progress => {
    this.particles.update(progress);
  };

  draw = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.particles.draw(this.ctx);
  };

  loop = timestamp => {
    let progress = timestamp - this.lastRender;

    this.update(progress);
    this.draw();

    this.lastRender = timestamp;
    window.requestAnimationFrame(this.loop);
  };
}

export { Particles };
