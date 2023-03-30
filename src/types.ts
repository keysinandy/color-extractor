export interface ClipOptions {
  offsetX?: number;
  offsetY?: number;
  width?: number;
  height?: number;
}
export type ExtractorOptions = {
  palette?: PaletteConfig;
  clip?: ClipOptions;
};

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export interface PaletteConfig {
  quality?: number;
  background?: Rgb;
  allowWhite?: boolean;
}

export type GetPlateParamsFn = (
  image: HTMLImageElement,
  options: ExtractorOptions,
) => [Uint8ClampedArray, PaletteConfig | undefined];

export type Colors = [number, number, number];

export type ColorsArray = Array<Colors>;
