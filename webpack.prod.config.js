const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const version = require("./package.json").version;
const webpack = require("webpack");

module.exports = function (env) {
  const publicPath = env.publicPath != null ? env.publicPath : "/";

  if (publicPath.length > 1 && publicPath.substr(-1) === "/") {
    throw new Error(`public path '${publicPath}' should not end with /`);
  }

  if (publicPath.substr(0, 1) !== "/") {
    throw new Error(`public path '${publicPath}' should start with /`);
  }

  return {
    mode: "production",
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
      path: path.resolve(__dirname, "/dist"),
      filename: "public/app.[hash].js",
      publicPath: publicPath === "/" ? publicPath : `${publicPath}/`,
      chunkFilename: "public/[name].chunk.[contenthash].js"
    },
    performance: {
      maxEntrypointSize: 10240000,
      maxAssetSize: 15360000
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  javascriptEnabled: true
                }
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          loader: "file-loader",
          options: {
            name: `${publicPath === "/" ? "" : "/"}public/fonts/[hash].[ext]`
          }
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "eslint-loader",
          exclude: /node_modules/,
          options: {
            failOnError: true,
            failOnWarning: true
          }
        },
        {
          test: /\.js/,
          loader: "babel-loader",
          exclude: /node_modules/,
          query: {
            presets: ["@babel/preset-env"]
          }
        },
        {
          test: /\.json$/,
          type: "javascript/auto",
          use: "json-loader"
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/templates/index.html",
        meta: {
          "app-version": `v${version}`
        }
      }),
      new CleanWebpackPlugin([path.resolve(__dirname, "/dist")], { verbose: true, dry: false }),
      new MiniCssExtractPlugin({
        filename: "public/main.[hash].css"
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: "production"
      })
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            chunks: "all",
            test: /node_modules/,
            name: "vendor"
          }
        }
      }
    }
  };
};
