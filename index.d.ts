import type { ExtractorOptions } from './src/types';

export const getColor = (image: HTMLImageElement, options: ExtractorOptions) => [number, number, number];
export const getColorByUrl = (source: string, options: ExtractorOptions) => PromiseLike<[number, number, number]>;
