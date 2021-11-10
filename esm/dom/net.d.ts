export interface IXHROptions {
    method?: string;
    responseType?: XMLHttpRequestResponseType;
    mimeType?: string;
    timeout?: number;
    headers?: {
        [key: string]: string;
    };
    data?: any;
}
export interface IXHRResponse<T = any> {
    request: XMLHttpRequest;
    response: T;
}
export declare class Net {
    static xhr(url: string, options?: IXHROptions): Promise<IXHRResponse<any>>;
    static text(url: string, options?: IXHROptions): Promise<IXHRResponse<string>>;
    static json(url: string, options?: IXHROptions): Promise<IXHRResponse<object>>;
    static bytes(url: string, options?: IXHROptions): Promise<IXHRResponse<ArrayBuffer>>;
}
