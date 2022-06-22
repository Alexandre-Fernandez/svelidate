"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = require("../../utilities/file");
const general_1 = require("../../utilities/general");
const input_1 = require("../../utilities/input");
const validatorCollectionFactory_1 = require("../factories/validatorCollectionFactory");
const filelist = {
    required: (0, validatorCollectionFactory_1.createFileListValidatorWrapperFactory)(value => value.length > 0, () => ({ required: true })),
    files: {
        type: {
            image: (0, validatorCollectionFactory_1.createFileListValidatorWrapperFactory)(value => assert(value, file => (0, file_1.isImage)(file.name)), inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
                file: () => ({ accept: "image/*" }),
            })),
            raster: (0, validatorCollectionFactory_1.createFileListValidatorWrapperFactory)(value => assert(value, file => (0, file_1.isImage)(file.name, "raster")), inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
                file: () => ({ accept: file_1.rasterExtensions.join(",") }),
            })),
            vector: (0, validatorCollectionFactory_1.createFileListValidatorWrapperFactory)(value => assert(value, file => (0, file_1.isImage)(file.name, "vector")), inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
                file: () => ({ accept: file_1.vectorExtensions.join(",") }),
            })),
            video: (0, validatorCollectionFactory_1.createFileListValidatorWrapperFactory)(value => assert(value, file => (0, file_1.isVideo)(file.name)), inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
                file: () => ({ accept: "video/*" }),
            })),
            audio: (0, validatorCollectionFactory_1.createFileListValidatorWrapperFactory)(value => assert(value, file => (0, file_1.isAudio)(file.name)), inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
                file: () => ({ accept: "audio/*" }),
            })),
            is: (allowedExtensions) => (0, validatorCollectionFactory_1.createFileListValidatorWrapperFactory)(value => assert(value, file => allowedExtensions.some(ext => ext === (0, file_1.getExtension)(file.name))), inputType => (0, input_1.getMatchingHtmlValidator)(inputType, {
                file: () => ({
                    accept: allowedExtensions.join(","),
                }),
            })),
        },
        size: {
            gt(size, unit = "b") {
                const bytes = (0, general_1.toBytes)(size, unit);
                return (0, validatorCollectionFactory_1.createFileListValidatorWrapperFactory)(value => assert(value, file => file.size > bytes), () => ({}));
            },
            gte(size, unit = "b") {
                const bytes = (0, general_1.toBytes)(size, unit);
                return (0, validatorCollectionFactory_1.createFileListValidatorWrapperFactory)(value => assert(value, file => file.size >= bytes), () => ({}));
            },
            lt(size, unit = "b") {
                const bytes = (0, general_1.toBytes)(size, unit);
                return (0, validatorCollectionFactory_1.createFileListValidatorWrapperFactory)(value => assert(value, file => file.size < bytes), () => ({}));
            },
            lte(size, unit = "b") {
                const bytes = (0, general_1.toBytes)(size, unit);
                return (0, validatorCollectionFactory_1.createFileListValidatorWrapperFactory)(value => assert(value, file => file.size <= bytes), () => ({}));
            },
            inside(min, max, unit = "b") {
                const bytesMin = (0, general_1.toBytes)(min, unit);
                const bytesMax = (0, general_1.toBytes)(max, unit);
                return (0, validatorCollectionFactory_1.createFileListValidatorWrapperFactory)(value => assert(value, file => file.size >= bytesMin && file.size <= bytesMax), () => ({}));
            },
            outside(min, max, unit = "b") {
                const bytesMin = (0, general_1.toBytes)(min, unit);
                const bytesMax = (0, general_1.toBytes)(max, unit);
                return (0, validatorCollectionFactory_1.createFileListValidatorWrapperFactory)(value => assert(value, file => file.size < bytesMin || file.size > bytesMax), () => ({}));
            },
            neq(size, unit = "b") {
                const bytes = (0, general_1.toBytes)(size, unit);
                return (0, validatorCollectionFactory_1.createFileListValidatorWrapperFactory)(value => assert(value, file => file.size !== bytes), () => ({}));
            },
            eq(size, unit = "b") {
                const bytes = (0, general_1.toBytes)(size, unit);
                return (0, validatorCollectionFactory_1.createFileListValidatorWrapperFactory)(value => assert(value, file => file.size === bytes), () => ({}));
            },
        },
    },
    length: {
        gt(length) {
            return (0, validatorCollectionFactory_1.createFileListValidatorWrapperFactory)(value => value.length > length, () => ({}));
        },
        gte(length) {
            return (0, validatorCollectionFactory_1.createFileListValidatorWrapperFactory)(value => value.length >= length, () => ({}));
        },
        lt(length) {
            return (0, validatorCollectionFactory_1.createFileListValidatorWrapperFactory)(value => value.length < length, () => ({}));
        },
        lte(length) {
            return (0, validatorCollectionFactory_1.createFileListValidatorWrapperFactory)(value => value.length <= length, () => ({}));
        },
        inside(min, max) {
            return (0, validatorCollectionFactory_1.createFileListValidatorWrapperFactory)(value => value.length >= min && value.length <= max, () => ({}));
        },
        outside(min, max) {
            return (0, validatorCollectionFactory_1.createFileListValidatorWrapperFactory)(value => value.length < min && value.length > max, () => ({}));
        },
        neq(length) {
            return (0, validatorCollectionFactory_1.createFileListValidatorWrapperFactory)(value => value.length !== length, () => ({}));
        },
        eq(length) {
            return (0, validatorCollectionFactory_1.createFileListValidatorWrapperFactory)(value => value.length === length, () => ({}));
        },
    },
};
function assert(filelist, assertion) {
    for (let i = 0; i < filelist.length; i++) {
        if (!assertion(filelist[i]))
            return false;
    }
    return true;
}
exports.default = filelist;
//# sourceMappingURL=filelist.js.map