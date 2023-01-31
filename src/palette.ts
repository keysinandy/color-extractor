import { PaletteConfig, Rgb } from './types';

type ColorArray = Array<[number, number, number]>;

const getAverageColor = (colorArray: ColorArray) => {
  const len = colorArray.length;
  let count = 0;
  const rgb: Rgb = {
    r: 0,
    g: 0,
    b: 0,
  };

  for (let r, g, b, i = 0; i < len; i += 1) {
    r = colorArray[i][0];
    g = colorArray[i][1];
    b = colorArray[i][2];

    rgb.r += r;
    rgb.g += g;
    rgb.b += b;

    count++;
  }

  return [~~(rgb.r / count), ~~(rgb.g / count), ~~(rgb.b / count)];
};

const createQualityBitMap = ({
  bitMap,
  quality,
  background = { r: 255, g: 255, b: 255 },
  allowWhite,
}: {
  bitMap: Uint8ClampedArray;
  quality: number;
  background: Rgb;
  allowWhite: boolean;
}) => {
  const step = 4;
  const colorMap: ColorArray = [];
  for (let r, g, b, a, i = 0; i < bitMap.length; i += step * quality) {
    r = bitMap[i + 0];
    g = bitMap[i + 1];
    b = bitMap[i + 2];
    a = bitMap[i + 3];
    if (a < 255) {
      const alpha = a / 255;
      r = r * alpha + background.r * (1 - alpha);
      g = g * alpha + background.g * (1 - alpha);
      b = b * alpha + background.b * (1 - alpha);
    }
    if (allowWhite || !(r > 250 && g > 250 && b > 250)) {
      colorMap.push([r, g, b]);
    }
  }
  return colorMap;
};

class Palette {
  bitmap: Uint8ClampedArray;
  options: PaletteConfig;
  constructor(bitmap: Uint8ClampedArray, options?: PaletteConfig) {
    this.bitmap = bitmap;

    const defaultOptions: PaletteConfig = {
      quality: 10,
      background: {
        r: 255,
        g: 255,
        b: 255,
      },
      allowWhite: false,
    };

    this.options = { ...defaultOptions, ...options };
  }

  // TODO: implement getPalette
  getPalette() {
    const { quality, background, allowWhite } = this.options;
    const colorArray = createQualityBitMap({
      bitMap: this.bitmap,
      background: background!,
      quality: quality!,
      allowWhite: allowWhite!,
    });
    return getAverageColor(colorArray);
  }
}

export default Palette;
