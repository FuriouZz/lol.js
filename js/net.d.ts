export interface IXHROptions {
    method?: string;
    responseType?: XMLHttpRequestResponseType;
    mimeType?: string;
    headers?: {
        [key: string]: string;
    };
    data?: any;
}
export interface IXHRResponse {
    request: XMLHttpRequest;
    response: any;
}
export declare class Net {
    static xhr(url: string, options?: IXHROptions): Promise<IXHRResponse>;
    static text(url: string, options?: IXHROptions): Promise<IXHRResponse>;
    static json(url: string, options?: IXHROptions): Promise<IXHRResponse>;
    static bytes(url: string, options?: IXHROptions): Promise<IXHRResponse>;
}
