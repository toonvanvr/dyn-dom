import { Var } from "./var.js";

const dynProxyHandler: ProxyHandler<HTMLElement> = {
  set(target: any, p: PropertyKey, newValue: any, receiver: any) {
    if (newValue instanceof Var) {
      newValue.hook((v) => (receiver[p] = v));
    } else {
      target[p] = newValue;
    }
    return true; // TODO
  },
};

export function dyn(el: HTMLElement): HTMLElement {
  return new Proxy(el, dynProxyHandler);
}
