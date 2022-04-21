import { Dispatch, SetStateAction } from "react";
export declare type UseSessionStorage<T> = [T, Dispatch<SetStateAction<T>>];
export default function useSessionStorage<T>(key: string, initialValue: SetStateAction<T>): UseSessionStorage<T>;
