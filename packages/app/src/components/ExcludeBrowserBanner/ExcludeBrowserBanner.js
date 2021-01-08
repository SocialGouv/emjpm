import { detect as detectBrowser } from "detect-browser";
import PropTypes from "prop-types";

import { Card, Text } from "~/ui";
import { isUnsupportedBrowser } from "~/util/browser";

const excludedBrowsers = [
  { name: "chrome", version: "44.0.2403" },
  { name: "ie", version: "10" },
  { name: "firefox", version: "68.0" },
];
const currentBrowser = detectBrowser();

export function ExcludeBrowserBanner() {
  if (isUnsupportedBrowser(currentBrowser, excludedBrowsers)) {
    return (
      <Card p={3}>
        <Text lineHeight={2} fontWeight="bold" color="error">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.mozilla.org/fr/firefox/"
          >
            {`La plateforme e-MJPM n'est pas compatible avec votre navigateur (${currentBrowser.name} ${currentBrowser.version}). Nous vous conseillons d'utiliser une version récente de Firefox pour profiter pleinement des fonctionnalités d'eMJPM. Veuillez cliquer ici pour installer ou mettre à jour ce navigateur libre.`}
          </a>
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
