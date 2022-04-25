import { shuffle } from "./array";

export function createIterator<T>(
  arr: T[],
  options = { loop: false, random: false }
): Iterator<T> {
  let index = -1;
  const end = arr.length;
  arr = options.random ? shuffle(arr) : arr;

  const iterator: Iterator<T> = {
    next() {
      if (index < end - 1) {
        index++;
        return { value: arr[index], done: false };
      } else if (options.loop) {
        if (options.random) arr = shuffle(arr);

        index = -1;
        return iterator.next();
      }

      return { value: arr[index - 1], done: true };
    },
  };

  return iterator;
}
