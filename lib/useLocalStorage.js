"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useLocalStorage(key, initialValue) {
    const saveToLocalStorage = (valueToStore) => {
        try {
            if (typeof valueToStore === "string") {
                localStorage.setItem(key, valueToStore);
            }
            else if (typeof valueToStore === "undefined") {
                localStorage.setItem(key, "");
            }
            else {
                localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        }
        catch {
            console.warn(`Could not save ${key} to localStorage`);
        }
    };
    function getValue(value, initOrCb) {
        if (initOrCb instanceof Function) {
            const newValue = initOrCb(value);
            saveToLocalStorage(newValue);
            return newValue;
        }
        return value ?? initOrCb;
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
        catch {
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
        saveToLocalStorage(valueToStore);
    };
    return [storedValue, setValue];
}
exports.default = useLocalStorage;
//# sourceMappingURL=useLocalStorage.js.map