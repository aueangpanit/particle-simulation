import React, { Component, Fragment } from 'react';
import { Particles } from './Particles';
import { Particles as ParticlesReact } from './Particles.jsx';
import { FlowField as FlowFieldReact } from './FlowField.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.particles = new Particles(window.innerWidth, window.innerHeight, 200);
  }

  render() {
    return (
      <Fragment>
        <ParticlesReact particles={this.particles} />
        <FlowFieldReact flowField={this.particles.flowField} />
      </Fragment>
    );
  }
}

export default App;
