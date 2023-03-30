import CanvasImage from './canvas-image';
import Palette from './palette';
import { Colors, ExtractorOptions, GetPlateParamsFn } from './types';

const getPlateParams: GetPlateParamsFn = (image, options = {}) => {
  const { clip, palette } = options;
  const canvas = new CanvasImage(image, clip);
  const imageData = canvas.getImageData();
  return [imageData, palette];
};

const getColorByUrl = (
  source: string,
  options: ExtractorOptions = {},
  callback: (image: HTMLImageElement, options?: ExtractorOptions) => Colors,
) => {
  return new Promise((resolve, reject) => {
    try {
      const img = document.createElement('img');
      img.src = source;
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        resolve(callback(img, options));
        img.remove();
      };
    } catch (error) {
      reject(error);
    }
  });
};

export const getAverageColor = (image: HTMLImageElement, options: ExtractorOptions = {}) => {
  const [imageData, palette] = getPlateParams(image, options);
  return new Palette(imageData, palette).getAverage();
};

export const getAverageByUrl = async (source: string, options: ExtractorOptions = {}) => {
  return await getColorByUrl(source, options, getAverageColor);
};
