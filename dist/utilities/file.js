"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtension = exports.isAudio = exports.isVideo = exports.isImage = exports.audioExtensions = exports.videoExtensions = exports.rasterExtensions = exports.vectorExtensions = void 0;
exports.vectorExtensions = ["svg", "svgz"];
exports.rasterExtensions = [
    ".tiff",
    ".pjp",
    ".jfif",
    ".bmp",
    ".gif",
    ".png",
    ".xbm",
    ".dib",
    ".jxl",
    ".jpeg",
    ".jpg",
    ".webp",
    ".ico",
    ".tif",
    ".pjpeg",
    ".avif",
];
exports.videoExtensions = [
    ".ogm",
    ".wmv",
    ".mpg",
    ".webm",
    ".ogv",
    ".mov",
    ".asx",
    ".mpeg",
    ".mp4",
    ".m4v",
    ".avi",
];
exports.audioExtensions = [
    ".opus",
    ".flac",
    ".webm",
    ".weba",
    ".wav",
    ".ogg",
    ".m4a",
    ".oga",
    ".mid",
    ".mp3",
    ".aiff",
    ".wma",
    ".au",
];
function isImage(filename, type) {
    const extension = getExtension(filename);
    switch (type) {
        case "raster":
            return exports.rasterExtensions.some(ext => ext === extension);
        case "vector":
            return exports.vectorExtensions.some(ext => ext === extension);
        case undefined:
            return (exports.rasterExtensions.some(ext => ext === extension) ||
                exports.vectorExtensions.some(ext => ext === extension));
    }
}
exports.isImage = isImage;
function isVideo(filename) {
    const extension = getExtension(filename);
    return exports.videoExtensions.some(ext => ext === extension);
}
exports.isVideo = isVideo;
function isAudio(filename) {
    const extension = getExtension(filename);
    return exports.audioExtensions.some(ext => ext === extension);
}
exports.isAudio = isAudio;
function getExtension(filename) {
    const index = filename.lastIndexOf(".");
    if (index === -1)
        return undefined;
    return filename.substring(index);
}
exports.getExtension = getExtension;
//# sourceMappingURL=file.js.map