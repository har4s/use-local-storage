"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useSessionStorage(key, initialValue) {
    const saveToSessionStorage = (valueToStore) => {
        try {
            if (typeof valueToStore === "string") {
                sessionStorage.setItem(key, valueToStore);
            }
            else if (typeof valueToStore === "undefined") {
                sessionStorage.setItem(key, "");
            }
            else {
                sessionStorage.setItem(key, JSON.stringify(valueToStore));
            }
        }
        catch (_a) {
            console.warn(`Could not save ${key} to sessionStorage`);
        }
    };
    function getValue(value, initOrCb) {
        if (initOrCb instanceof Function) {
            const newValue = initOrCb(value);
            saveToSessionStorage(newValue);
            return newValue;
        }
        return value !== null && value !== void 0 ? value : initOrCb;
    }
    const [storedValue, setStoredValue] = (0, react_1.useState)(() => {
        let result;
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
        saveToSessionStorage(valueToStore);
    };
    return [storedValue, setValue];
}
exports.default = useSessionStorage;
//# sourceMappingURL=useSessionStorage.js.map