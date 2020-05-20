export interface ImageMetadata {
    url: string;
    width: number;
    height: number;
    ratio: number;
}
export interface ImageData extends ImageMetadata {
    element: HTMLImageElement;
}
export declare function metadata($img: HTMLImageElement): ImageMetadata;
export declare function load(url: string): Promise<ImageData>;
