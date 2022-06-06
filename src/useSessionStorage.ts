import { SetStateAction } from "react";
import useLocalStorage, {
  UseLocalStorage,
  UseLocalStorageOptions,
} from "./useLocalStorage";

export interface UseSessionStorageOptions
  extends Omit<UseLocalStorageOptions, "persistent"> {}

export default function useSessionStorage<T>(
  key: string,
  initialValue: SetStateAction<T>,
  options?: UseLocalStorageOptions
): UseLocalStorage<T> {
  return useLocalStorage(key, initialValue, { ...options, persistent: false });
}
