/**
 * 浏览器相关
 *
 * */

export function baseTopLeft() {
  const baseTop = window.pageYOffset - document.documentElement.clientTop;
  const baseLeft = window.pageXOffset - document.documentElement.clientLeft;

  return [baseTop, baseLeft] as const;
}
