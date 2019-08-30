declare type TFileResponse = "arraybuffer" | "binarystring" | "dataurl" | "text";
export interface FileResponse {
    file: File;
    type: TFileResponse;
    reader: FileReader;
    response: string | ArrayBuffer;
}
export declare function load(file: File, type: TFileResponse): Promise<FileResponse>;
export {};
