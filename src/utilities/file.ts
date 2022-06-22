import type {
	AudioExtension,
	RasterExtension,
	VectorExtension,
	VideoExtension,
} from "../types"

export const vectorExtensions: VectorExtension[] = ["svg", "svgz"]
export const rasterExtensions: RasterExtension[] = [
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
]

export const videoExtensions: VideoExtension[] = [
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
]

export const audioExtensions: AudioExtension[] = [
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
]

export function isImage(filename: string, type?: "raster" | "vector") {
	const extension = getExtension(filename)
	switch (type) {
		case "raster":
			return rasterExtensions.some(ext => ext === extension)
		case "vector":
			return vectorExtensions.some(ext => ext === extension)
		case undefined:
			return (
				rasterExtensions.some(ext => ext === extension) ||
				vectorExtensions.some(ext => ext === extension)
			)
	}
}

export function isVideo(filename: string) {
	const extension = getExtension(filename)
	return videoExtensions.some(ext => ext === extension)
}

export function isAudio(filename: string) {
	const extension = getExtension(filename)
	return audioExtensions.some(ext => ext === extension)
}

export function getExtension(filename: string) {
	const index = filename.lastIndexOf(".")
	if (index === -1) return undefined
	return filename.substring(index)
}
