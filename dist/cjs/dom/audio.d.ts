export interface AudioMetadata {
    url: string;
    duration: number;
}
export interface AudioData extends AudioMetadata {
    element: HTMLAudioElement;
}
export declare function metadata($audio: HTMLAudioElement): AudioMetadata;
export declare function load(url: string): Promise<AudioData>;
