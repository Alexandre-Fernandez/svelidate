import type { StringUnion } from "../utilities"

export type ByteUnit = "b" | "kb" | "mb" | "gb" | "tb"

export type VectorExtension = ".svg" | ".svgz"

export type RasterExtension =
	| ".tiff"
	| ".pjp"
	| ".jfif"
	| ".bmp"
	| ".gif"
	| ".png"
	| ".xbm"
	| ".dib"
	| ".jxl"
	| ".jpeg"
	| ".jpg"
	| ".webp"
	| ".ico"
	| ".tif"
	| ".pjpeg"
	| ".avif"

export type VideoExtension =
	| ".ogm"
	| ".wmv"
	| ".mpg"
	| ".webm"
	| ".ogv"
	| ".mov"
	| ".asx"
	| ".mpeg"
	| ".mp4"
	| ".m4v"
	| ".avi"

export type AudioExtension =
	| ".opus"
	| ".flac"
	| ".webm"
	| ".weba"
	| ".wav"
	| ".ogg"
	| ".m4a"
	| ".oga"
	| ".mid"
	| ".mp3"
	| ".aiff"
	| ".wma"
	| ".au"

export type OfficeExtension =
	| ".docx"
	| ".docm"
	| ".dotx"
	| ".dotm"
	| ".docb"
	| ".pdf"
	| ".wll"
	| ".wwl"
	| ".xlsx"
	| ".xlsm"
	| ".xltx"
	| ".xltm"
	| ".xlsb"
	| ".xla"
	| ".xlam"
	| ".xll"
	| ".xlw"
	| ".pptx"
	| ".pptm"
	| ".potx"
	| ".potm"
	| ".ppam"
	| ".ppsx"
	| ".ppsm"
	| ".sldx"
	| ".sldm"
	| ".pa"
	| ".adn"
	| ".accdb"
	| ".accdr"
	| ".accdt"
	| ".accda"
	| ".mdw"
	| ".accdt"
	| ".accde"
	| ".mam"
	| ".maq"
	| ".mar"
	| ".mat"
	| ".maf"
	| ".laccdb"
	| ".one"
	| ".ecf"
	| ".xps"

export type CompressedExtension =
	| ".7z"
	| ".arj"
	| ".deb"
	| ".pkg"
	| ".rar"
	| ".rpm"
	| ".tar.gz"
	| ".z"
	| ".zip"

export type MediaExtension = ".bin" | ".dmg" | ".iso" | ".toast" | ".vcd"

export type DataExtension =
	| ".csv"
	| ".dat"
	| ".db"
	| ".dbf"
	| ".log"
	| ".mdb"
	| ".sav"
	| ".sql"
	| ".tar"
	| ".xml"
	| ".json"

export type EmailExtension =
	| ".email"
	| ".eml"
	| ".emlx"
	| ".msg"
	| ".oft"
	| ".ost"
	| ".pst"
	| ".vcf"

export type ExecutableExtension =
	| ".apk"
	| ".bat"
	| ".bin"
	| ".cgi"
	| ".pl"
	| ".com"
	| ".exe"
	| ".gadget"
	| ".jar"
	| ".msi"
	| ".py"
	| ".wsf"

export type WebExtension =
	| ".asp"
	| ".aspx"
	| ".cer"
	| ".cfm"
	| ".cgi"
	| ".pl"
	| ".css"
	| ".htm"
	| ".html"
	| ".js"
	| ".jsp"
	| ".part"
	| ".php"
	| ".py"
	| ".rss"
	| ".xhtml"

export type FontExtension = ".fnt" | ".fon" | ".otf" | ".ttf"

export type ImageExtension = VectorExtension | RasterExtension

export type FileExtension = StringUnion<
	| ImageExtension
	| VideoExtension
	| AudioExtension
	| OfficeExtension
	| CompressedExtension
	| MediaExtension
	| DataExtension
	| EmailExtension
	| ExecutableExtension
	| FontExtension
	| WebExtension
>
