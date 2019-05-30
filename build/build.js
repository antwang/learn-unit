const parseArgs = require("minimist");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.prod");
const argv = parseArgs(process.argv.slice(2));
const { modern, env } = argv;
let browsers = {
  legacy: ["> 1%", "last 2 versions", "Firefox ESR"],
  modern: [
    "last 2 Chrome versions",
    "not Chrome < 60",
    "last 2 Safari versions",
    "not Safari < 10.1",
    "last 2 iOS versions",
    "not iOS < 10.3",
    "last 2 Firefox versions",
    "not Firefox < 54",
    "last 2 Edge versions",
    "not Edge < 15"
  ]
};

const createCompiler = config => {
  let compiler = webpack(config);
  return () => {
    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) return reject(err);
        console.log(stats.toString({ colors: true }) + "\n");
        resolve();
      });
    });
  };
};

const build = async () => {
  if (!modern) {
    // 构建生产环境普通包
    await createCompiler(webpackConfig({ env, buildMode: "common" }))();
  } else {
    // 构建生产环境modern包
    await createCompiler(
      webpackConfig({ env, buildMode: "legacy", browserslist: browsers.legacy })
    )();
    await createCompiler(
      webpackConfig({ env, buildMode: "modern", browserslist: browsers.modern })
    )();
  }
};

build();
