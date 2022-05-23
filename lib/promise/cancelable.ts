export interface CancelablePromise<T> {
  promise: Promise<T>;
  resolve: (value?: T | PromiseLike<T>) => void;
  reject: (value?: any) => void;
  cancel: () => void;
}

export function cancelable<T = unknown>(
  executor: (resolve: (value: T) => void, reject: (reason: any) => void) => {}
) {
  return makeCancelable(new Promise<T>(executor));
}

export function makeCancelable<T>(promise: Promise<T>) {
  let hasCanceled = false;
  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then((value) => {
      if (hasCanceled) {
        reject({ isCanceled: true });
      } else {
        resolve(value);
      }
    });
    promise.catch((reason) => {
      if (hasCanceled) {
        reject({ isCanceled: true });
      } else {
        reject(reason);
      }
    });
  });

  return {
    promise: wrappedPromise,
    cancel: () => (hasCanceled = true),
  };
}
