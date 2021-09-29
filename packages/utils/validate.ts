export function isDef<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

export function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === 'object';
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function isDate(val: unknown): val is Date {
  return (
    Object.prototype.toString.call(val) === '[object Date]' &&
    !Number.isNaN((val as Date).getTime())
  );
}


export function isNumber(val: string | number): val is string {
  return typeof val === 'number' || /^\d+(\.\d+)?$/.test(val);
}