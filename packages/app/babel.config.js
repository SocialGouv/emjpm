module.exports = {
  presets: [
    [
      "next/babel",
      {
        "preset-env": {
          targets: {
            browsers: ["last 5 Chrome version", "ie >= 11"]
          }
        }
      }
    ]
  ]
};
