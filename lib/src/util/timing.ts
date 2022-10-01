export function tick(): Promise<void> {
  return new Promise(function (resolve) {
    setTimeout(resolve);
  });
}
