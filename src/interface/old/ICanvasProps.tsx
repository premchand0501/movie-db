export interface Vector2 {
  x: number;
  y: number;
}
export interface Vector3 {
  x: number;
  y: number;
  z: number;
}
export interface Rect {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}
export interface ICanvasState {
  canvasRef: HTMLCanvasElement | undefined;
  context2D: CanvasRenderingContext2D | undefined;
  pos: Vector2;
  selectedColor: string;
}
export interface IVideoCanvasState {
  canvasRef: HTMLCanvasElement | undefined;
  context2D: CanvasRenderingContext2D | undefined;
  pos: Vector2;
  btnState: boolean;
}

export interface IAlgoState {
  canvasRef: HTMLCanvasElement | undefined;
  context2D: CanvasRenderingContext2D | undefined;
  srcPos: Vector2;
  targetPos: Vector2;
  barrierPointsStart: Vector2;
  barrierPointsEnd: Vector2;
  targetFound: boolean;
}

export interface IBarrierState {
  context2D: CanvasRenderingContext2D | undefined;
  srcPos: Vector2;
  targetPos: Vector2;
}
export interface IBarrierProps {
  context2D: CanvasRenderingContext2D;
}

export interface IAlgoProp { }
export interface ICanvasProp { }

export interface IBikeCanvasState {
  context2D: CanvasRenderingContext2D | undefined;
  canvasRef: HTMLCanvasElement | undefined;
}
export interface IBikeCanvasProps { }