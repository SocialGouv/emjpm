import { Card, Text } from "@emjpm/ui";
import { detect as detectBrowser } from "detect-browser";
import PropTypes from "prop-types";
import React from "react";

import { isUnsupportedBrowser } from "../../util/browser";

const excludedBrowsers = [
  { name: "chrome", version: "44.0.2403" },
  { name: "ie", version: "10" },
  { name: "firefox", version: "68.0" }
];
const currentBrowser = detectBrowser();

export const ExcludeBrowserBanner = () => {
  if (isUnsupportedBrowser(currentBrowser, excludedBrowsers)) {
    return (
      <Card p={3}>
        <Text lineHeight={2} fontWeight="bold" color="error">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.google.com/intl/fr_fr/chrome"
          >
            {`Votre navigateur (${currentBrowser.name} ${currentBrowser.version}) n'est pas compatible avec emjpm. Cliquez ici pour mettre à jour votre navigateur`}
          </a>
        </Text>
      </Card>
    );
  }
  return null;
};

ExcludeBrowserBanner.propTypes = {
  excludedBrowsers: PropTypes.arrayOf(PropTypes.string)
};

ExcludeBrowserBanner.defaultProps = {
  excludedBrowsers: []
};

export default ExcludeBrowserBanner;
