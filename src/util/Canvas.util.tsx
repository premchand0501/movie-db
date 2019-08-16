import { Rect, Vector2 } from "../interface/old/ICanvasProps";

export const drawText = (context2D: CanvasRenderingContext2D, text?: string, fontSize?: number, fontFamily?: string) => {
  fontSize = fontSize ? fontSize : 48;
  fontFamily = fontFamily ? fontFamily : 'san-serif';
  context2D.font = `${fontSize}px ${fontFamily}`;
  context2D.fillStyle = "yellow";
  context2D.textAlign = "start";
  context2D.textBaseline = "bottom";
  context2D.fillText(text!, fontSize!, fontSize!);
}
export const updateGradient = (context2D: CanvasRenderingContext2D, points?: Rect, colors?: string[]) => {
  points = points ? points : { x0: 0, x1: 0, y0: 0, y1: 0 };
  colors = colors && colors.length > 0 ? colors : ['#000000', '#ffffff'];
  context2D.globalCompositeOperation = 'destination-over';
  let gradient: CanvasGradient = context2D!.createLinearGradient(points!.x0, points!.x1, points!.y0, points!.y1);
  let stepIncrementBy: number = 1 / colors!.length;
  let stepStartBy: number = 0;
  colors!.forEach((color) => {
    gradient.addColorStop(stepStartBy += stepIncrementBy, color);
  });
  context2D!.fillStyle = gradient;
  context2D!.fillRect(points!.x0, points!.x1, points!.y0, points!.y1);
}
export const drawRect = (context2D: CanvasRenderingContext2D, points?: Vector2, dim?: Vector2, fillColor?: string) => {
  points = points ? points : { x: 0, y: 0 };
  dim = dim ? dim : { x: 0, y: 0 };
  fillColor = fillColor && fillColor.length > 0 ? fillColor : '#000000';
  // console.log(points, dim, fillColor);
  context2D.fillStyle = fillColor;
  context2D.globalCompositeOperation = 'source-over';
  context2D.clearRect(points!.x, points!.y, dim!.x, dim!.y);
  context2D.fillRect(points!.x, points!.y, dim!.x, dim!.y);
}
export const drawLine = (context2D: CanvasRenderingContext2D, points?: Vector2[], strokeStyle?: string) => {
  strokeStyle = strokeStyle && strokeStyle.length > 0 ? strokeStyle : '#000000';
  context2D.beginPath();
  points!.forEach(point => {
    context2D.lineTo(point.x, point.y);
  });
  context2D.strokeStyle = strokeStyle;
  context2D.stroke();
}
export const drawImage = (context2D: CanvasRenderingContext2D, points?: Vector2, fillColor?: string, src?: NodeRequire) => {
  points = points ? points : { x: 0, y: 0 };
  fillColor = fillColor && fillColor.length > 0 ? fillColor : '#000000';
  context2D.fillStyle = fillColor;
  const imageSrc: HTMLImageElement = new Image();
  imageSrc.src = src ? src : require('../assets/img/bag.jpeg');
  imageSrc.onload = () => {
    console.log(src, imageSrc.width, imageSrc.height);
    context2D.drawImage(imageSrc, imageSrc.width / 2, imageSrc.height / 2, imageSrc.width / 4, imageSrc.height / 4);
  }
}
export const drawImageAnimated = (context2D: CanvasRenderingContext2D, points?: Vector2, fillColor?: string, src?: NodeRequire, angle?: number) => {
  context2D.clearRect(0, 0, context2D.canvas.width, context2D.canvas.height);
  context2D.save();
  points = points ? points : { x: 0, y: 0 };
  fillColor = fillColor && fillColor.length > 0 ? fillColor : '#000000';
  context2D.fillStyle = fillColor;
  const imageSrc: HTMLImageElement = new Image();
  imageSrc.src = src ? src : require('../assets/img/bag.jpeg');
  imageSrc.onload = () => {
    context2D.setTransform(1, 0, 0, 1, 0, 0);
    context2D.rotate(angle! * Math.PI * 180);
    console.log(src, imageSrc.width, imageSrc.height);
    context2D.drawImage(imageSrc, imageSrc.width / 2, imageSrc.height / 2, imageSrc.width / 4, imageSrc.height / 4);
    context2D.restore();
  }
}
export const drawArc = (context2D: CanvasRenderingContext2D, points?: Vector2, fillColor?: string, radius?: number, startAngle?: number, endAngle?: number) => {
  points = points ? points : { x: 0, y: 0 };
  fillColor = fillColor && fillColor.length > 0 ? fillColor : '#000000';
  radius = radius ? radius : 10;
  startAngle = startAngle ? startAngle : 0;
  endAngle = endAngle ? endAngle : 2 * Math.PI;
  context2D.fillStyle = fillColor;
  console.log(points);
  context2D.arc(points!.x, points!.y, radius, startAngle, endAngle);
  context2D.stroke();
  context2D.fill();
}
export const rgbToHex = (r: number, g: number, b: number) => {
  if (r > 255 || g > 255 || b > 255) {
    console.log("Invalid RGB values");
  }
  return ((r << 16) | (g << 8) | b).toString(16);
}