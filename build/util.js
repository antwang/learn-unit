const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 配置URLLoader
const configureURLLoader = env => {
  let rules = [
    { test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, type: "img" },
    { test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, type: "media" },
    { test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, type: "font" }
  ];
  return rules.map(rule => {
    let { type, test } = rule;
    let name = `${type}/[name].[ext]`;
    if (env === "prod") {
      name = `${type}/[name].[hash:7].[ext]`;
    }
    return {
      test,
      loader: "url-loader",
      options: {
        limit: 8092,
        name
      }
    };
  });
};

// 配置css-loader。生产环境下需要安装ExtractTextPlugin
const configureCSSLoader = env => {
  if (env === "prod" || env === "test") {
    return {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      })
    };
  }
  return {
    test: /\.scss$/,
    use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
  };
};

// 配置babelloader
const configureBabelLoader = (modern, browserlist) => {
  let options = {
    babelrc: false,
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false,
          corejs: "3.0.1",
          useBuiltIns: "usage",
          targets: {
            browsers: browserlist
          }
        }
      ]
    ]
  };
  let babelLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel-loader"
  };

  if (modern) {
    babelLoader.options = options;
  }
  return babelLoader;
};

// 雪碧图模板函数
const templateFunction = function(data) {
  var shared = ".ico { background-image: url(I); background-size:Wpx Hpx;}"
    .replace("I", data.spritesheet.image)
    .replace("W", data.spritesheet.width / 2)
    .replace("H", data.spritesheet.height / 2);

  var perSprite = data.sprites
    .map(sprite => {
      return ".ico-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }"
        .replace("N", sprite.name)
        .replace("W", sprite.width / 2)
        .replace("H", sprite.height / 2)
        .replace("X", sprite.offset_x / 2)
        .replace("Y", sprite.offset_y / 2);
    })
    .join("\n");

  return shared + "\n" + perSprite;
};
module.exports = {
  configureURLLoader,
  configureCSSLoader,
  configureBabelLoader,
  templateFunction
};
