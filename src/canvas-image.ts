import { ClipOptions } from './types';

class CanvasImage {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  options: ClipOptions;
  constructor(image: HTMLImageElement, options?: ClipOptions) {
    this.options = options ?? {};
    const { width, height } = this.options;
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d')!;
    this.canvas.width = image.naturalWidth;
    this.canvas.height = image.naturalHeight;
    this.width = width ?? image.naturalWidth;
    this.height = height ?? image.naturalHeight;
    this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
  }

  getImageData() {
    const { offsetX = 0, offsetY = 0 } = this.options;
    return this.context.getImageData(offsetX, offsetY, this.width, this.height).data;
  }
}

export default CanvasImage;
