let isBrowser = false

try {
	if (window) isBrowser = true
} catch (err) {
	isBrowser = false
}

export default isBrowser
