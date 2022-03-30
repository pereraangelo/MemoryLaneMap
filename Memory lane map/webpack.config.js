 
 const resolve = require("path").resolve;
const webpack = require("webpack");

const config = {
  mode: "development",

  devServer: {
    static: ".",
  },

  entry: {
    app: resolve("./src/app"),
  },

  output: {
    library: "App",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        include: [resolve(".")],
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/env", "@babel/react"],
            },
          },
          {
            loader: "ts-loader",
          },
          "source-map-loader",
        ],
      },
    ],
  },

   plugins: [new webpack.EnvironmentPlugin({ MapboxAccessToken: "" })],
};

 module.exports = (env) =>
  env && env.local ? require("../webpack.config.local")(config)(env) : config;
