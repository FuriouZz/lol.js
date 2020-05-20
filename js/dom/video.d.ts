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
export declare function metadata($video: HTMLVideoElement): VideoMetadata;
export declare function load(url: string): Promise<VideoData>;
