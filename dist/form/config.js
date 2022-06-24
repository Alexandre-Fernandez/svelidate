"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLocalConfig = exports.svelidateConfig = void 0;
exports.svelidateConfig = {
    mode: "default",
    pattern: {
        symbol: "[!\"#\\$%&'\\(\\)\\*\\+,-\\.\\/: ;<=>\\?@\\[\\]\\^_`}{~\\|\\\\]",
        email: "[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]+",
    },
};
function createLocalConfig(localConfig) {
    const config = structuredClone(exports.svelidateConfig);
    const merge = (obj1, obj2) => {
        for (const key in obj2) {
            if (obj2[key] === null)
                obj1[key] = obj2[key];
            else if (typeof obj2[key] === "object") {
                merge(obj1[key], obj2[key]);
            }
            else
                obj1[key] = obj2[key];
        }
    };
    merge(config, localConfig);
    return config;
}
exports.createLocalConfig = createLocalConfig;
//# sourceMappingURL=config.js.map