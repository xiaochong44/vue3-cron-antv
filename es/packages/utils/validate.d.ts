export declare function isDef<T>(val: T): val is NonNullable<T>;
export declare function isFunction(val: unknown): val is Function;
export declare function isObject(val: unknown): val is Record<any, any>;
export declare function isPromise<T = any>(val: unknown): val is Promise<T>;
export declare function isDate(val: unknown): val is Date;
export declare function isNumber(val: string | number): val is string;
