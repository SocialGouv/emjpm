/**
 * Capitalize the first letter
 * @param {String} string - string to capitalize
 * @returns {String} - capitamized string
 */
export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
