const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    popup: path.resolve("./src/popup/popup.tsx"),
  },
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.tsx$/,
        exclude: /node_modules\\/,
      },
      {
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [tailwindcss, autoprefixer],
              },
            },
          },
        ],
        test: /\.css$/i,
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      title: "Convert",
      filename: "popup.html",
      chunks: ["popup"],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("src/static/manifest.json"),
          to: path.resolve("dist"),
        },
        { from: path.resolve("src/assets/icon.png"), to: path.resolve("dist") },
      ],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    //prettier-ignore
    filename: '[name].js',
  },
};
