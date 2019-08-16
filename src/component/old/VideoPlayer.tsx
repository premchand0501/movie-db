import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import '../App.scss';
import { Canvas, Div } from '../Element';
import { ICanvasProp, IVideoCanvasState } from '../../interface/old/ICanvasProps';
import { drawImage } from '../../util/Canvas.util';

class ColorStrip extends React.Component<ICanvasProp, IVideoCanvasState> {
  colorList: string[] = ['red', 'orange', 'yellow', 'green', 'blue', 'violet', 'red'];
  constructor(props: ICanvasProp) {
    super(props);
    this.state = {
      canvasRef: undefined,
      context2D: undefined,
      pos: { x: 0, y: 0 },
      btnState: true
    }
  }
  setCanvasRef = (canvas: HTMLCanvasElement) => {
    if (!this.state.canvasRef) {
      this.setState({
        canvasRef: canvas
      }, () => {
        const cont2d: CanvasRenderingContext2D = this.state.canvasRef!.getContext('2d')!;
        if (cont2d) {
          this.setState({
            context2D: cont2d
          }, () => {
            this.resizeWindow();
          })
        }
        window.addEventListener('resize', this.resizeWindow);
      });
    }
  }
  resizeWindow = () => {
    if (this.state.canvasRef) {
      const canRef: HTMLCanvasElement = this.state.canvasRef;
      canRef.width = window.innerWidth;
      canRef.height = window.innerWidth * 9 / 16;//36;
      this.setState({
        canvasRef: canRef
      }, () => {
        this.update(this.state.context2D!);
      })
    }
  }
  update = (context2D: CanvasRenderingContext2D) => {
    // drawImage(context2D!, context2D!.canvas)
  }
  render() {
    return (
      <div className="canvasContainer videoPlayer">
        <Canvas ref={(canvasRef: HTMLCanvasElement) => this.setCanvasRef(canvasRef)} />
        <Div className="controls">
          <button className="btn btn-light rounded-circle">
            <FontAwesomeIcon icon={faUpload} />
          </button>
        </Div>
      </div>
    );
  }
}

export default ColorStrip;