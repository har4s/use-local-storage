import { renderHook } from "@testing-library/react-hooks";

import useSessionStorage from "./useSessionStorage";
import useLocalStorage from "./useLocalStorage";

const key = "exampleKey";
const initialValue = "exampleValue";

beforeEach(() => {
  sessionStorage.clear();
});

describe("useSessionStorage", () => {
  it("properly inits from value", () => {
    expect(sessionStorage.getItem(key)).toBe(null);

    const { result: resultUseSessionStorage } = renderHook(() =>
      useSessionStorage(key, initialValue)
    );
    const { result: resultUseLocalStorage } = renderHook(() =>
      useSessionStorage(key, initialValue, { persistent: false })
    );

    expect(resultUseSessionStorage.current[0]).toBe(initialValue);
    expect(resultUseLocalStorage.current[0]).toBe(initialValue);
  });
});
