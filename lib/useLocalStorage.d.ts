import { Dispatch, SetStateAction } from "react";
export declare type UseLocalStorage<T> = [T, Dispatch<SetStateAction<T>>];
export default function useLocalStorage<T>(key: string, initialValue: SetStateAction<T>): UseLocalStorage<T>;
