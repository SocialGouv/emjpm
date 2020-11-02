import compareVersions from "compare-versions";

export function isUnsupportedBrowser(currentBrowser, excludedBrowsers) {
  return excludedBrowsers.some((excludedBrowser) => {
    const isRestrictedBrowser =
      excludedBrowser.name.toLowerCase() === currentBrowser.name;
    const isUnsupportedVersion =
      !excludedBrowser.version ||
      compareVersions(currentBrowser.version, excludedBrowser.version) <= 0;
    return isRestrictedBrowser && isUnsupportedVersion;
  });
}

export function isBrowser() {
  return typeof window !== "undefined";
}
