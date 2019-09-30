export declare function $enumerable(obj: any, property: string, value: boolean): any;
export declare function $configurable(obj: any, property: string, value: boolean): any;
export declare function $writable(obj: any, property: string, value: boolean): any;
export declare function $setter(obj: any, property: string, setter: (v: any) => void): any;
export declare function $getter(obj: any, property: string, getter: () => any): any;
export declare function $define(obj: any, property: string, descriptor: PropertyDescriptor & ThisType<any>): any;
export declare function $readOnly(obj: any, property: string): any;
export declare function $private(obj: any, property: string): any;
