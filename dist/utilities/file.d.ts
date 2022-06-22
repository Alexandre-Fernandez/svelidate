import type { AudioExtension, RasterExtension, VectorExtension, VideoExtension } from "../types";
export declare const vectorExtensions: VectorExtension[];
export declare const rasterExtensions: RasterExtension[];
export declare const videoExtensions: VideoExtension[];
export declare const audioExtensions: AudioExtension[];
export declare function isImage(filename: string, type?: "raster" | "vector"): boolean;
export declare function isVideo(filename: string): boolean;
export declare function isAudio(filename: string): boolean;
export declare function getExtension(filename: string): string | undefined;
