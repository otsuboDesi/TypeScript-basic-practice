const { resolve } = require("path");

module.exports = {
  // どの環境向けにビルドするのか指定する
  mode: "development",
  //   ソースマップを生成する方法を指定する
  devtool: "inline-source-map",
  //   バンドルするファイルのエントリーポイントとなるファイルのパスを文字列で指定する
  entry: resolve(__dirname, "ts/index.ts"),
  //   バンドルされたファイルの出力する場所やその出力方法を指定する
  output: {
    filename: "index.js",
    path: resolve(__dirname, "dist"),
  },
  //   モジュールの解決方法を指定する
  resolve: {
    // 指定された拡張子で依存を解決する
    extensions: [".ts", ".js"],
  },
  //   JavaScript以外の形式のファイルである、TypeScript,CSS,画像ファイルをモジュールとして扱うようにしたい時、
  // それぞれのloaderを設定して、module.rulesで指定する
  module: {
    rules: [
      {
        test: /\.ts/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
};
