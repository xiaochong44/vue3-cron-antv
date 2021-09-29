export function isDef(val) {
    return val !== undefined && val !== null;
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(val) {
    return typeof val === 'function';
}
export function isObject(val) {
    return val !== null && typeof val === 'object';
}
export function isPromise(val) {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}
export function isDate(val) {
    return (Object.prototype.toString.call(val) === '[object Date]' &&
        !Number.isNaN(val.getTime()));
}
export function isNumber(val) {
    return typeof val === 'number' || /^\d+(\.\d+)?$/.test(val);
}
//# sourceMappingURL=validate.js.map