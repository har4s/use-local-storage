import { Dispatch, SetStateAction, useState } from "react";

export interface UseLocalStorageOptions {
  persistent?: boolean;
}

export type UseLocalStorage<T> = [T, Dispatch<SetStateAction<T>>];
export default function useLocalStorage<T>(
  key: string,
  initialValue: SetStateAction<T>,
  options?: UseLocalStorageOptions
): UseLocalStorage<T> {
  let isPersistent: boolean = true;

  if (!!options && typeof options.persistent !== "undefined") {
    isPersistent = options.persistent;
  }

  let storage: Storage;
  if (isPersistent) {
    storage = localStorage;
  } else {
    storage = sessionStorage;
  }

  const saveToLocalStorage = (valueToStore: T) => {
    try {
      if (typeof valueToStore === "string") {
        storage.setItem(key, valueToStore);
      } else if (typeof valueToStore === "undefined") {
        storage.setItem(key, "");
      } else {
        storage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch {
      console.warn(`Could not save ${key} to localStorage`);
    }
  };

  function getValue(value: T, initOrCb: SetStateAction<T>): T {
    if (initOrCb instanceof Function) {
      const newValue = initOrCb(value);
      saveToLocalStorage(newValue);
      return newValue;
    }

    return value ?? initOrCb;
  }

  const [storedValue, setStoredValue] = useState<T>(() => {
    let result: T;
    const item = localStorage.getItem(key);

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
    saveToLocalStorage(valueToStore);
  };

  if (typeof window === "undefined") {
    return [storedValue, () => {}];
  }

  return [storedValue, setValue];
}
