export interface AudioMetadata {
    url: string;
    duration: number;
}
export interface AudioData extends AudioMetadata {
    element: HTMLAudioElement;
}
export declare function getAudioMetadata($audio: HTMLAudioElement): AudioMetadata;
export declare type AudioBeforeLoad = (element: HTMLAudioElement) => void;
export declare function loadAudio(url: string, beforeLoad?: AudioBeforeLoad): Promise<AudioData>;
