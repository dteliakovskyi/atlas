import HtmlWebpackPlugin from "html-webpack-plugin";
import { Configuration, container } from "webpack";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { merge } from "webpack-merge";

import { moduleFederation } from "./module-federation";
import { commonConfig } from "./webpack.common";

const configuration: Configuration & DevServerConfiguration = {
  entry: "./src/index.ts",
  mode: "development",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/",
  },
  devServer: {
    client: {
      webSocketURL: {
        port: 443,
      },
    },
    port: 3000,
    host: "0.0.0.0",
    allowedHosts: "all",
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new container.ModuleFederationPlugin(moduleFederation),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

export default merge(commonConfig, configuration);
