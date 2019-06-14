const merge = require("webpack-merge");
const baseConf = require("./webpack.config.base");
const {
  configureBabelLoader,
  configureURLLoader,
  configureCSSLoader
} = require("./util");

let testConf = merge(baseConf, {
  devtool: "inline-source-map",
  module: {
    rules: [
      configureCSSLoader(),
      configureBabelLoader(),
      ...configureURLLoader()
    ]
  }
});
delete testConf.entry;
module.exports = testConf;
