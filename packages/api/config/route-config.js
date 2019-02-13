(function(routeConfig) {
  "use strict";

  routeConfig.init = function(app) {
    // *** routes *** //
    const routes = require("../routes/index");
    const authRoutes = require("../routes/auth");
    const userRoutes = require("../routes/users");

    // *** register routes *** //
    app.use("/", routes);
    app.use("/", userRoutes);
  };
})(module.exports);
