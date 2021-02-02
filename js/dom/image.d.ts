export interface ImageMetadata {
    url: string;
    width: number;
    height: number;
    ratio: number;
}
export interface ImageData extends ImageMetadata {
    element: HTMLImageElement;
}
export declare function getImageMetadata($img: HTMLImageElement): ImageMetadata;
export declare type ImageBeforeLoad = (element: HTMLImageElement) => void;
export declare function loadImage(url: string, beforeLoad?: ImageBeforeLoad): Promise<ImageData>;
