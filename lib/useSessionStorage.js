"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useLocalStorage_1 = require("./useLocalStorage");
function useSessionStorage(key, initialValue, options) {
    return (0, useLocalStorage_1.default)(key, initialValue, Object.assign(Object.assign({}, options), { persistent: false }));
}
exports.default = useSessionStorage;
//# sourceMappingURL=useSessionStorage.js.map