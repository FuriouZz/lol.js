export interface VideoMetadata {
    url: string;
    width: number;
    height: number;
    ratio: number;
    poster?: string;
}
export interface VideoData extends VideoMetadata {
    element: HTMLVideoElement;
}
export declare function getVideoMetadata($video: HTMLVideoElement): VideoMetadata;
export declare type VideoBeforeLoad = (element: HTMLVideoElement) => void;
export declare function load(url: string, beforeLoad?: VideoBeforeLoad): Promise<VideoData>;
