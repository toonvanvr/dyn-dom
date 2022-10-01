import { nil, Nil } from "./symbols.js";

export type Hook<T> = (value: T) => void;

export class Var<T> {
  private hooks = new Set<Hook<T>>();

  constructor(private value: Nil | T = nil) {}

  hook(hook: Hook<T>): () => void {
    this.hooks.add(hook);
    return () => this.hook;
  }

  set(value: T) {
    this.value = value;
    for (const hook of this.hooks) {
      hook(value);
    }
  }
}
