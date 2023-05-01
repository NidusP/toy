export function isString(s: unknown): s is string {
  return typeof s === 'string' || Object.prototype.toString.call(s) === '[object String]';
}
