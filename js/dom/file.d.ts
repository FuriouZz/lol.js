declare type TFileResponse = "arraybuffer" | "binarystring" | "dataurl" | "text";
export interface FileResponse {
    file: File;
    type: TFileResponse;
    reader: FileReader;
    response: string | ArrayBuffer;
}
export declare type FileBeforeLoad = (element: FileReader) => void;
export declare function loadFile(file: File, type: TFileResponse, beforeLoad?: FileBeforeLoad): Promise<FileResponse>;
export {};
