import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

// ReactDOM.renderによって、HTMLファイルにレンダリング対象となる要素をdocument.getElementById('app')で指定
// 指定されたファイルはindex.htmlのことを指す
// そしてreactコンポーネントをレンダリングしている
ReactDOM.render(<App />, document.getElementById("app"));
