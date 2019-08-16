import React from 'react';
import '../App.scss';
import { Canvas, Div, P, Span } from '../Element';
import { ICanvasProp, ICanvasState, Vector2 } from '../../interface/old/ICanvasProps';
import { updateGradient, rgbToHex, } from '../../util/Canvas.util';

class ColorStrip extends React.Component<ICanvasProp, ICanvasState> {
  colorList: string[] = ['red', 'orange', 'yellow', 'green', 'blue', 'violet', 'red'];
  constructor(props: ICanvasProp) {
    super(props);
    this.state = {
      canvasRef: undefined,
      context2D: undefined,
      pos: { x: 0, y: 0 },
      selectedColor: ''
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
  onPointerMoveHandler = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const pos = this.getEventLocation(e);
    this.setState({
      pos: { x: pos.x, y: pos.y }
    });
    this.hexColorOnPosition(pos);
  }
  getEventLocation = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const target: HTMLCanvasElement = event.target as HTMLCanvasElement;
    return {
      x: event.clientX - target.offsetLeft,
      y: event.clientY - target.offsetTop
    }
  }
  hexColorOnPosition = (pos: Vector2) => {
    const pixelData: ImageData = this.state.context2D!.getImageData(pos.x, pos.y, 1, 1);
    let hexColor: string = rgbToHex(pixelData.data[0], pixelData.data[1], pixelData.data[2]);
    if (hexColor === '0') {
      hexColor = '000000';
    }
    if (hexColor && hexColor.length > 0) {
      this.setState({
        selectedColor: `#${hexColor}`
      })
    }
  }
  onPointerDownHandler = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const pos: Vector2 = this.getEventLocation(event)!;
    this.hexColorOnPosition(pos);
  }
  resizeWindow = () => {
    if (this.state.canvasRef) {
      const canRef: HTMLCanvasElement = this.state.canvasRef;
      canRef.width = window.innerWidth;
      canRef.height = 36;
      this.setState({
        canvasRef: canRef
      }, () => {
        this.update(this.state.context2D!);
      })
    }
  }
  update = (context2D: CanvasRenderingContext2D) => {
    updateGradient(context2D!, { x0: 0, x1: 0, y0: this.state.canvasRef!.width, y1: this.state.canvasRef!.height }, this.colorList);
  }
  render() {
    return (
      <div className="canvasContainer">
        <Canvas ref={(canvasRef: HTMLCanvasElement) => this.setCanvasRef(canvasRef)}
          onPointerDown={this.onPointerDownHandler}
          onPointerMove={this.onPointerMoveHandler} />
        <Div className="controls">
          <P className="m-0 text-center">
            Current Position: {this.state.pos.x}, {this.state.pos.y}
          </P>
          <P className="m-0 d-flex align-items-center">
            {
              this.state.selectedColor !== '' ?
                (<React.Fragment>
                  <Span className="mr-3">{this.state.selectedColor}</Span>
                  <Span className="selectedColor" style={{ backgroundColor: this.state.selectedColor }}></Span>
                </React.Fragment>) :
                (<Span>Not valid</Span>)
            }
          </P>
        </Div>
      </div>
    );
  }
}

export default ColorStrip;