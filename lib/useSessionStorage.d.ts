import { SetStateAction } from "react";
import { UseLocalStorage, UseLocalStorageOptions } from "./useLocalStorage";
export interface UseSessionStorageOptions extends Omit<UseLocalStorageOptions, "persistent"> {
}
export default function useSessionStorage<T>(key: string, initialValue: SetStateAction<T>, options?: UseLocalStorageOptions): UseLocalStorage<T>;
