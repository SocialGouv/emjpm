/*global tarteaucitron, Piwik*/
/*jslint regexp: true, nomen: true*/
// google analytics

/*
    1. Set the following variable before the initialization :
    tarteaucitron.user.matomoId = YOUR_SITE_ID_FROM_MATOMO;
    tarteaucitron.user.matomoHost = "YOUR_MATOMO_URL"; //eg: https://stat.mydomain.com/
    2. Push the service :
    (tarteaucitron.job = tarteaucitron.job || []).push('matomo');
    3. HTML
    You don't need to add any html code, if the service is autorized, the javascript is added. otherwise no.
 */
tarteaucitron.services.matomo = {
  cookies: [
    "_pk_ref",
    "_pk_cvar",
    "_pk_id",
    "_pk_ses",
    "_pk_hsr",
    "piwik_ignore",
    "_pk_uid",
  ],
  js: function () {
    "use strict";
    if (tarteaucitron.user.matomoId === undefined) {
      return;
    }

    window._paq = window._paq || [];
    window._paq.push(["setSiteId", tarteaucitron.user.matomoId]);
    window._paq.push([
      "setTrackerUrl",
      tarteaucitron.user.matomoHost + "piwik.php",
    ]);
    window._paq.push(["setDoNotTrack", 1]);
    window._paq.push(["trackPageView"]);
    window._paq.push(["setIgnoreClasses", ["no-tracking", "colorbox"]]);
    window._paq.push(["enableLinkTracking"]);
    window._paq.push([
      function () {
        var self = this;
        function getOriginalVisitorCookieTimeout() {
          var now = new Date(),
            nowTs = Math.round(now.getTime() / 1000),
            visitorInfo = self.getVisitorInfo();
          var createTs = parseInt(visitorInfo[2]);
          var cookieTimeout = 33696000; // 13 mois en secondes
          var originalTimeout = createTs + cookieTimeout - nowTs;
          return originalTimeout;
        }
        this.setVisitorCookieTimeout(getOriginalVisitorCookieTimeout());
      },
    ]);

    tarteaucitron.addScript(
      tarteaucitron.user.matomoHost + "piwik.js",
      "",
      "",
      true,
      "defer",
      true
    );

    // waiting for piwik to be ready to check first party cookies
    var interval = setInterval(function () {
      if (typeof Piwik === "undefined") return;

      clearInterval(interval);

      // make piwik/matomo cookie accessible by getting tracker
      Piwik.getTracker();

      // looping throught cookies
      var theCookies = document.cookie.split(";");
      for (var i = 1; i <= theCookies.length; i++) {
        var cookie = theCookies[i - 1].split("=");
        var cookieName = cookie[0].trim();

        // if cookie starts like a piwik one, register it
        if (cookieName.indexOf("_pk_") === 0) {
          tarteaucitron.services.matomo.cookies.push(cookieName);
        }
      }
    }, 100);
  },
  key: "matomo",
  name: "Matomo (formerly known as Piwik)",
  needConsent: false,
  type: "analytic",
  uri: "https://matomo.org/faq/general/faq_146/",
};
