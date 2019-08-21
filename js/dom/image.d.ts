export interface ImageMetadata {
    url: string;
    width: number;
    height: number;
    ratio: number;
}
export declare function metadata($img: HTMLImageElement): ImageMetadata;
export declare function load(url: string): Promise<ImageMetadata & {
    element: HTMLImageElement;
}>;
