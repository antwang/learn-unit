const merge = require("webpack-merge");
const baseConf = require("./webpack.config.base");
const webpack = require("webpack");
const {
  configureBabelLoader,
  configureURLLoader,
  configureCSSLoader
} = require("./util");
const ModernBuildPlugin = require("./modernBuildPlugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = function(
  options = {
    env: "test",
    buildMode: "common",
    browserslist: null
  }
) {
  let { env, buildMode, browserslist } = options;

  env = env === "prod" ? env : "test";
  if (buildMode !== "legacy" && buildMode !== "modern") {
    buildMode = "common";
  }
  if (!Array.isArray(browserslist)) {
    browserslist = null;
  }
  let filename = "js/[name].js";
  let plugins = [
    new TerserPlugin(),
    new OptimizeCSSPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ];
  let modern = buildMode === "common" ? false : true;
  let postfix = buildMode === "common" ? "" : `-${buildMode}`;
  let rules = [
    configureCSSLoader(env),
    configureBabelLoader(modern, browserslist),
    ...configureURLLoader(env)
  ];

  // 生产环境
  if (env === "prod") {
    filename = `js/[name]${postfix}.[chunkhash:8].js`;
    plugins.push(new ExtractTextPlugin("css/[name].[hash:8].css"));
  } else {
    filename = `js/[name]${postfix}.js`;
    plugins.push(new ExtractTextPlugin("css/[name].css"));
  }

  // 构建模式是modern时
  if (buildMode === "modern") {
    plugins.push(
      new ModernBuildPlugin({ modern: true }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ["**/*", "!js", "!js/*"]
      })
    );
  }

  // 构建模式是legacy时
  if (buildMode === "legacy") {
    plugins.push(
      new ModernBuildPlugin({ modern: false }),
      new CleanWebpackPlugin()
    );
  }
  // 构建模式是普通构建
  if (buildMode === "common") {
    plugins.push(new CleanWebpackPlugin());
  }
  const prodConf = {
    mode: "none",
    output: {
      filename
    },
    module: { rules },
    plugins,
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            reuseExistingChunk: true
          }
        }
      },
      runtimeChunk: "single"
    }
  };
  return merge(baseConf, prodConf);
};
