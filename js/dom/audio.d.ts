export interface AudioMetadata {
    url: string;
    duration: number;
}
export declare function metadata($audio: HTMLAudioElement): AudioMetadata;
export declare function load(url: string): Promise<AudioMetadata>;
