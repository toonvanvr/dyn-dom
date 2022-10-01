import { Var } from "./var.js";

type VarType<T> = T extends Var<infer VarType> ? VarType : never;
type VarTypes<Tuple extends [...Var<any>[]]> = {
  [Index in keyof Tuple]: VarType<Tuple[Index]>;
} & { length: Tuple["length"] };

export function merge<Vars extends Var<unknown>[]>(
  ...vars: Vars
): Var<VarTypes<Vars>> {
  const currentValues = [] as VarTypes<Vars>;
  let idleVars = new Set(vars);
  const mergedVar = new Var<VarTypes<Vars>>();
  const hooks = vars.map((singleVar, idx) =>
    singleVar.hook((v) => {
      currentValues[idx] = v;
      if (idleVars.size !== 0) {
        idleVars.delete(singleVar);
      }
      if (idleVars.size === 0) {
        mergedVar.set([...currentValues] as VarTypes<Vars>);
      }
    })
  );
  mergedVar.onUnhook = () => hooks.forEach((hook) => hook.unhook());
  return mergedVar;
}
