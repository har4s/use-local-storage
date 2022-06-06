"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useLocalStorage(key, initialValue, options) {
    const SSR = typeof window === "undefined";
    let isPersistent = true;
    if (!!options && typeof options.persistent !== "undefined") {
        isPersistent = options.persistent;
    }
    let storage;
    if (!SSR && !isPersistent) {
        storage = sessionStorage;
    }
    else if (!SSR) {
        storage = localStorage;
    }
    const saveToStorage = (valueToStore) => {
        try {
            if (typeof valueToStore === "string") {
                storage.setItem(key, valueToStore);
            }
            else if (typeof valueToStore === "undefined") {
                storage.setItem(key, "");
            }
            else {
                storage.setItem(key, JSON.stringify(valueToStore));
            }
        }
        catch (_a) {
            console.warn(`Could not save ${key} to localStorage`);
        }
    };
    function getValue(value, initOrCb) {
        if (initOrCb instanceof Function) {
            const newValue = initOrCb(value);
            saveToStorage(newValue);
            return newValue;
        }
        return value !== null && value !== void 0 ? value : initOrCb;
    }
    const [storedValue, setStoredValue] = (0, react_1.useState)(() => {
        let result;
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
        }
        catch (_a) {
            // Casting to T (which should resolve to string) because JSON.parse would
            // throw an error if "foo" was passed, but properly casting "true" or "1"
            // to their respective types
            result = item;
        }
        return getValue(result, initialValue);
    });
    const setValue = (value) => {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        saveToStorage(valueToStore);
    };
    if (SSR) {
        return [storedValue, () => { }];
    }
    return [storedValue, setValue];
}
exports.default = useLocalStorage;
//# sourceMappingURL=useLocalStorage.js.map