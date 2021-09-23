import compareVersions from "compare-versions";

export function isSupportedBrowser(currentBrowser, supprotedBrowsers) {
  return supprotedBrowsers.some((supprotedBrowser) => {
    const isSupportedBrowser =
      supprotedBrowser.name.toLowerCase() === currentBrowser.name;
    const isSupportedVersion =
      !supprotedBrowser.version ||
      compareVersions(currentBrowser.version, supprotedBrowser.version) >= 0;
    return isSupportedBrowser && isSupportedVersion;
  });
}
