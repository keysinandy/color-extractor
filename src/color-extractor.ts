import CanvasImage from './canvas-image';
import Palette from './palette';
import { Color, ExtractorOptions } from './types';
import { getImageByUrl } from './utils';

export interface ResolveImgFn {
  (image: HTMLImageElement, options?: Partial<ExtractorOptions>): any;
}

type ResolveImgFnParams = Parameters<ResolveImgFn>;

export const getColor: (...params: ResolveImgFnParams) => Color = (image, options) => {
  const { clip, palette } = options ?? {};
  const canvas = new CanvasImage(image, clip);
  const imageData = canvas.getImageData();
  return new Palette(imageData, palette).getPalette()[0];
};

export const getPalette: (...params: ResolveImgFnParams) => Color[] = (image, options) => {
  const { clip, palette } = options ?? {};
  const canvas = new CanvasImage(image, clip);
  const imageData = canvas.getImageData();
  return new Palette(imageData, palette).getPalette();
};

export const getByUrl = <T extends ResolveImgFn>(
  fn: T,
  source: string,
  options?: ExtractorOptions,
): PromiseLike<ReturnType<T>> => {
  return new Promise((resolve, reject) => {
    try {
      getImageByUrl(source).then((res) => {
        resolve(fn(res, options));
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getAsync = <T extends ResolveImgFn>(
  fn: T,
  base64: string,
  options?: ExtractorOptions,
): PromiseLike<ReturnType<T>> => {
  return new Promise((resolve, reject) => {
    try {
      const img = document.createElement('img');
      img.addEventListener('load', function () {
        resolve(fn(img, options));
      });
      img.src = base64;
    } catch (error) {
      reject(error);
    }
  });
};

export const getPaletteByUrl = (source: string, options?: ExtractorOptions) => getByUrl(getPalette, source, options);
export const getPaletteByBase64 = (source: string, options?: ExtractorOptions) => getAsync(getPalette, source, options);
