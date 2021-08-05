const webpack = require("webpack");

module.exports = {
  lintOnSave: false,
  css: {
    extract: false
  },
  chainWebpack: (config) => {
    config.plugin("provide").use(webpack.ProvidePlugin, [
      {
        "window.Quill": "quill/dist/quill.js",
        Quill: "quill/dist/quill.js",
      },
    ]);
  },
};
