const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "public/[name].js",
    publicPath: "/",
    chunkFilename: "public/[name].chunk.js"
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 500,
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [
                require.resolve("react-refresh/babel")
              ]
            }
          }
        ]
      },
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
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: "file-loader",
        options: {
          name: "public/[path][name].[ext]"
        }
      },
      {
        test: /\.json$/,
        type: "javascript/auto",
        use: "json-loader"
      }
    ]
  },
  devServer: {
    hot: true,
    compress: true,
    port: 9000,
    open: true,
    historyApiFallback: true
  },
  plugins: [
    new ReactRefreshWebpackPlugin({
      forceEnable: true
    }),
    new HtmlWebPackPlugin({
      template: "./src/templates/index.html"
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development"
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: false,
        default: false,
        vendor: {
          chunks: "all",
          test: /node_modules/,
          name: "vendor",
          reuseExistingChunk: true
        }
      }
    }
  }
};
