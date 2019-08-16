import React from 'react';
import { IBikeCanvasProps, IBikeCanvasState } from '../../interface/old/ICanvasProps';

import bike from '../assets/img/bike.svg';
import { Img } from '../Element';

class BikeCanvas extends React.Component<IBikeCanvasProps, IBikeCanvasState> {
  constructor(props: IBikeCanvasProps) {
    super(props);
    this.state = {
      context2D: undefined,
      canvasRef: undefined
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="canvasContainer">
        <Img src={bike} alt="bike" />
      </div>
    );
  }
}

export default BikeCanvas;