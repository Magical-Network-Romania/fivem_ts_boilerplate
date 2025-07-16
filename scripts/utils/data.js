//@ts-check

/**
 * Reduces an array into a formatted string.
 * @param {string} name The name of the section.
 * @param {string[]} [files] The array of file names.
 * @returns {string} The reduced string or an empty string if the array is empty.
 */
export function reduceArray(name, files = []) {
	// Return empty string if files is empty or falsy
	if (!files || files.length === 0 || !files[0]) return "";

	const formattedFiles = files
		.filter(Boolean)
		.map((file) => `\n\t'${file}',`)
		.join("");

	return `\n${name} {${formattedFiles}\n}\n`;
}

/**
 * Reduces an object into a formatted string.
 * @param {Record<string, string>} object - The object to reduce.
 * @returns {string} The reduced string.
 */
export function reduceObject(object) {
	return Object.entries(object).reduce((acc, [key, value]) => {
		return value ? `${acc}${key} '${value}'\n` : acc;
	}, "");
}
