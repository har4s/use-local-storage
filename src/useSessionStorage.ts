import { Dispatch, SetStateAction, useState } from "react";

export type UseSessionStorage<T> = [T, Dispatch<SetStateAction<T>>];
export default function useSessionStorage<T>(
  key: string,
  initialValue: SetStateAction<T>
): UseSessionStorage<T> {
  const saveToSessionStorage = (valueToStore: T) => {
    try {
      if (typeof valueToStore === "string") {
        sessionStorage.setItem(key, valueToStore);
      } else if (typeof valueToStore === "undefined") {
        sessionStorage.setItem(key, "");
      } else {
        sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch {
      console.warn(`Could not save ${key} to sessionStorage`);
    }
  };

  function getValue(value: T, initOrCb: SetStateAction<T>): T {
    if (initOrCb instanceof Function) {
      const newValue = initOrCb(value);
      saveToSessionStorage(newValue);
      return newValue;
    }

    return value ?? initOrCb;
  }

  const [storedValue, setStoredValue] = useState<T>(() => {
    let result: T;
    const item = sessionStorage.getItem(key);

    if (item === null) {
      return getValue(null, initialValue);
    }

    try {
      const parsed = JSON.parse(item);
      if (!parsed) {
        throw new Error("Empty value");
      }

      result = parsed;
    } catch {
      // Casting to T (which should resolve to string) because JSON.parse would
      // throw an error if "foo" was passed, but properly casting "true" or "1"
      // to their respective types
      result = item as unknown as T;
    }

    return getValue(result, initialValue);
  });

  const setValue = (value: SetStateAction<T>) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    saveToSessionStorage(valueToStore);
  };

  return [storedValue, setValue];
}
