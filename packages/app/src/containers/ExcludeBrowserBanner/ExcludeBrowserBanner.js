import { detect as detectBrowser } from "detect-browser";
import PropTypes from "prop-types";

import { Card, Text } from "~/components";
import { isSupportedBrowser } from "~/utils/browser";

const excludedBrowsers = [
  { name: "chrome", version: "44.0.2403" },
  { name: "edge-chromium", version: "94.0" },
  { name: "firefox", version: "68.0" },
];
const currentBrowser = detectBrowser();

export function ExcludeBrowserBanner() {
  if (!isSupportedBrowser(currentBrowser, excludedBrowsers)) {
    return (
      <Card p={3}>
        <Text
          lineHeight={2}
          fontSize={13}
          fontWeight="bold"
          color="error"
          role="alert"
        >
          {`eMJPM n'est pas compatible avec votre navigateur (${currentBrowser.name} ${currentBrowser.version}).`}
          <br />
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.mozilla.org/fr/firefox/"
          >
            {`Nous vous conseillons d'utiliser une version récente de Firefox (cliquer ici). `}
          </a>
          <br />
          eMJPM est également compatible avec les navigateurs Chrome et Edge
          Chromium.
        </Text>
      </Card>
    );
  }
  return null;
}

ExcludeBrowserBanner.propTypes = {
  excludedBrowsers: PropTypes.arrayOf(PropTypes.string),
};

ExcludeBrowserBanner.defaultProps = {
  excludedBrowsers: [],
};
