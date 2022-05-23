export interface CancelablePromise<T> {
  promise: Promise<T>;
  resolve: (value?: T | PromiseLike<T>) => void;
  reject: (value?: any) => void;
  cancel: () => void;
}

export function cancelable<T = unknown>(
  executor: (resolve: (value: T) => void, reject: (reason: any) => void) => {}
) {
  let hasCanceled = false;

  const promise = new Promise<T>((resolve, reject) => {
    const _resolve = (value: T) => {
      if (hasCanceled) {
        reject({ isCanceled: true });
      } else {
        resolve(value);
      }
    };

    const _reject = (reason: any) => {
      if (hasCanceled) {
        reject({ isCanceled: true });
      } else {
        _reject(reason);
      }
    };

    executor(_resolve, _reject);
  });

  return {
    promise: promise,
    cancel: () => {
      hasCanceled = true;
    },
  };
}

export function makeCancelable<T>(promise: Promise<T>) {
  let hasCanceled = false;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise.then(
      (value) => {
        if (hasCanceled) {
          reject({ isCanceled: true });
        } else {
          resolve(value);
        }
      },
      (reason) => {
        if (hasCanceled) {
          reject({ isCanceled: true });
        } else {
          reject(reason);
        }
      }
    );
  });

  return {
    promise: wrappedPromise,
    cancel: () => {
      hasCanceled = true;
    },
  };
}
