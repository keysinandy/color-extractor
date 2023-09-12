interface ClipOptions {
    offsetX?: number;
    offsetY?: number;
    width?: number;
    height?: number;
}
type ExtractorOptions = {
    palette?: PaletteConfig;
    clip?: ClipOptions;
};
interface Rgb {
    r: number;
    g: number;
    b: number;
}
interface PaletteConfig {
    quality?: number;
    background?: Rgb;
    allowWhite?: boolean;
}
type Color = [number, number, number];

interface ResolveImgFn {
    (image: HTMLImageElement, options?: Partial<ExtractorOptions>): any;
}
type ResolveImgFnParams = Parameters<ResolveImgFn>;
declare const getColor: (...params: ResolveImgFnParams) => Color;
declare const getPalette: (...params: ResolveImgFnParams) => Color[];
declare const getByUrl: <T extends ResolveImgFn>(fn: T, source: string, options?: ExtractorOptions) => PromiseLike<ReturnType<T>>;
declare const getAsync: <T extends ResolveImgFn>(fn: T, base64: string, options?: ExtractorOptions) => PromiseLike<ReturnType<T>>;
declare const getPaletteByUrl: (source: string, options?: ExtractorOptions) => PromiseLike<Color[]>;
declare const getPaletteByBase64: (source: string, options?: ExtractorOptions) => PromiseLike<Color[]>;

export { type ResolveImgFn, getAsync, getByUrl, getColor, getPalette, getPaletteByBase64, getPaletteByUrl };
