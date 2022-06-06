import { Dispatch, SetStateAction } from "react";
export interface UseLocalStorageOptions {
    persistent?: boolean;
}
export declare type UseLocalStorage<T> = [T, Dispatch<SetStateAction<T>>];
export default function useLocalStorage<T>(key: string, initialValue: SetStateAction<T>, options?: UseLocalStorageOptions): UseLocalStorage<T>;
