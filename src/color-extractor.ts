import CanvasImage from 'canvas-image';
import Palette from 'palette';
import { ExtractorOptions } from 'types';

export const getColor = (image: HTMLImageElement, options: ExtractorOptions = {}) => {
  const { clip, palette } = options;
  const canvas = new CanvasImage(image, clip);
  const imageData = canvas.getImageData();
  const color = new Palette(imageData, palette).getPalette();
  return color;
};

export const getColorByUrl = (source: string, options: ExtractorOptions = {}) => {
  return new Promise((resolve, reject) => {
    try {
      const img = document.createElement('img');
      img.src = source;
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        resolve(getColor(img, options));
        img.remove();
      };
    } catch (error) {
      reject(error);
    }
  });
};
