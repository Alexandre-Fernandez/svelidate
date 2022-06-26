import type {
	AudioExtension,
	RasterExtension,
	VectorExtension,
	VideoExtension,
} from "../../types/misc"

export const addSubstract = Object.freeze({
	"+": (a: number, b: number) => a + b,
	"-": (a: number, b: number) => a - b,
})

// ANCHOR Date

export const MINUTE = 60000
export const DAY = MINUTE * 60 * 24
export const WEEK = DAY * 7
export const MONTH = DAY * 31

// ANCHOR File

export const vectorExtensions: VectorExtension[] = [".svg", ".svgz"]
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
