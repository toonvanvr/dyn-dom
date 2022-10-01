import { tick } from "../util/timing";

export function settle<In, Out>(
  onSettled: (v: In) => Out,
  ticks = 1
): (v: In) => void {
  let waiting = false;
  let settledValue: In;
  return async function (v: In): Promise<void> {
    if (!waiting) {
      waiting = true;
      for (let i = 0; i < ticks; i++) {
        await tick();
      }
      onSettled(settledValue);
    }
    settledValue = v;
  };
}
