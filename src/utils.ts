import { Rgb } from './types';

export const rgbToHsl = (rgb: Rgb) => {
  let { r, g, b } = rgb;
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h: number, s: number;
  const l: number = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
        break;
    }
    h /= 6;
  }
  return [h, s, l];
};

export const isDark = (rgb: Rgb) => {
  const [, , l] = rgbToHsl(rgb);
  return l < 0.5;
};

export const getImageByUrl = (source: string): PromiseLike<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    try {
      const img = document.createElement('img');
      img.crossOrigin = 'Anonymous';
      img.src = source;
      img.onload = () => {
        resolve(img);
      };
    } catch (error) {
      reject(error);
    }
  });
};

export const getImageData = (imageUrl: string) => {
  return new Promise((resolve, reject) => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', imageUrl, true);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function () {
        if (this.status === 200) {
          const uInt8Array = new Uint8Array(this.response);
          const len = uInt8Array.length;
          const binaryString = new Array(len);
          for (let i = 0; i < uInt8Array.length; i++) {
            binaryString[i] = String.fromCharCode(uInt8Array[i]);
          }
          const data = binaryString.join('');
          const base64 = window.btoa(data);
          resolve('data:image/png;base64,' + base64);
        }
      };
      xhr.send();
    } catch (e) {
      reject(e);
    }
  });
};
