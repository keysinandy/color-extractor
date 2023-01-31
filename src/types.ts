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
