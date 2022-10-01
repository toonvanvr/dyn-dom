import { merge } from "../var/merge.js";
import { Var } from "../var/var.js";

// TODO: readonly/writeablekeys fix
const dynProxyHandler: ProxyHandler<any> = {
  set(target: any, p: PropertyKey, newValue: any, receiver: any) {
    if (newValue instanceof Var) {
      newValue.hook((v) => (receiver[p] = v));
    } else {
      target[p] = newValue;
    }
    return true; // TODO
  },
  get(target: any, p: keyof typeof target, receiver: any) {
    const value = target[p];
    switch (typeof value) {
      case "function":
        return new Proxy(value, {
          apply(_0, _1, args) {
            const derivedArgs = Array(args.length);
            const argsMap: number[] = [];
            const vars: Var<any>[] = [];
            for (const [i, val] of args.entries()) {
              if (val instanceof Var) {
                argsMap.push(i);
                vars.push(val);
              } else {
                derivedArgs[i] = val;
              }
            }
            if (vars.length) {
              merge(...vars).hook((vals) => {
                for (const [i, val] of vals.entries()) {
                  derivedArgs[argsMap[i]] = val;
                }
                (target[p] as (...args: any[]) => any)(...derivedArgs);
              });
              // TODO: bind hook to element with Lib symbol so it gets removed on destroy
            } else {
              (target[p] as (...args: any[]) => any)(...derivedArgs);
            }
          },
        });
      case "object":
        return dyn(value);
      case "bigint":
      case "boolean":
      case "number":
      case "symbol":
      case "undefined":
      default:
        return value;
    }
  },
};

export function dyn<T>(value: T): T {
  return new Proxy(value, dynProxyHandler);
}
